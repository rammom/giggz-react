import React from 'react';
import { Modal, Button, Card } from 'react-bootstrap';
import utils from '../../utils';
import MyButton from '../../components/MyButton';
import dateFns from 'date-fns';

function ConfirmAppointmentModal(props) {
	console.log(props.appointment)
	return (
		<Modal show={props.show} onHide={props.onHide} size="lg" centered>
			<Modal.Header closeButton>
				<Modal.Title>Confirm Gigg</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<h5>Please confirm that you would like to schedule the following Gigg.</h5>
				<Card style={{marginRight: "10%", marginLeft: "10%"}}>
					<Card.Body>
						<Card.Text>
							<b>Date:</b> <span style={{float: "right"}}>{utils.weekdays_upper[dateFns.getDay(props.appointment.date)]}, {utils.months[dateFns.getMonth(props.appointment.date)]} {dateFns.getDate(props.appointment.date)} {dateFns.getYear(props.appointment.date)}</span>
							<br />
							<b>Service:</b> <span style={{ float: "right" }}>{props.appointment.service.name}</span>
							<br />
							<b>Price:</b> <span style={{ float: "right" }}>${props.appointment.service.price}</span>
						</Card.Text>
					</Card.Body>
				</Card>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={props.onHide}>
					Cancel
            	</Button>
				<MyButton text="Confirm" onClick={props.scheduleAppointment} />
			</Modal.Footer>
		</Modal>
	)
}

export default ConfirmAppointmentModal;