import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import LandingPage from './pages/LandingPage';

export class Routes extends Component {
	render() {
		return (
			<Switch>
				<Route exact path="/" component={LandingPage} />
			</Switch>
		)
	}
}

export default Routes;
