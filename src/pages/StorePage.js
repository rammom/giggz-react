import React, { Component } from 'react';

import MyNavbar from '../components/MyNavbar';

export class StorePage extends Component {
	render() {
		return (
			<div>
				<MyNavbar color="#dd0000" absolute={false} history={this.props.history}/>
				<h1>Store Page</h1>
			</div>
		)
	}
}

export default StorePage;
