import React, { Component } from 'react';
import MyNavbar from './MyNavbar';
import LoginModal from '../pages/modals/LoginModal';
import RegisterModal from '../pages/modals/RegisterModal';
import UserModal from '../pages/modals/UserModal';
import auth from '../auth';

/*
	PROPS
	---------------------------------
	* ShowNavbar (True or False value. If True a navbar is rendered. *default false*)
		* The corresponding props for the navbar must be provided if shown:
	* history (React router's history obj)
*/

export class AuthController extends Component {

	state = {
		display_login_modal: false,
		display_register_modal: false,
		display_user_modal: false,
		login_error: "",
		register_error: "",
		register_invalid_fields: [],
		register_success: "",
	}

	login = user_credentials => {
		auth.login(
			user_credentials,
			res => {
				this.setState({display_login_modal: false});
				this.setState({login_error: ""});
			},
			err => {
				this.setState({login_error: "Invalid email/password combination!"});
			}
		)
	}
	register = user_credentials => {
		auth.register(
			user_credentials,
			res => {
				console.log(res);
				this.setState({register_error: ""});
				this.setState({register_success: "You've been successfully registered!"});
			},
			err => {
				if (err.msg === "invalid fields") {
					this.setState({ register_error: "Please fix the following: " });
					this.setState({ register_invalid_fields: err.invalid_fields });
				}
				if (err.msg === "duplicate fields") {
					let str = "";
					err.duplicate_fields.forEach((field) => {
						console.log(field)
						str += field + ", ";
					});
					str = str.substring(0, str.length - 2);
					str += ' is already in use!';
					this.setState({ register_error: str });
					this.setState({ register_invalid_fields: null });
				}
			}
		)
	}
	logout = () => {
		auth.logout()
		this.forceUpdate();
	}

	render_navbar = () => {
		if (!this.props.ShowNavbar) return null;
		return (
			<MyNavbar 
				Variant={this.props.Variant}
				BrandName={this.props.BrandName}
				OnBrandNameClick={() => this.props.history.push('/')}
				authenticated={auth.isAuthenticated()}
				OnLoginClick={() => this.open_modal("login")}
				user={auth.getCachedUser()}
				OnUserTagClick={() => this.open_modal("user")}
				CustomLinks={this.props.CustomLinks}
				history={this.props.history}
			/>
		)
	}

	render_login_modal = () => {
		return (
			<LoginModal
				Variant={this.props.Variant}
				hidden={auth.isAuthenticated()}
				show={this.state.display_login_modal}
				onHide={this.close_all_modals}
				login={this.login}
				register={() => this.open_modal("register")}
				error={this.state.login_error} 
			/>
		)
	}

	render_register_modal = () => {
		return (
			<RegisterModal 
				Variant={this.props.Variant}
				hidden={auth.isAuthenticated()} 
				show={this.state.display_register_modal} 
				onHide={this.close_all_modals} 
				login={() => this.open_modal("login")} 
				register={this.register} 
				error={this.state.register_error} 
				invalid_fields={this.state.register_invalid_fields} 
				success={this.state.register_success}
			/>
		)
	}

	render_user_modal = () => {
		return (
			<UserModal 
				Variant={this.props.Variant}
				hidden={!auth.isAuthenticated()} 
				show={this.state.display_user_modal} 
				onHide={this.close_all_modals}
				history={this.props.history} 
				logout={this.logout} 
			/>
		)
	}

	close_all_modals = async () => {
		await this.setState({display_login_modal: false});
		await this.setState({display_register_modal: false});
		await this.setState({display_user_modal: false});
	}
	open_modal = async (type) => {
		await this.close_all_modals();
		if (type === "login") this.setState({display_login_modal: true});
		else if (type === "register") this.setState({display_register_modal: true});
		else if (type === "user") this.setState({display_user_modal: true});
	}

	render() {
		return (
			<div>
				{this.render_navbar()}
				{this.render_login_modal()}
				{this.render_register_modal()}
				{this.render_user_modal()}
			</div>
		)
	}
}

export default AuthController;