import React, { Component } from 'react'
import { AuthUserContext, withAuthorization } from './Session';
import { Link } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from './Firebase';
import * as ROLES from '../constants/roles';
const AsideLeftComponent = () => (
    <AuthUserContext.Consumer>
        {authUser => (
            <AsideLeftComponentPage authUser={authUser} />
        )}
    </AuthUserContext.Consumer>
);
class AsideLeftComponentBase extends Component {
    // constructor(props){
    //     super(props);
    // }
    render() {
        return (
            <div>
                <div className="aside aside-left aside-fixed d-flex flex-column flex-row-auto" id="kt_aside">
                    {/* <Router> */}
                    <div className="brand flex-column-auto" id="kt_brand">
                        <div className="brand-logo">
                            <img alt="Logo" src="./assets/css/Logo-Railcare/8railcare.png" style={{ 'width': '150px', 'backgroundPosition': 'center center' }} />
                        </div>
                        <button className="brand-toggle btn btn-sm px-0" id="kt_aside_toggle">
                            <span className="svg-icon svg-icon svg-icon-xl">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                        <polygon points="0 0 24 0 24 24 0 24" />
                                        <path d="M5.29288961,6.70710318 C4.90236532,6.31657888 4.90236532,5.68341391 5.29288961,5.29288961 C5.68341391,4.90236532 6.31657888,4.90236532 6.70710318,5.29288961 L12.7071032,11.2928896 C13.0856821,11.6714686 13.0989277,12.281055 12.7371505,12.675721 L7.23715054,18.675721 C6.86395813,19.08284 6.23139076,19.1103429 5.82427177,18.7371505 C5.41715278,18.3639581 5.38964985,17.7313908 5.76284226,17.3242718 L10.6158586,12.0300721 L5.29288961,6.70710318 Z" fill="#000000" fillRule="nonzero" transform="translate(8.999997, 11.999999) scale(-1, 1) translate(-8.999997, -11.999999)" />
                                        <path d="M10.7071009,15.7071068 C10.3165766,16.0976311 9.68341162,16.0976311 9.29288733,15.7071068 C8.90236304,15.3165825 8.90236304,14.6834175 9.29288733,14.2928932 L15.2928873,8.29289322 C15.6714663,7.91431428 16.2810527,7.90106866 16.6757187,8.26284586 L22.6757187,13.7628459 C23.0828377,14.1360383 23.1103407,14.7686056 22.7371482,15.1757246 C22.3639558,15.5828436 21.7313885,15.6103465 21.3242695,15.2371541 L16.0300699,10.3841378 L10.7071009,15.7071068 Z" fill="#000000" fillRule="nonzero" opacity="0.3" transform="translate(15.999997, 11.999999) scale(-1, 1) rotate(-270.000000) translate(-15.999997, -11.999999)" />
                                    </g>
                                </svg>
                            </span>
                        </button>
                    </div>
                    <div className="aside-menu-wrapper flex-column-fluid" id="kt_aside_menu_wrapper">
                        <div id="kt_aside_menu" className="aside-menu my-4" data-menu-vertical="1" data-menu-scroll="1" data-menu-dropdown-timeout="500">
                            {this.props.authUser.roles === ROLES.ADMIN && (
                                <ul className="menu-nav">
                                    <li className="menu-item">
                                        <Link to="/homepage_admin" className="menu-link">
                                            <span className="svg-icon menu-icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                                        <polygon points="0 0 24 0 24 24 0 24" />
                                                        <path d="M12.9336061,16.072447 L19.36,10.9564761 L19.5181585,10.8312381 C20.1676248,10.3169571 20.2772143,9.3735535 19.7629333,8.72408713 C19.6917232,8.63415859 19.6104327,8.55269514 19.5206557,8.48129411 L12.9336854,3.24257445 C12.3871201,2.80788259 11.6128799,2.80788259 11.0663146,3.24257445 L4.47482784,8.48488609 C3.82645598,9.00054628 3.71887192,9.94418071 4.23453211,10.5925526 C4.30500305,10.6811601 4.38527899,10.7615046 4.47382636,10.8320511 L4.63,10.9564761 L11.0659024,16.0730648 C11.6126744,16.5077525 12.3871218,16.5074963 12.9336061,16.072447 Z" fill="#000000" fillRule="nonzero" />
                                                        <path d="M11.0563554,18.6706981 L5.33593024,14.122919 C4.94553994,13.8125559 4.37746707,13.8774308 4.06710397,14.2678211 C4.06471678,14.2708238 4.06234874,14.2738418 4.06,14.2768747 L4.06,14.2768747 C3.75257288,14.6738539 3.82516916,15.244888 4.22214834,15.5523151 C4.22358765,15.5534297 4.2250303,15.55454 4.22647627,15.555646 L11.0872776,20.8031356 C11.6250734,21.2144692 12.371757,21.2145375 12.909628,20.8033023 L19.7677785,15.559828 C20.1693192,15.2528257 20.2459576,14.6784381 19.9389553,14.2768974 C19.9376429,14.2751809 19.9363245,14.2734691 19.935,14.2717619 L19.935,14.2717619 C19.6266937,13.8743807 19.0546209,13.8021712 18.6572397,14.1104775 C18.654352,14.112718 18.6514778,14.1149757 18.6486172,14.1172508 L12.9235044,18.6705218 C12.377022,19.1051477 11.6029199,19.1052208 11.0563554,18.6706981 Z" fill="#000000" opacity="0.3" />
                                                    </g>
                                                </svg>
                                            </span>
                                            <span className="menu-text">Homepage</span>
                                        </Link>
                                    </li>
                                    <li className="menu-section">
                                        <h4 className="menu-text">Management</h4>
                                        <i className="menu-icon ki ki-bold-more-hor icon-md"></i>
                                    </li>
                                    <li className="menu-item menu-item-submenu" data-menu-toggle="hover">
                                        <a href="!#" className="menu-link menu-toggle">
                                            <span className="svg-icon menu-icon">
                                                <i className="far fa-user-circle"></i>
                                            </span>
                                            <span className="menu-text">Users Management</span>
                                            <i className="menu-arrow"></i>
                                        </a>
                                        <div className="menu-submenu">
                                            <i className="menu-arrow"></i>
                                            <ul className="menu-subnav">
                                                <li className="menu-item" >
                                                    <Link to="/user" replace className="menu-link">
                                                        <i className="menu-bullet menu-bullet-dot">
                                                            <span></span>
                                                        </i>
                                                        <span className="menu-text">List User</span>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li className="menu-item menu-item-submenu" data-menu-toggle="hover">
                                        <a href="!#" className="menu-link menu-toggle">
                                            <span className="svg-icon menu-icon">
                                                <i className="far fa-user-circle"></i>
                                            </span>
                                            <span className="menu-text">Staff Management</span>
                                            <i className="menu-arrow"></i>
                                        </a>
                                        <div className="menu-submenu">
                                            <i className="menu-arrow"></i>
                                            <ul className="menu-subnav">
                                                <li className="menu-item" >
                                                    <Link to="/staff" replace className="menu-link">
                                                        <i className="menu-bullet menu-bullet-dot">
                                                            <span></span>
                                                        </i>
                                                        <span className="menu-text">List Staff</span>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li className="menu-item menu-item-submenu" data-menu-toggle="hover">
                                        <a href="!#" className="menu-link menu-toggle">
                                            <span className="svg-icon menu-icon">
                                                <i className="fas fa-cube"></i>
                                            </span>
                                            <span className="menu-text">Products Management</span>
                                            <i className="menu-arrow"></i>
                                        </a>
                                        <div className="menu-submenu">
                                            <i className="menu-arrow"></i>
                                            <ul className="menu-subnav">
                                                <li className="menu-item" >
                                                    <Link to="/productmanager" className="menu-link">
                                                        <i className="menu-bullet menu-bullet-dot">
                                                            <span></span>
                                                        </i>
                                                        <span className="menu-text">List Products</span>
                                                    </Link>
                                                </li>
                                                <li className="menu-item" >
                                                    <Link to="/addproducts" className="menu-link">
                                                        <i className="menu-bullet menu-bullet-dot">
                                                            <span></span>
                                                        </i>
                                                        <span className="menu-text">Add Products</span>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li className="menu-item menu-item-submenu" data-menu-toggle="hover">
                                        <a href="!#" className="menu-link menu-toggle">
                                            <span className="svg-icon menu-icon">
                                                <i className="fas fa-train"></i>
                                            </span>
                                            <span className="menu-text">Train Problem</span>
                                            <i className="menu-arrow"></i>
                                        </a>
                                        <div className="menu-submenu">
                                            <i className="menu-arrow"></i>
                                            <ul className="menu-subnav">
                                                <li className="menu-item" >
                                                    <Link to="/listproblem" className="menu-link">
                                                        <i className="menu-bullet menu-bullet-dot">
                                                            <span></span>
                                                        </i>
                                                        <span className="menu-text">List Problem</span>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="menu-submenu">
                                            <i className="menu-arrow"></i>
                                            <ul className="menu-subnav">
                                                <li className="menu-item" >
                                                    <Link to="/liststation" className="menu-link">
                                                        <i className="menu-bullet menu-bullet-dot">
                                                            <span></span>
                                                        </i>
                                                        <span className="menu-text">List Station</span>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li className="menu-item menu-item-submenu" data-menu-toggle="hover">
                                        <a href="!#" className="menu-link menu-toggle">
                                            <span className="svg-icon menu-icon">
                                            <i className="fa fa-gift" aria-hidden="true"></i>
                                            </span>
                                            <span className="menu-text">Voucher Management</span>
                                            <i className="menu-arrow"></i>
                                        </a>
                                        <div className="menu-submenu">
                                            <i className="menu-arrow"></i>
                                            <ul className="menu-subnav">
                                                <li className="menu-item" >
                                                    <Link to="/listvoucher" className="menu-link">
                                                        <i className="menu-bullet menu-bullet-dot">
                                                            <span></span>
                                                        </i>
                                                        <span className="menu-text">List Voucher</span>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="menu-submenu">
                                            <i className="menu-arrow"></i>
                                            <ul className="menu-subnav">
                                                <li className="menu-item" >
                                                    <Link to="/addvoucher" className="menu-link">
                                                        <i className="menu-bullet menu-bullet-dot">
                                                            <span></span>
                                                        </i>
                                                        <span className="menu-text">Add Voucher</span>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>


                                </ul>
                            )}
                            {this.props.authUser.roles === ROLES.USER && (
                                <ul className="menu-nav">
                                    <li className="menu-item">
                                        <Link to="/homepage-user" className="menu-link">
                                            <span className="svg-icon menu-icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                                        <polygon points="0 0 24 0 24 24 0 24" />
                                                        <path d="M12.9336061,16.072447 L19.36,10.9564761 L19.5181585,10.8312381 C20.1676248,10.3169571 20.2772143,9.3735535 19.7629333,8.72408713 C19.6917232,8.63415859 19.6104327,8.55269514 19.5206557,8.48129411 L12.9336854,3.24257445 C12.3871201,2.80788259 11.6128799,2.80788259 11.0663146,3.24257445 L4.47482784,8.48488609 C3.82645598,9.00054628 3.71887192,9.94418071 4.23453211,10.5925526 C4.30500305,10.6811601 4.38527899,10.7615046 4.47382636,10.8320511 L4.63,10.9564761 L11.0659024,16.0730648 C11.6126744,16.5077525 12.3871218,16.5074963 12.9336061,16.072447 Z" fill="#000000" fillRule="nonzero" />
                                                        <path d="M11.0563554,18.6706981 L5.33593024,14.122919 C4.94553994,13.8125559 4.37746707,13.8774308 4.06710397,14.2678211 C4.06471678,14.2708238 4.06234874,14.2738418 4.06,14.2768747 L4.06,14.2768747 C3.75257288,14.6738539 3.82516916,15.244888 4.22214834,15.5523151 C4.22358765,15.5534297 4.2250303,15.55454 4.22647627,15.555646 L11.0872776,20.8031356 C11.6250734,21.2144692 12.371757,21.2145375 12.909628,20.8033023 L19.7677785,15.559828 C20.1693192,15.2528257 20.2459576,14.6784381 19.9389553,14.2768974 C19.9376429,14.2751809 19.9363245,14.2734691 19.935,14.2717619 L19.935,14.2717619 C19.6266937,13.8743807 19.0546209,13.8021712 18.6572397,14.1104775 C18.654352,14.112718 18.6514778,14.1149757 18.6486172,14.1172508 L12.9235044,18.6705218 C12.377022,19.1051477 11.6029199,19.1052208 11.0563554,18.6706981 Z" fill="#000000" opacity="0.3" />
                                                    </g>
                                                </svg>
                                            </span>
                                            <span className="menu-text">Homepage</span>
                                        </Link>
                                    </li>
                                    <li className="menu-section">
                                        <h4 className="menu-text">Maps</h4>
                                        <i className="menu-icon ki ki-bold-more-hor icon-md"></i>
                                    </li>
                                    <li className="menu-item menu-item-submenu" data-menu-toggle="hover">
                                        <a href="!#" className="menu-link menu-toggle">
                                            <span className="svg-icon menu-icon">
                                                <i className="fas fa-map-marked-alt"></i>
                                            </span>
                                            <span className="menu-text">Map</span>
                                            <i className="menu-arrow"></i>
                                        </a>
                                        <div className="menu-submenu">
                                            <ul className="menu-subnav">
                                                <li className="menu-item" >
                                                    <Link to="/countdown" className="menu-link" >
                                                        <i className="menu-bullet menu-bullet-dot">
                                                            <span></span>
                                                        </i>
                                                        <span className="menu-text">Countdown Time</span>
                                                    </Link>
                                                </li>
                                            </ul>
                                            <ul className="menu-subnav">
                                                <li className="menu-item" >
                                                    <Link to="/maps" className="menu-link" >
                                                        <i className="menu-bullet menu-bullet-dot">
                                                            <span></span>
                                                        </i>
                                                        <span className="menu-text">Your position</span>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li className="menu-section">
                                        <h4 className="menu-text">Ticket</h4>
                                        <i className="menu-icon ki ki-bold-more-hor icon-md"></i>
                                    </li>
                                    <li className="menu-item menu-item-submenu" data-menu-toggle="hover">
                                        <a href="!#" className="menu-link menu-toggle">
                                            <span className="svg-icon menu-icon">
                                                <i className="fas fa-ticket-alt"></i>
                                            </span>
                                            <span className="menu-text">Ticket</span>
                                            <i className="menu-arrow"></i>
                                        </a>
                                        <div className="menu-submenu">
                                            <ul className="menu-subnav">
                                                <li className="menu-item" >
                                                    <Link to="/ticket-current" className="menu-link">
                                                        <i className="menu-bullet menu-bullet-dot">
                                                            <span></span>
                                                        </i>
                                                        <span className="menu-text">Ticket Current</span>
                                                    </Link>
                                                </li>
                                                <li className="menu-item" >
                                                    <Link to="/list-ticket" className="menu-link">
                                                        <i className="menu-bullet menu-bullet-dot">
                                                            <span></span>
                                                        </i>
                                                        <span className="menu-text">History Ticket</span>
                                                    </Link>
                                                </li>
                                                <li className="menu-item" >
                                                    <Link to="/voucher" className="menu-link">
                                                        <i className="menu-bullet menu-bullet-dot">
                                                            <span></span>
                                                        </i>
                                                        <span className="menu-text">Voucher Ticket</span>
                                                    </Link>
                                                </li>

                                            </ul>
                                        </div>
                                    </li>
                                    <li className="menu-section">
                                        <h4 className="menu-text">News</h4>
                                        <i className="menu-icon ki ki-bold-more-hor icon-md"></i>
                                    </li>
                                    <li className="menu-item menu-item-submenu" data-menu-toggle="hover">
                                        <Link to="/localnews" className="menu-link menu-toggle">
                                            <span className="svg-icon menu-icon">
                                                <i className="fas fa-newspaper"></i>
                                            </span>
                                            <span className="menu-text">News</span>
                                        </Link>
                                    </li>

                                    <li className="menu-section">
                                        <h4 className="menu-text">Store</h4>
                                        <i className="menu-icon ki ki-bold-more-hor icon-md"></i>
                                    </li>
                                    <li className="menu-item menu-item-submenu" data-menu-toggle="hover">
                                        <a href="!#" className="menu-link menu-toggle">
                                            <span className="svg-icon menu-icon">
                                                <i className="fas fa-store"></i>
                                            </span>
                                            <span className="menu-text">Store</span>
                                            <i className="menu-arrow"></i>
                                        </a>
                                        <div className="menu-submenu">
                                            <ul className="menu-subnav">
                                                <li className="menu-item" >
                                                    <Link to="/products" className="menu-link">
                                                        <i className="menu-bullet menu-bullet-dot">
                                                            <span></span>
                                                        </i>
                                                        <span className="menu-text">Product</span>
                                                    </Link>
                                                </li>
                                                <li className="menu-item" >
                                                    <Link to='/historybuy' className="menu-link">
                                                        <i className="menu-bullet menu-bullet-dot">
                                                            <span></span>
                                                        </i>
                                                        <span className="menu-text">History to Purchased</span>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                            )}
                            {this.props.authUser.roles === ROLES.STAFF_FOOD && (
                                <ul className="menu-nav">
                                    <li className="menu-item">
                                        <Link to="/homepage-staff" className="menu-link">
                                            <span className="svg-icon menu-icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                                        <polygon points="0 0 24 0 24 24 0 24" />
                                                        <path d="M12.9336061,16.072447 L19.36,10.9564761 L19.5181585,10.8312381 C20.1676248,10.3169571 20.2772143,9.3735535 19.7629333,8.72408713 C19.6917232,8.63415859 19.6104327,8.55269514 19.5206557,8.48129411 L12.9336854,3.24257445 C12.3871201,2.80788259 11.6128799,2.80788259 11.0663146,3.24257445 L4.47482784,8.48488609 C3.82645598,9.00054628 3.71887192,9.94418071 4.23453211,10.5925526 C4.30500305,10.6811601 4.38527899,10.7615046 4.47382636,10.8320511 L4.63,10.9564761 L11.0659024,16.0730648 C11.6126744,16.5077525 12.3871218,16.5074963 12.9336061,16.072447 Z" fill="#000000" fillRule="nonzero" />
                                                        <path d="M11.0563554,18.6706981 L5.33593024,14.122919 C4.94553994,13.8125559 4.37746707,13.8774308 4.06710397,14.2678211 C4.06471678,14.2708238 4.06234874,14.2738418 4.06,14.2768747 L4.06,14.2768747 C3.75257288,14.6738539 3.82516916,15.244888 4.22214834,15.5523151 C4.22358765,15.5534297 4.2250303,15.55454 4.22647627,15.555646 L11.0872776,20.8031356 C11.6250734,21.2144692 12.371757,21.2145375 12.909628,20.8033023 L19.7677785,15.559828 C20.1693192,15.2528257 20.2459576,14.6784381 19.9389553,14.2768974 C19.9376429,14.2751809 19.9363245,14.2734691 19.935,14.2717619 L19.935,14.2717619 C19.6266937,13.8743807 19.0546209,13.8021712 18.6572397,14.1104775 C18.654352,14.112718 18.6514778,14.1149757 18.6486172,14.1172508 L12.9235044,18.6705218 C12.377022,19.1051477 11.6029199,19.1052208 11.0563554,18.6706981 Z" fill="#000000" opacity="0.3" />
                                                    </g>
                                                </svg>
                                            </span>
                                            <span className="menu-text">Homepage</span>
                                        </Link>
                                    </li>
                                    <li className="menu-section">
                                        <h4 className="menu-text">Order Management</h4>
                                        <i className="menu-icon ki ki-bold-more-hor icon-md"></i>
                                    </li>
                                    <li className="menu-item menu-item-submenu" data-menu-toggle="hover">
                                        <a href="!#" className="menu-link menu-toggle">
                                            <span className="svg-icon menu-icon">
                                                <i className="far fa-user-circle"></i>
                                            </span>
                                            <span className="menu-text">Order Management</span>
                                            <i className="menu-arrow"></i>
                                        </a>
                                        <div className="menu-submenu">
                                            <ul className="menu-subnav">
                                                <li className="menu-item" >
                                                    <Link to="/confirm-order" className="menu-link" >
                                                        <i className="menu-bullet menu-bullet-dot">
                                                            <span></span>
                                                        </i>
                                                        <span className="menu-text">Confirm Order</span>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                            )}
                            {this.props.authUser.roles === ROLES.STAFF_INSPECTOR && (
                                <ul className="menu-nav">
                                    <li className="menu-item">
                                        <Link to="/check-ticket" className="menu-link">
                                            <span className="svg-icon menu-icon">
                                                <i className="fas fa-check"></i>
                                            </span>
                                            <span className="menu-text">Check Ticket</span>
                                        </Link>
                                    </li>
                                    <li className="menu-section">
                                        <h4 className="menu-text">Notification</h4>
                                        <i className="menu-icon ki ki-bold-more-hor icon-md"></i>
                                    </li>
                                    <li className="menu-item menu-item-submenu" data-menu-toggle="hover">
                                        <a href="!#" className="menu-link menu-toggle">
                                            <span className="svg-icon menu-icon">
                                                <i className="fa fa-bullhorn" aria-hidden="true"></i>
                                            </span>
                                            <span className="menu-text">Notification</span>
                                            <i className="menu-arrow"></i>
                                        </a>
                                        <div className="menu-submenu">
                                            <ul className="menu-subnav">
                                                <li className="menu-item" >
                                                    <Link to="/notify-staff" className="menu-link" >
                                                        <i className="menu-bullet menu-bullet-dot">
                                                            <span></span>
                                                        </i>
                                                        <span className="menu-text">Notify Issue</span>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>

                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const AsideLeftComponentPage = withFirebase(AsideLeftComponentBase);
const condition = authUser => !!authUser;

export default compose(withAuthorization(condition))(AsideLeftComponent)