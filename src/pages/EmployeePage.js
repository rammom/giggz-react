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
		service: {
			name: '',
			length: 0
		},
		appointment: null,
	}

	async componentWillMount() {
		await axios.get(`/api/store/${this.props.match.params.slug}`)
			.then(res => {
				console.log(res.data);
				this.setState({ store: res.data.store });
				for (let i = 0; i < res.data.store.employees.length; ++i){
					let employee = res.data.store.employees[i];
					if (employee._id.toString() === this.props.match.params.employeeId){
						let service = employee.services[0];
						this.setState({employee});
						this.setState({service});
						console.log(service);
						break;
					}
				}
				console.log(this.state.employee.user.firstname);
			})
			.catch(err => {
				console.log(err);
			})
	}

	updateService = async (serv) => {
		let service = this.state.employee.services.filter( s => s.name === serv )[0];
		this.setState({ service });
	}

	setAppointment = (appointment) => {
		console.log("set appointment for ", appointment);
		this.setState({ appointment });
	}

	render() {
		return (
			<div>
				<MyNavbar color="#dd0000" history={this.props.history} />
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
								service={this.state.service}
								updateService={this.updateService}
								appointment={this.state.appointment}
							/>
						</Col>
						<Col>
							<h6 style={{textAlign: "center"}}>Select your prefered time slot below.</h6>
							<Calendar 
								setAppointment={this.setAppointment}
								availability={this.state.employee.hours} 
								appointments={this.state.employee.appointments}
								possibleSelections={[
									{
										datetime: date,
										length: 45
									}
								]}
								serviceLength={parseInt(this.state.service.length)}
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