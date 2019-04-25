import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import auth from '../auth';

import LoginModal from '../pages/modals/LoginModal';
import UserModal from '../pages/modals/UserModal';
import RegisterModal from '../pages/modals/RegisterModal';
import PromptLoginModal from '../pages/modals/PromptLoginModal';

export class MyNavbar extends Component {
	constructor(props) {
		super(props);
		this.NavbarStyles = {
			backgroundColor: "#00000000",
			width: "100%",
			paddingTop: "20px",
			paddingBottom: "20px",
			paddingLeft: "40px",
			paddingRight: "40px",
			fontSize: "16px",
			zIndex: "5"
		}
		if (this.props.color) {
			this.NavbarStyles.backgroundColor = this.props.color;
		}
		if (this.props.absolute) {
			this.NavbarStyles.position = "absolute";
			this.NavbarStyles.top = "0";
			this.NavbarStyles.left = "0";
		}
	}

	state = {
		login_error: '',
		register_error: '',
		register_success: '',
		register_invalid_fields: [],
		display_login_modal: false,
		display_register_modal: false,
		display_user_modal: false,
		display_prompt_login_modal: false 
	}

	register = async (user) => {
		await auth.register(
			user,
			res => {
				this.setState({ register_error: "" });
				this.setState({ register_success: "You've been successfully registered!" });
			},
			err => {
				if (err.msg === "invalid fields"){
					this.setState({ register_error: "Please fix the following: " });
					this.setState({ register_invalid_fields: err.invalid_fields });
				}
				if (err.msg === "duplicate fields"){
					let str = "";
					err.duplicate_fields.forEach((field) => {
						console.log(field)
						str += field + ", ";
					});
					str = str.substring(0, str.length-2);
					str += ' is already in use!';
					this.setState({ register_error: str });
					this.setState({ register_invalid_fields: null });
				}
			}
		)
	}

	componentDidUpdate() {
		if (this.props.show_login_modal && !this.state.display_login_modal){
			this.show_login_modal();
		}
		if (this.props.show_register_modal && !this.state.display_register_modal){
			this.show_register_modal();
		}
		if (this.props.show_prompt_login_modal && !this.state.display_prompt_login_modal){
			this.show_prompt_login_modal();
			this.props.confirm_prompt_login_display();
		}
		if (this.props.show_user_modal && !this.state.display_user_modal){
			this.show_user_modal();
		}
	}

	login = async (user) => {
		await auth.login(
			user,
			res => {
				this.setState({ login_error: "" });
				this.hide_login_modal();
			},
			err => {
				this.setState({login_error: "Invalid email/password combination!"});
			}
		)
	}

	logout = async () => {
		await auth.logout();
		this.forceUpdate();
	}

	show_login_modal = () => {
		this.hide_register_modal();
		this.hide_prompt_login_modal();
		this.setState({display_login_modal: true});
	}
	hide_login_modal = () => {
		this.setState({display_login_modal: false});
	}

	show_prompt_login_modal = () => {
		this.hide_register_modal();
		this.hide_login_modal();
		this.setState({ display_prompt_login_modal: true });
	}
	hide_prompt_login_modal = () => {
		this.setState({ display_prompt_login_modal: false });
	}

	show_register_modal = () => {
		this.hide_login_modal();
		this.hide_prompt_login_modal()
		this.setState({ display_register_modal: true });
	}
	hide_register_modal = () => {
		this.setState({ display_register_modal: false });
		this.setState({ register_error: "" });
		this.setState({ register_success: "" });
		this.setState({ register_invalid_fields: [] });
	}

	show_user_modal = () => {
		this.hide_register_modal();
		this.hide_login_modal();
		this.hide_prompt_login_modal();
		this.setState({display_user_modal: true});
	}
	hide_user_modal = () => {
		this.setState({display_user_modal: false});
		this.setState({ login_error: '' });
	}


	render() {
		return (
			<Navbar variant="dark" style={this.NavbarStyles} >
				<Navbar.Brand style={NavbarBrandStyle} onClick={() => {this.props.history.push('/')}}>Giggz</Navbar.Brand>
				<Nav className="ml-auto">


					<Nav.Link style={NavbarLinkStyle} hidden={auth.isAuthenticated()} onClick={this.show_login_modal}>
						<i className="fa fa-lg fa-user-circle-o" style={UserIconStyles}></i> &nbsp; Log In
					</Nav.Link>
					<LoginModal 
						hidden={auth.isAuthenticated()} 
						show={this.state.display_login_modal} 
						onHide={this.hide_login_modal} 
						login={this.login} 
						register={this.show_register_modal} 
						error={this.state.login_error} />
					<RegisterModal 
						hidden={auth.isAuthenticated()} 
						show={this.state.display_register_modal} 
						onHide={this.hide_register_modal} 
						login={this.show_login_modal} 
						register={this.register} 
						error={this.state.register_error} 
						invalid_fields={this.state.register_invalid_fields} 
						success={this.state.register_success} />
					<PromptLoginModal
						show={this.state.display_prompt_login_modal}
						onHide={this.hide_prompt_login_modal}
						login={this.show_login_modal}
						register={this.show_register_modal}
					/>

					<Nav.Item hidden={!auth.isAuthenticated()} onClick={this.show_user_modal}>
						<Nav.Link style={UsernameStyles}> 
							<i className="fa fa-lg fa-user-circle-o" style={UserIconStyles}></i> &nbsp;
							{auth.getCachedUser().firstname} {auth.getCachedUser().lastname} 
						</Nav.Link>						
					</Nav.Item>
					<UserModal 
						hidden={!auth.isAuthenticated()} 
						show={this.state.display_user_modal} 
						onHide={this.hide_user_modal} 
						history={this.props.history} 
						logout={this.logout} />

					<Nav.Link style={NavbarLinkStyle} onClick={() => this.props.history.push("/stores")}>Find a Gigg </Nav.Link>
				</Nav>
			</Navbar>
		)
	}
}

const nav_text_color = "#f8f8ff";
//const primary_color = "#6cbccf";

const NavbarBrandStyle = {
	color: nav_text_color,
	fontSize: "22px",
	cursor: "pointer"
}

const NavbarLinkStyle = {
	color: nav_text_color,
	paddingRight: "1em"
}

const UsernameStyles = {
	paddingRight: "20px",
	color: nav_text_color,
	fontWeight: "bold"
}

const UserIconStyles = {
	fontSize: "25px"
}

export default MyNavbar;