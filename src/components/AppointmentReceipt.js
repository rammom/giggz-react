import React, { Component } from 'react';
import utils from '../utils';
import { Card, Row, Col } from 'react-bootstrap';

export class AppointmentReceipt extends Component {

	render() {
		return (
			<div>
				<Card style={{ width: '90%', margin: 'auto' }}>
					<Card.Body>

						<Row>
							<Col>
								<h3>{this.props.appointment.store.name}</h3>
								<p style={{ marginTop: '0px', marginBottom: "0px" }}>with <b style={{ fontSize: "1.05em" }}>{this.props.appointment.employee.user.firstname} {this.props.appointment.employee.user.lastname}</b></p>
							</Col>
							<Col>
								<div >
									<span style={{ float: "left" }}>Scheduled: </span>
									<span style={{ float: "right" }}>{utils.weekdays_upper[this.props.appointment.createdAt.day()]}, {utils.months[this.props.appointment.createdAt.month()]} {this.props.appointment.createdAt.date()} {this.props.appointment.createdAt.year()}</span> <br />
									<span style={{ float: "left" }}>Gigg Id: </span>
									<span style={{ float: "right" }}>{this.props.appointment._id}</span>
								</div>
							</Col>
						</Row>
						<hr />
						<Row>
							<Col>
								<div style={{textAlign: "left"}}>
									<h3>{this.props.appointment.service.name}</h3>
									<p style={{marginTop: '0px', marginBottom: "0px"}}>for <b style={{fontSize: "1.2em"}}>{this.props.appointment.user.firstname} {this.props.appointment.user.lastname}</b></p>
									<p style={{ marginTop: '0px', marginBottom: "0px" }}>on <b style={{ fontSize: "1.2em" }}>{utils.weekdays_upper[this.props.appointment.datetime.day()]}, {utils.months[this.props.appointment.datetime.month()]} {this.props.appointment.datetime.date()} {this.props.appointment.datetime.year()}</b></p>
									<br />
									<span style={{ marginTop: '0px', marginBottom: "0px", borderBottom: "1px solid #dd0000aa" }}>Length: <b style={{ fontSize: "1.1em" }}>{this.props.appointment.service.length} minutes</b></span>
								</div>
							</Col>
						</Row>
						<hr />
						<Row>
							<Col>
								<div style={{ textAlign: "right" }}>
									Total: &nbsp; ${this.props.appointment.service.price} <br/>
									<span style={{ marginTop: '0px', marginBottom: "0px", fontSize: "12px", opacity: "0.7"}}>To be payed in cash</span>
								</div>
							</Col>
						</Row>

					</Card.Body>
				</Card>
			</div>
		)
	}
}

export default AppointmentReceipt;
