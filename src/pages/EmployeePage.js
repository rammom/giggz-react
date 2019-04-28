import React, { Component } from 'react';
import axios from 'axios';

import AuthController from '../components/AuthController';
import MyContainer from '../components/MyContainer';
import { Row, Col } from 'react-bootstrap';
import Calendar from '../components/Calendar/Calendar';
import ServiceSelection from '../components/ServiceSelection';

export class EmployeePage extends Component {

	state = {
		store: {},
		employee: {
			user: {},
			services: [],
			hours: null,
			appointments: [],
			startTime: null,
			endTime: null,
		},
		appointment: {
			date: null,
			service: {
				name: '',
				length: 0
			}
		},
		refreshCalendar: false,
	}

	async componentWillMount() {
		await axios.get(`/api/store/${this.props.match.params.slug}`)
			.then(res => {
				this.setState({ store: res.data.store });
				for (let i = 0; i < res.data.store.employees.length; ++i){
					let employee = res.data.store.employees[i];
					if (employee._id.toString() === this.props.match.params.employeeId){
						this.setState({ employee });
						this.updateService(employee.services[0].name);
						break;
					}
				}
			})
			.catch(err => {
				console.log(err);
			})
	}

	updateService = async (serv) => {
		let service = this.state.employee.services.filter( s => s.name === serv )[0];
		let appointment = this.state.appointment;
		appointment.service = service;
		appointment.date = null;
		this.setState({ appointment });
	}

	setAppointment = (date) => {
		let appointment = this.state.appointment;
		appointment.date = date;
		this.setState({ appointment });
	}
	cancelAppointment = (refresh=true) => {
		let appointment = this.state.appointment;
		appointment.date = null;
		if (refresh) this.clearCal();
		this.setState({ appointment });
	}
	scheduleAppointment = async () => {
		if (!this.state.employee._id || !this.state.appointment.service._id || !this.state.appointment.date) return;
		let body = {
			employeeid: this.state.employee._id,
			serviceid: this.state.appointment.service._id,
			date: new Date(this.state.appointment.date),
		}
		await axios.post('/api/employee/appointment', body)
			.then(res => {
				this.props.history.push(`/receipt/${res.data.appointment._id}`)
			})
			.catch(err => {
				console.log(err);
			})
	}

	clearCal = () => {
		let refreshCalendar = true;
		this.setState({ refreshCalendar });
	}
	resetClear = () => {
		let refreshCalendar = false;
		this.setState({refreshCalendar});
	}

	render() {
		return (
			<div>
				<AuthController
					ShowNavbar
					history={this.props.history}
					Variant="red"
					BrandName="Giggz"
				/>
				<MyContainer>
					{/* <Row>
						<Col sm={2}>
							<MyButton text="Go Back" size="sm" onClick={() => { this.props.history.goBack() }} />
						</Col>
					</Row>
					<br /> */}
					<Row>
						<Col sm={1} style={{padding: "0"}}>
							<img
								style={ProfileImageStyle}
								src={this.state.employee.user.image}
								alt="profile"
							/>
						</Col>
						<Col>
							<h1>{this.state.employee.user.firstname} {this.state.employee.user.lastname}</h1>
							<h5>4.8 <i className="fa fa-star"></i></h5>
						</Col>
					</Row>
					<hr />	
					<Row>
						<Col xs={3}>
							<ServiceSelection 
								services={this.state.employee.services}
								updateService={this.updateService}
								appointment={this.state.appointment}
								cancelAppointment={this.cancelAppointment}
								promptLogin={this.show_prompt_login_modal}
								scheduleAppointment={this.scheduleAppointment}
							/>
						</Col>
						<Col>
							<h6 style={{textAlign: "center"}}>Select your prefered time slot below.</h6>
							<Calendar 
								editable
								availability={this.state.employee.hours}
								appointments={this.state.employee.appointments.map(appt => {
									return {
										datetime: new Date(appt.datetime),
										length: appt.service.length,
									}
								})}
								serviceLength={parseInt(this.state.appointment.service.length)}
								setAppointment={this.setAppointment}
								view={"week"}
							/>
						</Col>
					</Row>
				</MyContainer>
			</div>
		)
	}
}

let date = new Date();
date.setHours(16);

const ProfileImageStyle = {
	borderRadius: "50%",
	border: "3px solid black",
	width: "100%",
}

export default EmployeePage;