import React from 'react';

import Modal from 'react-bootstrap/Modal';

import LoginForm from '../../components/LoginForm';

function LoginModal(props) {
	return (
		<Modal show={props.show} onHide={props.onHide} centered>
			<Modal.Header closeButton>
				<Modal.Title>Login</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<LoginForm login={props.login} error={props.error} />
			</Modal.Body>
		</Modal>

	)
}


export default LoginModal;
