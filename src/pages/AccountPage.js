import React, { Component } from 'react';
import MyNavbar from "../components/MyNavbar";
import MyContainer from "../components/MyContainer";
import axios from 'axios';

export class AccountPage extends Component {

	state = {
		user: null,
	}

	componentDidMount() {
		axios.get('/api/user/getDetailedUser')
			.then(res => {
				if (!res.data.user) this.props.history.push("/");
				console.log(res.data.user);
				this.setState({user: res.data.user});
			})
			.catch(err => console.log(err));
	}

	render() {
		return (
			<div>
				<MyNavbar
					color="#dd0000"
					history={this.props.history}
				/>
				<MyContainer>
					<h1>Account Settings</h1>
					<p>{JSON.stringify(this.state.user)}</p>
				</MyContainer>
			</div>
		)
	}
}

export default AccountPage;