import { Route } from 'react-router-dom';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import AsideLeftComponent from './components/AsideLeftComponent';
import { Component } from 'react';
import BoardStaff from './components/BoardStaff';
import Lichtrinhgiotau from './components/user/Lichtrinhgiotau';
import VeTau from './components/user/Ticket/ListTicket';
import SubHeader from './components/user/SubHeader';
import Cart from './components/user/ShoppingCart/Cart';
import Cashout from './components/user/ShoppingCart/Cashout';
import { Products } from './components/user/ShoppingCart/Products';
import ListUserComponent from './components/admin/ListUserComponent';
import Profile from './components/Profile';
import { HistoryBuy } from './components/user/ShoppingCart/HistoryBuy';
import { ProductAdmin } from './components/admin/ProductAdmin';
import EditProduct from './components/admin/EditProduct';
import HomePageAdmin from './components/admin/HomePageAdmin';
import AddProducts from './components/admin/AddProducts';
import { PrivateRoute } from './components/Session/PrivateRoute';
import ListStaffComponent from './components/admin/ListStaffComponent';
import DetailComponent from './components/admin/DetailComponent';
import MapContainer from './components/user/GoogleMap';
import { ConfirmOrder } from './components/staff/ConfirmOrder'
import { FormGaTau } from './Lichtrinhtau/FormGaTau';
import { ListGaTau } from './Lichtrinhtau/ListGaTau';
import { DetailRoute } from './Lichtrinhtau/DetailRoute';
import StaffNotification from './components/staff/StaffNotification';
import { LocalNews } from './Lichtrinhtau/LocalNews';
import ListNotification from './components/admin/ListNotification';
import { RouteBoard } from './Lichtrinhtau/RouteBoard';
import TicketCurrent from './components/user/Ticket/TicketCurrent';
import ListTicket from './components/user/Ticket/ListTicket';
import CheckTicket from './components/staff/CheckTicket';
import NotifyTrouble from './components/user/NotifyTrouble';
import useHubspotChat from './components/bot/ChatBot'
import { CustomerVoucher } from './components/user/Voucher/CustomerVoucher';
import { ListVoucher } from './components/admin/Voucher/ListVoucher';
import { AddVoucher } from './components/admin/Voucher/AddVoucher';
import CountDownContainer from './components/user/CountDownContainer';
class MainRoute extends Component {
	render() {
		return (
			<>
				<div id="kt_header_mobile" className="header-mobile align-items-center header-mobile-fixed">
					<a href="!#">
						<img alt="Logo" src="./assets/css/Logo-Railcare/7railcare.png" style={{ 'width': '250px', 'backgroundPosition': 'center center' }} />
					</a>
					<div className="d-flex align-items-center">
						<button className="btn p-0 burger-icon burger-icon-left" id="kt_aside_mobile_toggle">
							<span />
						</button>
						<button className="btn p-0 burger-icon ml-4" id="kt_header_mobile_toggle">
							<span />
						</button>
						<button className="btn btn-hover-text-primary p-0 ml-2" id="kt_header_mobile_topbar_toggle">
							<span className="svg-icon svg-icon-xl">
								<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
									<g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
										<polygon points="0 0 24 0 24 24 0 24" />
										<path d="M12,11 C9.790861,11 8,9.209139 8,7 C8,4.790861 9.790861,3 12,3 C14.209139,3 16,4.790861 16,7 C16,9.209139 14.209139,11 12,11 Z" fill="#000000" fillRule="nonzero" opacity="0.3" />
										<path d="M3.00065168,20.1992055 C3.38825852,15.4265159 7.26191235,13 11.9833413,13 C16.7712164,13 20.7048837,15.2931929 20.9979143,20.2 C21.0095879,20.3954741 20.9979143,21 20.2466999,21 C16.541124,21 11.0347247,21 3.72750223,21 C3.47671215,21 2.97953825,20.45918 3.00065168,20.1992055 Z" fill="#000000" fillRule="nonzero" />
									</g>
								</svg>
							</span>
						</button>
					</div>
				</div>
				<div className="d-flex flex-column flex-root">
					<div className="d-flex flex-row flex-column-fluid page">
						<AsideLeftComponent />
						<div className="d-flex flex-column flex-row-fluid wrapper" id="kt_wrapper">
							<HeaderComponent />
							<div className="content d-flex flex-column flex-column-fluid" id="kt_content">
								<SubHeader />
								<div className="d-flex flex-column-fluid">
									<div className="container">
										{/* USER */}
										<PrivateRoute path="/homepage-user" roles={["USER"]} component={Lichtrinhgiotau} />
										<PrivateRoute path="/list-ticket" roles={["USER"]} component={ListTicket} />
										<PrivateRoute path="/ticket-current" roles={["USER"]} component={TicketCurrent} />
										<PrivateRoute path="/voucher" roles={["USER"]} component={CustomerVoucher} />
										<PrivateRoute path="/maps" roles={["USER"]} component={MapContainer} />
										<PrivateRoute path="/countdown" roles={["USER"]} component={CountDownContainer} />

										<PrivateRoute path='/cartproducts' roles={["USER"]} component={Cart} />
										<PrivateRoute path='/cashout' roles={["USER"]} component={Cashout} />
										<PrivateRoute path='/historybuy' roles={["USER"]} component={HistoryBuy} />
										<Route path="/profile" component={Profile} />
										<Route path='/products' component={Products} />
										<Route exact path='/homepage-user' roles={["USER"]} component={useHubspotChat} />
										<Route path='/notify-trouble' component={NotifyTrouble} />

										<Route path='/addproducts' component={AddProducts} />
										<Route path="/localnews" component={LocalNews} />

										{/*  */}
										<Route path="/homepage-staff" component={BoardStaff} />
										<Route path="/listproblem" component={ListNotification} />
										{/* STAFF */}
										<PrivateRoute path="/confirm-order" roles={["STAFF_FOOD"]} component={ConfirmOrder} />
										<PrivateRoute path="/check-ticket" roles={["STAFF_INSPECTOR"]} component={CheckTicket} />
										{/* ADMIN */}
										<PrivateRoute path="/homepage_admin" roles={["ADMIN"]} component={HomePageAdmin} />
										<div>
											<PrivateRoute exact path="/user" roles={["ADMIN"]} component={ListUserComponent} />
											<PrivateRoute exact path="/staff" roles={["ADMIN"]} component={ListStaffComponent} />
											<Route path="/notify-staff" component={StaffNotification} />

											<PrivateRoute exact path="/detail-info/:id" roles={["ADMIN"]} component={DetailComponent} />
											<PrivateRoute path='/productmanager' roles={["ADMIN"]} component={ProductAdmin} />
											<PrivateRoute path='/addvoucher' roles={["ADMIN"]} component={AddVoucher} />
											<PrivateRoute path='/listvoucher' roles={["ADMIN"]} component={ListVoucher} />
											<PrivateRoute path='/editproduct/:id' roles={["ADMIN"]} component={EditProduct} />
											{/*  */}
											<Route path='/liststation' component={ListGaTau} />
											<Route path='/add/Station' component={FormGaTau} />
											<Route path='/detail/Station/:id' component={FormGaTau} />
											<Route path='/edit/Station/:id' component={FormGaTau} />


											{/* <Route path='/listproblem' component={ListProblem} /> */}
											<Route path='/detailroute/:id' component={DetailRoute} />
											<Route path='/routeboard' component={RouteBoard} />

										</div>
									</div>
								</div>
							</div>
							{/* <FooterComponent /> */}
						</div>
					</div>
				</div>
			</>
		);
	}
}

export default MainRoute;
