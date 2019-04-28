import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import LoginForm from '../../components/LoginForm';
import './Modal.css';

export class LoginModal extends Component {
	render() {
		return (
			<Modal show={this.props.show} onHide={this.props.onHide} centered>
				<Modal.Header closeButton>
					<Modal.Title>Login</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<LoginForm login={this.props.login} error={this.props.error} Variant={this.props.Variant}/>
				</Modal.Body>

				<Modal.Footer className="footer">
					Need an account? &nbsp; <span className={this.props.Variant} onClick={this.props.register}>Sign up </span>
				</Modal.Footer>
			</Modal>
		)
	}
}

export default LoginModal;
