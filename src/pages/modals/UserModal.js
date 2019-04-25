import React from 'react'
import Modal from 'react-bootstrap/Modal'
import ListGroup from "react-bootstrap/ListGroup"
import auth from '../../auth';
import "./UserModal.css";

function UserModal(props) {
	let user = auth.getCachedUser();
	return (
		<Modal size="lg" show={props.show} onHide={props.onHide} centered>
			<Modal.Body className="body-styles">
				<div style={{marginBottom: "2em"}}>
					<img
						className="profile-image"
						src={user.image}
						alt="profile"
					/>
					<h1>{user.firstname} {user.lastname}</h1>
					<b>Email: </b><span>{user.email}</span><br/>
					<b>Phone: </b><span>{user.phone}</span>
				</div>
				<ListGroup variant="flush">
					<ListGroup.Item action className="list-item" onClick={() => props.history.push("/account")}>Account Settings</ListGroup.Item>
					<ListGroup.Item action className="list-item" onClick={() => props.history.push("/giggz")}>My Giggz</ListGroup.Item>
					<ListGroup.Item action className="list-item" onClick={props.logout}>Logout</ListGroup.Item>
					<hr />
				</ListGroup>
			</Modal.Body>
		</Modal>
	)
}


export default UserModal
