import React, { Component } from 'react';
import { Row, Jumbotron } from 'react-bootstrap';
import MyContainer from '../components/MyContainer';
import MyNavbar from '../components/MyNavbar';
import axios from 'axios';
import AppointmentReceipt from "../components/AppointmentReceipt";

import moment from 'moment';
moment().format();


export class AppointmentReceiptPage extends Component {

	state = {
		appointment: {
			_id: null,
			datetime: moment(),
			store: {
				name: null,
			},
			service: {
				name: null,
			},
			user: {

			},
			employee: {
				user: {

				},
			},
			createdAt: moment()
		}
	}

	componentDidMount() {
		axios.get(`/api/appointment/${this.props.match.params.apptId}`)
			.then(res => {
				let appointment = res.data.appointment;
				appointment.datetime = moment(appointment.datetime)
				appointment.createdAt = moment(appointment.createdAt);
				this.setState({appointment});
			})
			.catch(err => {
				this.props.history.push('/');
			});
	}

	render() {
		return (
			<div>
				<MyNavbar
					color="#dd0000"
					history={this.props.history}
				/>
				<MyContainer>
					<Row style={PageOneStyles}> 
						<Jumbotron style={JumbotronStyles}>
							<div style={{ textAlign: "center" }}>
								<h2> <span role="img" aria-label="hooray!"> 🎉</span>  Your Gigg is all set.  <span role="img" aria-label="hooray!">🎉</span></h2>
								<p> Thank you for booking with Giggz - We hope you enjoy your professional service! </p>
							</div>
							<hr />
							<AppointmentReceipt 
								appointment={this.state.appointment}
							/>
						</Jumbotron>
					</Row>
					<Row>

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

export default AppointmentReceiptPage;
