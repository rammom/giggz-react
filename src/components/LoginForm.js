import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import ErrorFlash from './ErrorFlash';

export class LoginForm extends Component {

	state = {
		user: {
			email: '',
			password: ''
		}
	}

	onChange = async (e) => {
		let user = this.state.user;
		user[e.target.name] = e.target.value;
		this.setState({ user });
	}

	onSubmit = async (e) => {
		e.preventDefault();
		this.props.login(this.state.user);
	}

	render() {
		return (
			<div>
				<ErrorFlash message={this.props.error} />
				<Form onSubmit={this.onSubmit}>

					<Form.Group controlId="formBasicEmail">
						<Form.Label>Email address</Form.Label>
						<Form.Control type="email" name="email" value={this.state.user.email} placeholder="Enter email" onChange={this.onChange} />
					</Form.Group>

					<Form.Group controlId="formBasicPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control type="password" name="password" value={this.state.user.password} placeholder="Password" onChange={this.onChange} />
					</Form.Group>

					<Button variant="primary" type="submit">
						Login
  					</Button>

				</Form>
			</div>
		)
	}
}

export default LoginForm;
