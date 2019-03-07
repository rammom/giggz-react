import React, { Component } from 'react';
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import StoresPage from './pages/StoresPage';
import StorePage from './pages/StorePage';
import EmployeePage from './pages/EmployeePage';
import AppointmentReceiptPage from './pages/AppointmentReceiptPage';

export class Routes extends Component {
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={LandingPage} />
					<Route exact path="/stores" component={StoresPage} />
					<Route exact path="/store/:slug/:employeeId" component={EmployeePage} />
					<Route exact path="/store/:slug" component={StorePage} />
					<Route exact path="/receipt/:apptId" component={AppointmentReceiptPage} />

					<Route exact path="*">
						<Redirect to="/" />
					</Route>
				</Switch>
			</BrowserRouter>
		)
	}
}

export default Routes;
