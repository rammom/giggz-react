import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal'
import ListGroup from "react-bootstrap/ListGroup"
import auth from '../../auth';
import "./UserModal.css";

export class UserModal extends Component {

	state = {
		variant: this.props.Variant,
	}

	componentDidUpdate(oldProps) {
		if (oldProps.Variant !== this.props.Variant)
			this.setState({variant: this.props.Variant});
	}

	render() {
		let user = auth.getCachedUser();
		return (
			<Modal size="lg" show={this.props.show} onHide={this.props.onHide} centered>
				<Modal.Body className="body-styles">
					<div style={{ marginBottom: "2em" }}>
						<img
							className="profile-image"
							src={user.image}
							alt="profile"
						/>
						<h1>{user.firstname} {user.lastname}</h1>
						<b>Email: </b><span>{user.email}</span><br />
						<b>Phone: </b><span>{user.phone}</span>
					</div>
					<ListGroup variant="flush">
						<ListGroup.Item action className="list-item" onClick={() => this.props.history.push("/account")}>Account Settings</ListGroup.Item>
						<ListGroup.Item action className="list-item" onClick={() => this.props.history.push("/giggz")}>My Giggz</ListGroup.Item>
						<ListGroup.Item action className={`list-item ${this.state.variant}`} onClick={this.props.logout}>Logout</ListGroup.Item>
						<hr />
					</ListGroup>
				</Modal.Body>
			</Modal>
		)
	}
}

export default UserModal;