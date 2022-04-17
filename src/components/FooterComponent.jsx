import React, { useEffect, useState } from 'react'
import { AuthUserContext, withAuthorization } from './Session';
import SignOut from './SignOut'
import { compose } from 'recompose';
import { CartContext } from '../global/CartContext'
import { Link } from 'react-router-dom'
import { Component } from 'react';
import { withFirebase } from './Firebase';
import { dbstore } from './Firebase/firebase';
import * as ROLES from '../constants/roles';
import TicketCode from './user/Ticket/TicketCode';

const SIGN_IN_METHODS = [
	{
		id: 'password',
		provider: null,
	},
	{
		id: 'google.com',
		provider: 'googleProvider',
	},
	{
		id: 'facebook.com',
		provider: 'facebookProvider',
	}
];
const HeaderComponent = () => {
	const [state, setState] = useState({totalQty:0});
	const [count, setCount] = useState(0);
	useEffect(() => {
		const dataLocalStorage = JSON.parse(localStorage.getItem("cart")) === null ? {} : JSON.parse(localStorage.getItem("cart"));
		setState({...state, totalQty:dataLocalStorage.totalQty})
	},[count])
	return (
		<AuthUserContext.Consumer>
			{authUser => (
				<HeaderComponentPage authUser={authUser} count = {count} totalQty={state.totalQty} />
			)}
		</AuthUserContext.Consumer>
	)
};
class HeaderComponentBase extends Component {
	constructor(props) {
		super(props);

		this.state = {
			activeSignInMethods: [],
			error: null,
			data: []
		};
	}
	static contextType = CartContext
	componentDidMount() {
		this.fetchSignInMethods();
		dbstore.collection("Ticket")
			.where("uid", "==", this.props.authUser.uid).get()
			.then((querySnapshot) => {
				const fdata = [];
				querySnapshot.forEach((doct) => {
					const idRoute = doct.data().Schedule.Route.IdRoute;
					// localStorage.setItem('idroute-1', idRoute);
					console.log("idroute", idRoute);
					if (idRoute !== null) {
						dbstore.collection("reportProblem")
							.where("IdRoute", "==", idRoute)
							.onSnapshot((snap) => {
								snap.docChanges().forEach((change) => {
									const doc = { ...change.doc.data(), id: change.doc.id };
									console.log(doc);
									switch (change.type) {
										case "added":
											fdata.push(doc);
											break;
										case "modified":
											const i = fdata.findIndex((i) => i.id === doc.id);
											fdata[i] = doc;
											break;
										case "removed":
											fdata = fdata.filter((i) => i.id !== doc.id);
											break;
										default:
											break;
									}
								});
								this.setState({ data: fdata });
							});
					}
				});
			});
	}
	fetchSignInMethods = () => {
		this.props.firebase.auth
			.fetchSignInMethodsForEmail(this.props.authUser.email)
			.then(activeSignInMethods =>
				this.setState({ activeSignInMethods, error: null }),
			)
			.catch(error => this.setState({ error }));
	};

	onSocialLoginLink = provider => {
		this.props.firebase.auth.currentUser
			.linkWithPopup(this.props.firebase[provider])
			.then(this.fetchSignInMethods)
			.catch(error => this.setState({ error }));
	};

	onDefaultLoginLink = password => {
		const credential = this.props.firebase.emailAuthProvider.credential(
			this.props.authUser.email,
			password,
		);

		this.props.firebase.auth.currentUser
			.linkAndRetrieveDataWithCredential(credential)
			.then(this.fetchSignInMethods)
			.catch(error => this.setState({ error }));
	};

	onUnlink = providerId => {
		this.props.firebase.auth.currentUser
			.unlink(providerId)
			.then(this.fetchSignInMethods)
			.catch(error => this.setState({ error }));
	};
	render() {
		const dataLocalStorage = JSON.parse(localStorage.getItem("cart")) === null ? {} : JSON.parse(localStorage.getItem("cart"));
		const { totalQty } = dataLocalStorage
		const { activeSignInMethods, error } = this.state;
		return (
			<div>
				<div id="kt_header" className="header header-fixed">
					<div className="container-fluid d-flex align-items-stretch justify-content-between">
						<div className="header-menu-wrapper header-menu-wrapper-left" id="kt_header_menu_wrapper">
							<div id="kt_header_menu" className="header-menu header-menu-mobile header-menu-layout-default">
								{this.props.authUser.roles === ROLES.USER &&
									<ul className="menu-nav">
										<li className="menu-item menu-item-submenu menu-item-rel menu-item-active" data-menu-toggle="click" >
											<Link to="/homepage-user">
												<img alt="Logo" src="./assets/css/Logo-Railcare/10railcare.png" style={{ 'width': '250px', 'backgroundPosition': 'center center' }} />
											</Link>
										</li>
									</ul>
								}
								{this.props.authUser.roles === ROLES.ADMIN &&
									<ul className="menu-nav">
										<li className="menu-item menu-item-submenu menu-item-rel menu-item-active" data-menu-toggle="click" >
											<Link to="/homepage_admin">
												<img alt="Logo" src="./assets/css/Logo-Railcare/10railcare.png" style={{ 'width': '250px', 'backgroundPosition': 'center center' }} />
											</Link>
										</li>
									</ul>
								}
								{(this.props.authUser.roles === ROLES.STAFF_FOOD || this.props.authUser.roles === ROLES.STAFF_INSPECTOR) &&
									<ul className="menu-nav">
										<li className="menu-item menu-item-submenu menu-item-rel menu-item-active" data-menu-toggle="click" >
											<Link to="/homepage-staff">
												<img alt="Logo" src="./assets/css/Logo-Railcare/10railcare.png" style={{ 'width': '250px', 'backgroundPosition': 'center center' }} />
											</Link>
										</li>
									</ul>
								}
							</div>
						</div>

						<div className="topbar">

							{this.props.authUser.roles === ROLES.USER &&
								<>
									<div className="dropdown">
										{/*begin::Toggle*/}
										<div className="topbar-item" data-toggle="dropdown" data-offset="10px,0px">
											<div className="btn btn-icon btn-clean btn-dropdown btn-lg mr-1 pulse pulse-primary">
												<span className="svg-icon svg-icon-xl svg-icon-primary">
													{/*begin::Svg Icon | path:assets/media/svg/icons/Code/Compiling.svg*/}
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width="512"
														height="512"
														enableBackground="new 0 0 512 512"
														viewBox="0 0 24 24"
													>
														<g fill="#8950fc">
															<path
																xmlns="http://www.w3.org/2000/svg"
																d="M21.5 22h-19A2.503 2.503 0 010 19.5v-2a.5.5 0 01.5-.5H1c1.103 0 2-.897 2-2s-.897-2-2-2H.5a.5.5 0 01-.5-.5v-2C0 9.122 1.122 8 2.5 8h19c1.378 0 2.5 1.122 2.5 2.5v2a.5.5 0 01-.5.5H23a2.002 2.002 0 00-1.414 3.414c.377.378.879.586 1.413.586h.5a.5.5 0 01.5.5v2A2.502 2.502 0 0121.5 22zM1 18v1.5c0 .827.673 1.5 1.5 1.5h19c.827 0 1.5-.673 1.5-1.5V18h-.001a2.979 2.979 0 01-2.12-.878A2.982 2.982 0 0120 15c0-1.654 1.346-3 3-3v-1.5c0-.827-.673-1.5-1.5-1.5h-19C1.673 9 1 9.673 1 10.5V12c1.654 0 3 1.346 3 3s-1.346 3-3 3z"
																data-original="#000000"
															></path>
															<path
																xmlns="http://www.w3.org/2000/svg"
																d="M8.5 10a.5.5 0 01-.5-.5v-1a.5.5 0 011 0v1a.5.5 0 01-.5.5zM8.5 18.461a.5.5 0 01-.5-.5V16.27a.5.5 0 011 0v1.692a.5.5 0 01-.5.499zm0-4.23a.5.5 0 01-.5-.5v-1.692a.5.5 0 011 0v1.692a.5.5 0 01-.5.5zM8.5 22a.5.5 0 01-.5-.5v-1a.5.5 0 011 0v1a.5.5 0 01-.5.5z"
																data-original="#000000"
															></path>
															<path
																xmlns="http://www.w3.org/2000/svg"
																d="M2.5 9a.498.498 0 01-.175-.968l15.9-5.937c.773-.29 1.681.144 1.945.923l1.803 5.321a.5.5 0 01-.947.321l-1.803-5.321a.511.511 0 00-.649-.308l-15.9 5.937A.482.482 0 012.5 9z"
																data-original="#000000"
															></path>
														</g>
													</svg>
												</span>
												<span className="pulse-ring" />
											</div>
										</div>
										<div className="dropdown-menu p-0 m-0 dropdown-menu-right dropdown-menu-anim-up dropdown-menu-lg">
											<form>
												<div className="d-flex flex-column pt-12 bgi-size-cover bgi-no-repeat rounded-top rounded-bottom" style={{ backgroundImage: 'url(assets/media/misc/bg-1.jpg)' }}>
													<h4 className="d-flex flex-center rounded-top rounded-bottom mb-10">
														<TicketCode />
													</h4>
												</div>
											</form>
										</div>
									</div>
									<div className="topbar-item">
										<div className="btn btn-icon btn-clean btn-lg mr-1" id="kt_quick_panel_toggle">
											<i className="fas fa-bell"></i>
										</div>
									</div>
									<div className="topbar-item">
										<Link to="/cartproducts">
											<div className="btn btn-icon btn-clean btn-dropdown btn-lg mr-1" id="kt_quick_cart_toggle">
												<span className="svg-icon svg-icon-xl svg-icon-primary">
													<svg>
														<g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
															<rect x="0" y="0" width="24" height="24" />
															<path d="M18.1446364,11.84388 L17.4471627,16.0287218 C17.4463569,16.0335568 17.4455155,16.0383857 17.4446387,16.0432083 C17.345843,16.5865846 16.8252597,16.9469884 16.2818833,16.8481927 L4.91303792,14.7811299 C4.53842737,14.7130189 4.23500006,14.4380834 4.13039941,14.0719812 L2.30560137,7.68518803 C2.28007524,7.59584656 2.26712532,7.50338343 2.26712532,7.4104669 C2.26712532,6.85818215 2.71484057,6.4104669 3.26712532,6.4104669 L16.9929851,6.4104669 L17.606173,3.78251876 C17.7307772,3.24850086 18.2068633,2.87071314 18.7552257,2.87071314 L20.8200821,2.87071314 C21.4717328,2.87071314 22,3.39898039 22,4.05063106 C22,4.70228173 21.4717328,5.23054898 20.8200821,5.23054898 L19.6915238,5.23054898 L18.1446364,11.84388 Z" fill="#000000" opacity="0.3" />
															<path d="M6.5,21 C5.67157288,21 5,20.3284271 5,19.5 C5,18.6715729 5.67157288,18 6.5,18 C7.32842712,18 8,18.6715729 8,19.5 C8,20.3284271 7.32842712,21 6.5,21 Z M15.5,21 C14.6715729,21 14,20.3284271 14,19.5 C14,18.6715729 14.6715729,18 15.5,18 C16.3284271,18 17,18.6715729 17,19.5 C17,20.3284271 16.3284271,21 15.5,21 Z" fill="#000000" />
														</g>
													</svg>
												</span>
												<div className='relative' style={{ "marginBottom": "21px", "marginLeft": "-5px" }}>
													<span className='text' style={{ 'color': '#8950FC' }}>{this.props.totalQty ?? 0}</span>
												</div>
											</div>
										</Link>
									</div>
									<div className="dropdown">
										{/*begin::Toggle*/}
										<div className="topbar-item" data-toggle="dropdown" data-offset="10px,0px">
											<div className="btn btn-icon btn-clean btn-dropdown btn-lg mr-1">
												<img className="h-20px w-20px rounded-sm" src="assets/media/svg/flags/226-united-states.svg" alt="" />
											</div>
										</div>
										{/*end::Toggle*/}
										{/*begin::Dropdown*/}
										<div className="dropdown-menu p-0 m-0 dropdown-menu-anim-up dropdown-menu-sm dropdown-menu-right">
											{/*begin::Nav*/}
											<ul className="navi navi-hover py-4">
												{/*begin::Item*/}
												<li className="navi-item">
													<a href="#" className="navi-link">
														<span className="symbol symbol-20 mr-3">
															<img src="assets/media/svg/flags/226-united-states.svg" alt="" />
														</span>
														<span className="navi-text">English</span>
													</a>
												</li>
												{/*end::Item*/}
												{/*begin::Item*/}
												<li className="navi-item active">
													<a href="#" className="navi-link">
														<span className="symbol symbol-20 mr-3">
															<img src="assets/media/svg/flags/220-vietnam.svg" alt="" />
														</span>
														<span className="navi-text">Việt Nam</span>
													</a>
												</li>

											</ul>
											{/*end::Nav*/}
										</div>
										{/*end::Dropdown*/}
									</div>
								</>
							}

							<div className="topbar-item">
								<div className="btn btn-icon btn-icon-mobile w-auto btn-clean d-flex align-items-center btn-lg px-2" id="kt_quick_user_toggle">
									<span className="font-weight-bold font-size-base d-none d-md-inline mr-1">Hi,</span>
									<span className="text-dark-50 font-weight-bolder font-size-base d-none d-md-inline mr-3">{this.props.authUser.username}</span>
									<span className="symbol symbol-lg-35 symbol-25 symbol-light-success">
										<span className="symbol-label font-size-h5 font-weight-bold">{this.props.authUser.username.charAt(0)}</span>
									</span>
								</div>
							</div>

						</div>
						<div id="kt_quick_user" className="offcanvas offcanvas-right p-10">
							{/*begin::Header*/}
							<div className="offcanvas-header d-flex align-items-center justify-content-between pb-5">
								<h3 className="font-weight-bold m-0">User Profile
									{/* <small className="text-muted font-size-sm ml-2">12 messages</small> */}
								</h3>
								<a href="!#" className="btn btn-xs btn-icon btn-light btn-hover-primary" id="kt_quick_user_close">
									<i className="ki ki-close icon-xs text-muted"></i>
								</a>
							</div>
							{/*end::Header*/}
							{/*begin::Content*/}
							<div className="offcanvas-content pr-5 mr-n5">
								{/*begin::Header*/}
								<div className="d-flex align-items-center mt-2">
									<div className="symbol symbol-100 mr-3">
										<div className="symbol-label" style={{ "backgroundImage": `url(${this.props.authUser.photoURL})` }}></div>
										<i className="symbol-badge" style={{ 'backgroundColor': '#8950FC' }}></i>
									</div>
									<div className="d-flex flex-column">
										<div className="font-weight-bold font-size-h5 text-dark-75 text-hover-primary">{this.props.authUser.username}</div>
										{/* <div className="text-muted mt-1">Application Developer</div> */}
										<div className="navi mt-2">
											<div className="navi-item">
												<span className="navi-link p-0 pb-2">
													<span className="navi-icon mr-1">
														<span className="svg-icon svg-icon-lg svg-icon-primary">
															<i className="far fa-envelope"></i>
														</span>
													</span>
													<span className="navi-text text-muted text-hover-primary">{this.props.authUser.email}</span>
												</span>
											</div>
											<SignOut />
										</div>
									</div>
								</div>
								{/*end::Header*/}
								{/*begin::Separator*/}
								<div className="separator separator-dashed mt-8 mb-5"></div>
								{/*end::Separator*/}
								{/*begin::Nav*/}
								<div className="navi navi-spacer-x-0 p-0">
									{/*begin::Item*/}
									<Link to="/profile" className="navi-item">
										<div className="navi-link">
											<div className="symbol symbol-40 bg-light mr-3">
												<div className="symbol-label">
													<i className="fas fa-user-edit fa-2x"></i>
												</div>
											</div>
											<div className="navi-text">
												<div className="font-weight-bold">My Profile</div>
												<div className="text-muted">Update infomation profile
													<span className="label label-light-danger label-inline font-weight-bold">update</span></div>
											</div>
										</div>
									</Link>
									{/*end:Item*/}
								</div>
								<div className="separator separator-dashed my-7"></div>
								<div>
									<h5 className="mb-5">Account Toggle</h5>
									<div className="d-flex align-items-center bg-light-info rounded p-2">
										<ul>
											{SIGN_IN_METHODS.map(signInMethod => {
												const onlyOneLeft = activeSignInMethods.length === 1;
												const isEnabled = activeSignInMethods.includes(
													signInMethod.id,
												);

												return (
													<li key={signInMethod.id}>
														{signInMethod.id === 'password' ? (
															<DefaultLoginToggle
																onlyOneLeft={onlyOneLeft}
																isEnabled={isEnabled}
																signInMethod={signInMethod}
																onLink={this.onDefaultLoginLink}
																onUnlink={this.onUnlink}
															/>
														) : (
															<SocialLoginToggle
																onlyOneLeft={onlyOneLeft}
																isEnabled={isEnabled}
																signInMethod={signInMethod}
																onLink={this.onSocialLoginLink}
																onUnlink={this.onUnlink}
															/>
														)}

													</li>
												);
											})}
											<li>
												{error && <p style={{ color: "red", paddingBottom: 10 }}>{error.message}</p>}
											</li>
										</ul>

									</div>
								</div>

							</div>
						</div>
						<div id="kt_quick_panel" className="offcanvas offcanvas-right pt-5 pb-10">
							<div className="offcanvas-header offcanvas-header-navs d-flex align-items-center justify-content-between mb-5">
								<ul className="nav nav-bold nav-tabs nav-tabs-line nav-tabs-line-3x nav-tabs-primary flex-grow-1 px-10" role="tablist">
									<li className="nav-item">
										<a className="nav-link active" data-toggle="tab" href="#kt_quick_panel_notifications">Notifications</a>
									</li>
								</ul>
								<div className="offcanvas-close mt-n1 pr-5">
									<a href="!" className="btn btn-xs btn-icon btn-light btn-hover-primary" id="kt_quick_panel_close">
										<i className="ki ki-close icon-xs text-muted" />
									</a>
								</div>
							</div>
							<div className="offcanvas-content px-10">
								<div className="tab-content">
									<div className="tab-pane fade show pt-2 pr-5 mr-n5 active" id="kt_quick_panel_notifications" role="tabpanel">
										<div className="navi navi-icon-circle navi-spacer-x-0">
											{this.state.data.map((items, index) => {
												return (<a href="!" className="navi-item" key={items.id + index + "data"}>
													<div className="navi-link rounded">
														<div className="symbol symbol-50 mr-3">
															<div className="symbol-label">
																<i className="flaticon-bell text-success icon-lg" />
															</div>
														</div>
														<div className="navi-text">
															<div className="font-weight-bold font-size-lg">Train {items.NameTrain}: {items.StatusInfo}</div>
															<div className="text-muted">TimeDelay: {new Date(items.TimeDelay.seconds * 1000).toLocaleString()}</div>
														</div>
													</div>
												</a>)
											})
											}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

			</div >
		)
	}
}
const SocialLoginToggle = ({
	onlyOneLeft,
	isEnabled,
	signInMethod,
	onLink,
	onUnlink,
}) =>
	isEnabled ? (
		<button
			type="button" className="btn btn-light-danger font-weight-bold btn-sm m-1"
			onClick={() => onUnlink(signInMethod.id)}
			disabled={onlyOneLeft}
		>
			Deactivate {signInMethod.id}
		</button>
	) : (
		<button className="btn btn-light-primary font-weight-bold btn-sm m-1"
			type="button"
			onClick={() => onLink(signInMethod.provider)}
		>
			Link {signInMethod.id}
		</button>
	);

class DefaultLoginToggle extends Component {
	constructor(props) {
		super(props);

		this.state = { passwordOne: '', passwordTwo: '' };
	}

	onSubmit = event => {
		event.preventDefault();

		this.props.onLink(this.state.passwordOne);
		this.setState({ passwordOne: '', passwordTwo: '' });
	};

	onChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	render() {
		const {
			onlyOneLeft,
			isEnabled,
			signInMethod,
			onUnlink,
		} = this.props;

		const { passwordOne, passwordTwo } = this.state;

		const isInvalid =
			passwordOne !== passwordTwo || passwordOne === '';

		return isEnabled ? (
			<button
				type="button" className="btn btn-light-danger font-weight-bold btn-sm m-1"
				onClick={() => onUnlink(signInMethod.id)}
				disabled={onlyOneLeft}
			>
				Deactivate {signInMethod.id}
			</button>
		) : (
			<form onSubmit={this.onSubmit}>
				<input className="form-control"
					name="passwordOne"
					value={passwordOne}
					onChange={this.onChange}
					type="password"
					placeholder="New Password"
				/>
				<input className="form-control"
					name="passwordTwo"
					value={passwordTwo}
					onChange={this.onChange}
					type="password"
					placeholder="Confirm New Password"
				/>

				<button disabled={isInvalid} className="btn btn-light-primary font-weight-bold btn-sm" type="submit">
					Link {signInMethod.id}
				</button>
			</form>
		);
	}
}

const HeaderComponentPage = withFirebase(HeaderComponentBase);
const condition = authUser => !!authUser;
export default compose(withAuthorization(condition))(HeaderComponent)