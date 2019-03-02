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
		possibleSelections: [],
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
		
		// POSSIBLE SELECTIONS
		let possibleSelections = [];
		for (let i = 0; i < utils.weekdays.length; ++i) {
			possibleSelections.push(this.props.possibleSelections.filter( s => utils.daysBetween(s.datetime, this.props.date) === i ));
		}

		for (let d = 0; d < possibleSelections.length; ++d) {
			if (d >= this.state.possibleSelections.length) {
				this.setState({ possibleSelections });
			}
			for (let a = 0; a < possibleSelections[d]; ++a) {
				if (a >= this.state.possibleSelections[d].length || this.state.possibleSelections[d][a] !== possibleSelections[d][a]) {
					this.setState({ possibleSelections });
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
							startHour={this.state.startHour} 
							endHour={this.state.endHour} 
							appointments={this.state.appointments[0]}
							possibleSelections={this.state.possibleSelections[0]}
							serviceLength={this.props.serviceLength}
							day={this.props.date.getDate()}
						/>
					</Col>

					<Col className="noPadding">
						<CalDayCol 
							startHour={this.state.startHour} 
							endHour={this.state.endHour} 
							appointments={this.state.appointments[1]}
							possibleSelections={this.state.possibleSelections[1]}
							serviceLength={this.props.serviceLength}
							day={this.props.date.getDate()+1}
						/>
					</Col>

					<Col className="noPadding">
						<CalDayCol 
							startHour={this.state.startHour} 
							endHour={this.state.endHour} 
							appointments={this.state.appointments[2]}
							possibleSelections={this.state.possibleSelections[2]}
							serviceLength={this.props.serviceLength}
							day={this.props.date.getDate()+2}
						/>
					</Col>

					<Col className="noPadding">
						<CalDayCol 
							startHour={this.state.startHour} 
							endHour={this.state.endHour} 
							appointments={this.state.appointments[3]}
							possibleSelections={this.state.possibleSelections[3]}	
							serviceLength={this.props.serviceLength}
							day={this.props.date.getDate()+3}
						/>
					</Col>

					<Col className="noPadding">
						<CalDayCol 
							startHour={this.state.startHour} 
							endHour={this.state.endHour} 
							appointments={this.state.appointments[4]}
							possibleSelections={this.state.possibleSelections[4]}
							serviceLength={this.props.serviceLength}
							day={this.props.date.getDate()+4}
						/>
					</Col>

					<Col className="noPadding">
						<CalDayCol 
							startHour={this.state.startHour} 
							endHour={this.state.endHour} 
							appointments={this.state.appointments[5]}
							possibleSelections={this.state.possibleSelections[5]}
							serviceLength={this.props.serviceLength}
							day={this.props.date.getDate()+5}
						/>
					</Col>

					<Col className="noPaddingLeft">
						<CalDayCol 
							startHour={this.state.startHour} 
							endHour={this.state.endHour} 
							appointments={this.state.appointments[6]}
							possibleSelections={this.state.possibleSelections[6]}
							serviceLength={this.props.serviceLength}
							day={this.props.date.getDate()+6}
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
