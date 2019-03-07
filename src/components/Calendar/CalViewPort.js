import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap';
import moment from 'moment';

import utils from '../../utils';
import CalTimeSlots from './CalTimeSlots';
import CalDayCol from './CalDayCol';

export class CalViewPort extends Component {

	state = {
		startHour: 0,
		endHour: 23,
		appointments: [],
	}

	componentDidUpdate() {

		// AVAILABILITY
		if (!this.props.availability) return;
		let startHour = 25;
		let endHour = -1;
		utils.weekdays.forEach(day => {
			if (!this.props.availability || this.props.availability[day].length === 0) return;
			startHour = Math.min(startHour, utils.minutes_to_time(this.props.availability[day][0].start).hours);
			endHour = Math.max(endHour, utils.minutes_to_time(this.props.availability[day][this.props.availability[day].length-1].end).hours);
		});

		if (this.state.startHour !== startHour)
			this.setState({ startHour });
		if (this.state.endHour !== endHour)
			this.setState({ endHour });

		// APPOINTMENTS
		let appointments = [];
		for (let i = 0; i < utils.weekdays.length; ++i) {
			appointments.push(this.props.appointments.filter(appt => utils.daysBetween(this.props.date, appt.datetime) === i));
			if (appointments[i]) appointments[i] = appointments[i].map(appt => ({datetime: appt.datetime, length: appt.service.length}));
		}
		console.log(this.props.appointments);

		for (let d = 0; d < appointments.length; ++d){
			if (d >= this.state.appointments.length) {
				this.setState({ appointments });
			}
			for (let a = 0; a < appointments[d]; ++a){
				if (a >= this.state.appointments[d].length || this.state.appointments[d][a] !== appointments[d][a]){
					this.setState({ appointments });
				}
			}
		}
	}

	render() {
		return (
			<div style={ViewPortStyles}>
				<Row>

					{/* Time Slots */}
					<Col xs={1} className="noPaddingRight">
						<CalTimeSlots 
							startHour={this.state.startHour} 
							endHour={this.state.endHour} 
						/>
					</Col>
					
					{/* Days of the week */}
					<Col className="noPadding">
						<CalDayCol 
							setAppointment={this.props.setAppointment}
							startHour={this.state.startHour} 
							endHour={this.state.endHour} 
							appointments={this.state.appointments[0]}
							user_appointment={this.props.user_appointment}
							serviceLength={this.props.serviceLength}
							date={moment(this.props.date)}
							clear={this.props.clear}
							resetClear={this.props.resetClear}
						/>
					</Col>

					<Col className="noPadding">
						<CalDayCol 
							setAppointment={this.props.setAppointment}
							startHour={this.state.startHour} 
							endHour={this.state.endHour} 
							appointments={this.state.appointments[1]}
							user_appointment={this.props.user_appointment}							
							serviceLength={this.props.serviceLength}
							date={moment(this.props.date).add(1, 'days')}
							clear={this.props.clear}
							resetClear={this.props.resetClear}
							cancelAppointment={this.props.cancelAppointment}
						/>
					</Col>

					<Col className="noPadding">
						<CalDayCol 
							setAppointment={this.props.setAppointment}
							startHour={this.state.startHour} 
							endHour={this.state.endHour} 
							appointments={this.state.appointments[2]}
							user_appointment={this.props.user_appointment}
							serviceLength={this.props.serviceLength}
							date={moment(this.props.date).add(2, 'days')}
							clear={this.props.clear}
							resetClear={this.props.resetClear}
							cancelAppointment={this.props.cancelAppointment}
						/>
					</Col>

					<Col className="noPadding">
						<CalDayCol 
							setAppointment={this.props.setAppointment}
							startHour={this.state.startHour} 
							endHour={this.state.endHour} 
							appointments={this.state.appointments[3]}
							user_appointment={this.props.user_appointment}
							serviceLength={this.props.serviceLength}
							date={moment(this.props.date).add(3, 'days')}
							clear={this.props.clear}
							resetClear={this.props.resetClear}
							cancelAppointment={this.props.cancelAppointment}
						/>
					</Col>

					<Col className="noPadding">
						<CalDayCol 
							setAppointment={this.props.setAppointment}
							startHour={this.state.startHour} 
							endHour={this.state.endHour} 
							appointments={this.state.appointments[4]}
							user_appointment={this.props.user_appointment}
							serviceLength={this.props.serviceLength}
							date={moment(this.props.date).add(4, 'days')}
							clear={this.props.clear}
							resetClear={this.props.resetClear}
							cancelAppointment={this.props.cancelAppointment}
						/>
					</Col>

					<Col className="noPadding">
						<CalDayCol 
							setAppointment={this.props.setAppointment}
							startHour={this.state.startHour} 
							endHour={this.state.endHour} 
							appointments={this.state.appointments[5]}
							user_appointment={this.props.user_appointment}
							serviceLength={this.props.serviceLength}
							date={moment(this.props.date).add(5, 'days')}
							clear={this.props.clear}
							resetClear={this.props.resetClear}
							cancelAppointment={this.props.cancelAppointment}
						/>
					</Col>

					<Col className="noPaddingLeft">
						<CalDayCol 
							setAppointment={this.props.setAppointment}
							startHour={this.state.startHour} 
							endHour={this.state.endHour} 
							appointments={this.state.appointments[6]}
							user_appointment={this.props.user_appointment}
							serviceLength={this.props.serviceLength}
							date={moment(this.props.date).add(6, 'days')}
							clear={this.props.clear}
							resetClear={this.props.resetClear}
							cancelAppointment={this.props.cancelAppointment}
						/>
					</Col>
				</Row>
			</div>
		)
	}
}

const ViewPortStyles = {
	width: "100%",
	maxHeight: "500px",
	border: "2px solid black",
	borderTop: "0px solid black",
	backgroundColor: "#ffffff",
	overflowY: "scroll",
	overflowX: "hidden"
}

export default CalViewPort
