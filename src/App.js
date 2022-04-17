import { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import { withAuthentication } from './components/Session';
import MainRoute from './MainRoute';
import { ProductsContextProvider } from './global/ProductsContext'
import { CartContextProvider } from './global/CartContext'
import { HistoryBuyContextProvider } from './global/HistoryBuyContext'
import { TrainTicketContextProvider } from './global/TrainTicketContext';
import MapGuest from './components/user/MapGuest';
import LoginAdmin from './components/LoginAdmin';
import PasswordForget from './components/PasswordForget';
import Register from './components/Register';
import OptionPage from './components/OptionPage';
import EnterTicket from './components/EnterTicket.jsx';
import { ProductsUserContextProvider } from './global/ProductsUserContext';
import Index from './components/homepage-index/Index';
// import Regulations from './components/homepage-index/Regulations';
class App extends Component {

	render() {
		return (
			<TrainTicketContextProvider>
				<ProductsContextProvider>
				<ProductsUserContextProvider>
					<CartContextProvider>
						<HistoryBuyContextProvider>
							<Router>
								<Switch>
									<Route exact path="/" component={Index}/>
									<Route exact path="/options" component={OptionPage}/>
									{/* <Route exact path="/regulations" component={Regulations}/> */}
									<Route exact path="/signin" component={Login} />
									<Route exact path="/register" component={Register} />
									<Route exact path="/enterticket" component={EnterTicket} />
									<Route exact path="/pw-forget" component={PasswordForget} />
									<Route path="/mapticket" component={localStorage.getItem('IdGuest') !== null ? MapGuest : EnterTicket} />
									<Route exact path="/admin-signin" component={LoginAdmin} />
									<MainRoute />
								</Switch>
							</Router>
						</HistoryBuyContextProvider>
					</CartContextProvider>
				</ProductsUserContextProvider>
				</ProductsContextProvider>
			</TrainTicketContextProvider>
		);
	}
}

export default withAuthentication(App);
