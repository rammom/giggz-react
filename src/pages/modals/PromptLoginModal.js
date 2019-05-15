import React from 'react';
import { Modal } from 'react-bootstrap';

import MyButton from '../../components/MyButton';

function PromptLoginModal(props) {
	return (
		<Modal show={props.show} onHide={props.onHide} centered>
			<Modal.Header closeButton>
				<Modal.Title>You need an account first!</Modal.Title>
			</Modal.Header>

			<Modal.Body style={{textAlign: "center"}}>
				<MyButton text="Register" onClick={props.register}/>
				<br />
				<br />
				or
				<br />
				<br />
				<MyButton text="Login" onClick={props.login}/>
			</Modal.Body>

		</Modal>
	)
}

export default PromptLoginModal;
