import React, { Component } from 'react';
import { Modal, Button, Card } from 'react-bootstrap';

export class StoreInfoModal extends Component {
	render() {
		return (
			<Modal size="lg" show={this.props.show} onHide={this.props.onHide} centered>
				<Modal.Header closeButton>
					<Modal.Title>Contact <b style={{ color: "#dd0000" }}>{this.props.store.name}</b></Modal.Title>
				</Modal.Header>
				<Modal.Body style={{margin: 'auto'}}>
					<Card style={{ width: '75%' }}>
						<Card.Body>
							{this.props.store.phone}
						</Card.Body>
					</Card>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={this.props.onHide}>
						Close
            		</Button>
					<Button variant="danger" onClick={this.props.onHide}>
						Save Changes
            		</Button>
				</Modal.Footer>
			</Modal>
		)
	}
}

export default StoreInfoModal;