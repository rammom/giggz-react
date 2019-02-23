import React from 'react';
import Modal from 'react-bootstrap/Modal';

import RegisterForm from '../../components/RegisterForm';

function RegisterModal(props) {
	return (
		<Modal show={props.show} onHide={props.onHide} centered>
			<Modal.Header closeButton>
				<Modal.Title>Make An Account</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<RegisterForm register={props.register} error={props.error} invalid_fields={props.invalid_fields} success={props.success} />
			</Modal.Body>

			<Modal.Footer style={FooterStyle}>
				Already Have An Account? &nbsp; <span className="redLink" onClick={props.login}>Log In </span>
			</Modal.Footer>
		</Modal>
	)
}

const FooterStyle = {
	margin: "auto"
}

export default RegisterModal;
