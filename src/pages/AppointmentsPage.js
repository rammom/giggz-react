import React, { Component } from 'react';
import MyNavbar from "../components/MyNavbar";
import MyContainer from "../components/MyContainer";
import ListGroup from 'react-bootstrap/ListGroup';
import axios from 'axios';
import dateFns from 'date-fns'

export class AppointmentsPage extends Component {

	state = {
		appointments: []
	}

	componentDidMount() {
		axios.get('/api/appointment/getUserAppointments')
			.then(res => {
				console.log(res);
				let appts = res.data.appointments;
				appts.sort((a, b) => {
					let d1 = new Date(a.datetime);
					let d2 = new Date(b.datetime);
					return d2 - d1;
				});
				this.setState({appointments: appts});
				console.log(res.data.appointments);
			})
			.catch(err => {
				console.log(err);
			});
	}

	gen_list_group_items = () => {
		let appointments = this.state.appointments;
		let list_items = [];
		for (let i = 0; i < appointments.length; ++i){
			let appt = appointments[i];
			let name = appt.employee.user.firstname.substring(0, 1) + appt.employee.user.firstname.substring(1).toLowerCase()
				+ " " + appt.employee.user.lastname.substring(0, 1) + appt.employee.user.lastname.substring(1).toLowerCase();
			let styles = {
				fontWeight: "100",
				opacity: "0.9",
			}
			list_items.push(
				<ListGroup.Item action style={{cursor: "pointer"}} onClick={() => this.props.history.push(`/giggz/view/${appt._id}`)} key={i}>
					<h4>{appt.service.name}</h4>
					<h6> <b>At</b> <span style={styles}> {appt.store.name} with {name} </span> </h6>
					<h6> <b>On</b> <span style={styles}>{new Date(appt.datetime).toDateString()} at {dateFns.format(new Date(appt.datetime), 'h:mm a')} </span> </h6>
					{(new Date(appt.datetime) - new Date() > 0) ? <span style={{ color: "green" }}>Upcoming</span> : <span style={{ color: "red" }}>Done</span>}
				</ListGroup.Item>
			);
		}
		return list_items;
	}

	render() {
		return (
			<div>
				<MyNavbar
					color="#dd0000"
					history={this.props.history}
				/>
				<MyContainer>
					<h1>My Giggz</h1>
					<br />
					<ListGroup>
						{this.gen_list_group_items()}
					</ListGroup>
				</MyContainer>
			</div>
		)
	}
}

export default AppointmentsPage;