import React, { Component } from 'react';
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import StorePage from './pages/StorePage';

export class Routes extends Component {
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={LandingPage} />
					<Route exact path="/stores" component={StorePage} />

					<Route exact path="*">
						<Redirect to="/" />
					</Route>
				</Switch>
			</BrowserRouter>
		)
	}
}

export default Routes;
