import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import auth from '../auth';

import LoginModal from '../pages/modals/LoginModal';
import UserModal from '../pages/modals/UserModal';

export class MyNavbar extends Component {

	state = {
		login_error: '',
		display_login_modal: false,
		display_user_modal: false,
	}

	login = async (user) => {
		await auth.login(
			user,
			res => {
				this.setState({ login_error: "" });
			},
			err => {
				this.setState({login_error: "Invalid email/password combination!"});
			}
		)
	}

	logout = async () => {
		await auth.logout();
	}

	show_login_modal = () => {
		this.setState({display_login_modal: true});
	}
	hide_login_modal = () => {
		this.setState({display_login_modal: false});
	}

	show_user_modal = () => {
		this.setState({display_user_modal: true});
	}
	hide_user_modal = () => {
		this.setState({display_user_modal: false});
	}


	render() {
		return (
			<Navbar bg="primary" variant="dark" style={NavbarStyles}>
				<Navbar.Brand href="#home">Giggz</Navbar.Brand>
				<Nav className="ml-auto">


					<Nav.Link hidden={auth.isAuthenticated()} onClick={this.show_login_modal}>Login <i className="fa fa-lg fa-sign-in"></i></Nav.Link>
					<LoginModal hidden={auth.isAuthenticated()} show={this.state.display_login_modal} onHide={this.hide_login_modal} login={this.login} error={this.state.login_error} />

					<Nav.Item hidden={!auth.isAuthenticated()} onClick={this.show_user_modal}>
						<Nav.Link style={UsernameStyles}> 
							<img
								src="https://s3.us-east-2.amazonaws.com/giggs/default_pp.jpg"
								style={ProfileImageStyle}
								width="30"
								height="30"
								className="d-inline-block align-top"
								alt="profile"
							/>
							{auth.getCachedUser().firstname} {auth.getCachedUser().lastname} 
						</Nav.Link>						
					</Nav.Item>
					<UserModal hidden={!auth.isAuthenticated()} show={this.state.display_user_modal} onHide={this.hide_user_modal} ></UserModal>

					<Nav.Link hidden={!auth.isAuthenticated()} onClick={this.logout}>Logout <i className="fa fa-lg fa-sign-out"></i></Nav.Link>



				</Nav>
			</Navbar>
		)
	}
}

const NavbarStyles = {
	paddingTop: "0",
	paddingBottom: "0",
}

const UsernameStyles = {
	paddingRight: "20px",
	color: "#f8f8ff",
	fontWeight: "bold"
}

const ProfileImageStyle = {
	marginRight: "10px",
	borderRadius: "50%",
	border: "3px solid black"
}

export default MyNavbar;