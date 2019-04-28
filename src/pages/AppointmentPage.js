import React, { Component } from 'react';
import AuthController from '../components/AuthController';
import MyContainer from "../components/MyContainer";
import MyButton from "../components/MyButton";
import Jumbotron from "react-bootstrap/Jumbotron";
import Row from "react-bootstrap/Row";
import AppointmentReceipt from "../components/AppointmentReceipt";
import moment from "moment";
import axios from 'axios';

export class AppointmentPage extends Component {

	state = {
		appointment: {}
	}

	componentDidMount() {
		axios.get(`/api/appointment/${this.props.match.params.giggId}`)
			.then(res => {
				let appointment = res.data.appointment;
				appointment.datetime = moment(appointment.datetime)
				appointment.createdAt = moment(appointment.createdAt);
				this.setState({appointment});
				console.log(res.data.appointment);
			})
			.catch(err => {
				console.log(err);
				this.props.history.push('/');
			});
	}

	cancelAppointment = () => {
		axios.delete(`/api/appointment/${this.state.appointment._id}`)
			.then(res => console.log(res))
			.catch(err => console.log(err));
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
					<Row style={PageOneStyles}>
						<Jumbotron style={JumbotronStyles}>
							{this.state.appointment.service ? <AppointmentReceipt appointment={this.state.appointment} /> : null}
							<div style={{float: "right", marginTop: "1em"}}>
								{this.state.appointment.service && new Date(this.state.appointment.datetime) - new Date() > 0 ? <MyButton text="Cancel Gigg" onClick={this.cancelAppointment}/> : null}
							</div>
						</Jumbotron>
					</Row>
				</MyContainer>
			</div>
		)
	}
}

const PageOneStyles = {
	width: "100%",
	margin: "0",
}

const JumbotronStyles = {
	width: "90%",
	margin: "auto",
}


export default AppointmentPage;