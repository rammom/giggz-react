import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';

import MyButton from '../components/MyButton';
import ErrorFlash from '../components/ErrorFlash';
import SuccessFlash from '../components/SuccessFlash';

export class RegisterForm extends Component {

	state = {
		user: {
			firstname: '',
			lastname: '',
			phone: '',
			email: '',
			password: '',
			password_verify: '',
		}
	}

	onChange = async (e) => {
		if (e.target.name === "phone"){
			let re = new RegExp("^[0-9]*$", 'g');
			if (!re.exec(e.target.value)) return;
		}
		let user = this.state.user;
		user[e.target.name] = e.target.value;
		this.setState({ user });
	}

	onSubmit = async (e) => {
		e.preventDefault();
		this.props.register(this.state.user);
	}

	render() {
		return (
			<div>
				<ErrorFlash message={this.props.error} invalid_fields={this.props.invalid_fields} />
				<SuccessFlash message={this.props.success} />
				<Form onSubmit={this.onSubmit}>

					<Form.Group>
						{/* <Form.Label>First Name</Form.Label> */}
						<Form.Control type="text" maxLength="16" name="firstname" value={this.state.user.firstname} placeholder="First Name" onChange={this.onChange} required/>
					</Form.Group>

					<Form.Group >
						{/* <Form.Label>Last Name</Form.Label> */}
						<Form.Control type="text" maxLength="16" name="lastname" value={this.state.user.lastname} placeholder="Last Name" onChange={this.onChange} required/>
					</Form.Group>

					<Form.Group >
						{/* <Form.Label>Phone</Form.Label> */}
						<Form.Control type="text" maxLength="10" name="phone" value={this.state.user.phone} placeholder="Phone" onChange={this.onChange} required/>
					</Form.Group>

					<Form.Group >
						{/* <Form.Label>Email address</Form.Label> */}
						<Form.Control type="email" name="email" value={this.state.user.email} placeholder="Enter email" onChange={this.onChange} required/>
					</Form.Group>

					<Form.Group>
						{/* <Form.Label>Password</Form.Label> */}
						<Form.Control type="password" name="password" value={this.state.user.password} placeholder="Password" onChange={this.onChange} required/>
					</Form.Group>
					
					<Form.Group>
						{/* <Form.Label>Confirm Password</Form.Label> */}
						<Form.Control type="password" name="password_verify" value={this.state.user.password_verify} placeholder="Confirm Password" onChange={this.onChange} required/>
					</Form.Group>

					<MyButton variant="primary" type="submit" text="Sign Up" />

				</Form>
			</div>
		)
	}
}

export default RegisterForm;
