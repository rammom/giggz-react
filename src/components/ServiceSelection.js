import React, { Component } from 'react';
import { Form, Card, Button } from 'react-bootstrap';
import MyButton from './MyButton';
import utils from '../utils';
import auth from '../auth';

import ConfirmAppointmentModal from '../pages/modals/ConfirmAppointmentModal';


export class ServiceSelection extends Component {

	state = {
		display_confirm_appointment_modal: false,
	}

	gen_services = () => {
		let services = [] 
		this.props.services.forEach(s => {
			services.push(<option key={s._id}>{s.name}</option>);
		});
		return services;
	}

	updateService = (e) => {
		this.props.updateService(e.target.value);
	}

	show_confirm_appointment_modal = () => {
		if (auth.isAuthenticated()) {
			this.setState({ display_confirm_appointment_modal: true });
		}
		else {
			this.props.promptLogin();
		}
	}
	hide_confirm_appointment_modal = () => {
		this.setState({ display_confirm_appointment_modal: false });
	}

	gen_appt_card = () => {
		console.log(this.state.display_confirm_appointment_modal)
		return (this.props.appointment && this.props.appointment.date && this.props.appointment.service) 
		? 
		(
			<div style={{height: 'auto'}}>
				<Card border="success" style={{ width: '100%' }}>
					<Card.Header>Appointment</Card.Header>
					<Card.Body>
						<Card.Title>{this.props.appointment.service.name}</Card.Title>
						<Card.Text>
								{utils.weekdays_upper[this.props.appointment.date.day()]}, {utils.months[this.props.appointment.date.month()]} {this.props.appointment.date.date()} {this.props.appointment.date.year()}
								<br />
								at {this.props.appointment.date.format('hh:mm A')}
						</Card.Text>
						<hr />
						<div>
							<span style={{ float: "left", fontWeight: "900" }}>Total: </span>
							<span style={{ float: "right", fontWeight: "900" }}>${(this.props.appointment.service.price) ? this.props.appointment.service.price : 0} </span>
						</div>
					</Card.Body>
				</Card>
				<MyButton text="Make Appointment" style={{marginTop: '1em', right: "0px"}} size="sm" onClick={this.show_confirm_appointment_modal}/>
				<br />
				<Button variant="secondary" style={{ marginTop: '1em', right: "0px" }} size="sm" onClick={this.props.cancelAppointment}>
						Clear
            	</Button>
				<ConfirmAppointmentModal 
					show={this.state.display_confirm_appointment_modal}
					onHide={this.hide_confirm_appointment_modal}
					appointment={this.props.appointment}
					scheduleAppointment={this.props.scheduleAppointment}
				/>
			</div>
		)
		:
		null
	}

	render() {
		return (
			<div>
				<h4>Choose your Gigg.</h4>
				<Form>
					<Form.Group controlId="exampleForm.ControlSelect1">
						<Form.Label>Service</Form.Label>
						<Form.Control as="select" value={this.props.appointment.service.name} onChange={this.updateService}>
							{this.gen_services()}
						</Form.Control>
						<Form.Text className="text-muted">
							<span style={{ float: "right" }}>{(this.props.appointment.service) ? this.props.appointment.service.length : 0} minutes.</span>
    					</Form.Text>
					</Form.Group>
				</Form>
				<br/>
				{this.gen_appt_card()}
				<hr/>

			</div>
		)
	}
}

export default ServiceSelection;