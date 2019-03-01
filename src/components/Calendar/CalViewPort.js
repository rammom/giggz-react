import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap';

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

		let appointments = [];
		for (let i = 0; i < utils.weekdays.length; ++i) {
			appointments.push(this.props.appointments.filter( appt => utils.daysBetween(appt.datetime, this.props.date) === i));
			appointments[i] = appointments[i].map(appt => ({datetime: appt.datetime, length: appt.service.length}));
		}

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
		console.log(this.state.appointments);
	}

	render() {
		return (
			<div style={ViewPortStyles}>
				<Row>

					{/* Time Slots */}
					<Col xs={1} className="noPaddingRight">
						<CalTimeSlots startHour={this.state.startHour} endHour={this.state.endHour} />
					</Col>
					
					{/* Days of the week */}
					<Col className="noPadding">
						<CalDayCol startHour={this.state.startHour} endHour={this.state.endHour} appointments={this.state.appointments[0]}/>
					</Col>

					<Col className="noPadding">
						<CalDayCol startHour={this.state.startHour} endHour={this.state.endHour} appointments={this.state.appointments[1]}/>
					</Col>

					<Col className="noPadding">
						<CalDayCol startHour={this.state.startHour} endHour={this.state.endHour} appointments={this.state.appointments[2]}/>
					</Col>

					<Col className="noPadding">
						<CalDayCol startHour={this.state.startHour} endHour={this.state.endHour} appointments={this.state.appointments[3]}/>
					</Col>

					<Col className="noPadding">
						<CalDayCol startHour={this.state.startHour} endHour={this.state.endHour} appointments={this.state.appointments[4]}/>
					</Col>

					<Col className="noPadding">
						<CalDayCol startHour={this.state.startHour} endHour={this.state.endHour} appointments={this.state.appointments[5]}/>
					</Col>

					<Col className="noPaddingLeft">
						<CalDayCol startHour={this.state.startHour} endHour={this.state.endHour} appointments={this.state.appointments[6]}/>
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
