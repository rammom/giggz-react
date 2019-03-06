import React, { Component } from 'react';
import { Form, Card } from 'react-bootstrap';

export class ServiceSelection extends Component {

	gen_services = () => {
		let services = [] 
		this.props.services.forEach(s => {
			services.push(<option key={s._id}>{s.name}</option>);
		});
		console.log(this.props.service)
		return services;
	}

	updateService = (e) => {
		this.props.updateService(e.target.value);
	}

	render() {
		return (
			<div>
				<h4>Choose your Gigg.</h4>
				<Form>
					<Form.Group controlId="exampleForm.ControlSelect1">
						<Form.Label>Service</Form.Label>
						<Form.Control as="select" value={this.props.service.name} onChange={this.updateService}>
							{this.gen_services()}
						</Form.Control>
						<Form.Text className="text-muted">
							<span style={{ float: "right" }}>{(this.props.service.length) ? this.props.service.length : 0} minutes.</span>
    					</Form.Text>
					</Form.Group>
				</Form>
				<br/>
				<Card border="success" style={{ width: '100%' }}>
					<Card.Header>Appointment</Card.Header>
					<Card.Body>
						<Card.Title>{this.props.service.name}</Card.Title>
						<Card.Text>
							{this.props.service.date}
     					</Card.Text>
						<hr />
						<div>
							<span style={{ float: "left", fontWeight: "900" }}>Total: </span>
							<span style={{ float: "right", fontWeight: "900" }}>${(this.props.service.price) ? this.props.service.price : 0} </span>
						</div>
					</Card.Body>
				</Card>
				<br />
				<hr/>
				
			</div>
		)
	}
}

export default ServiceSelection;