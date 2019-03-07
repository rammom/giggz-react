import React, { Component } from 'react';
import axios from 'axios';

import MyNavbar from '../components/MyNavbar';
import MyContainer from '../components/MyContainer';
import MyButton from '../components/MyButton';
import { Row, Col, ProgressBar } from 'react-bootstrap';
import Calendar from '../components/Calendar/Calendar';
import ServiceSelection from '../components/ServiceSelection';


let click_distance = 3;
let progress = `${(100 / 5) * (6 - click_distance)}`

export class EmployeePage extends Component {

	state = {
		store: {},
		employee: {
			user: {},
			services: [],
			hours: null,
			appointments: []
		},
		appointment: {
			date: null,
			service: {
				name: '',
				length: 0
			}
		},
		refreshCalendar: false,
		display_prompt_login_modal: false,
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
		let refreshCalendar = true;
		if (refresh) this.setState({ refreshCalendar });
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
				console.log(res.data);
				this.props.history.push(`/receipt/${res.data.appointment._id}`)
			})
			.catch(err => {
				console.log(err);
			})
	}

	resetClear = () => {
		let refreshCalendar = false;
		this.setState({refreshCalendar});
		console.log(this.state.refreshCalendar);
	}

	show_prompt_login_modal = () => {
		this.setState({display_prompt_login_modal: true});
	}
	confirm_prompt_login_display = () => {
		this.setState({display_prompt_login_modal: false});
	}

	render() {
		return (
			<div>
				<MyNavbar 
					color="#dd0000" 
					history={this.props.history} 
					show_prompt_login_modal={this.state.display_prompt_login_modal} 
					confirm_prompt_login_display={this.confirm_prompt_login_display}
				/> 
				<MyContainer>
					<Row>
						<Col sm={2}>
							<MyButton text="Go Back" size="sm" onClick={() => { this.props.history.goBack() }} />
						</Col>
						<Col style={{ margin: "auto" }}>
							<ProgressBar animated variant="danger" now={progress} label={`${click_distance} clicks away`} />
						</Col>
					</Row>
					<br />
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
								setAppointment={this.setAppointment}
								availability={this.state.employee.hours} 
								appointments={this.state.employee.appointments}
								user_appointment={this.state.appointment}
								serviceLength={parseInt(this.state.appointment.service.length)}
								clear={this.state.refreshCalendar}
								resetClear={this.resetClear}
								cancelAppointment={this.cancelAppointment}
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