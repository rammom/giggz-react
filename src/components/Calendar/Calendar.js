import React, { Component } from 'react';

import CalMenuBar from './CalMenuBar';
import CalViewPort from './CalViewPort';
import moment from 'moment';
moment().format();

export class Calendar extends Component {

	state = {
		startDate: moment(new Date()).startOf('day'),
		date: moment(new Date()).startOf('day')
	}

	moveForward = () => {
		let date = this.state.date;
		date.add(1, 'weeks');
		this.setState({date});
	}
	moveBackward = () => {
		let date = this.state.date;
		date.subtract(1, 'weeks');
		if (date < this.state.startDate) return;
		else this.setState({date});
	}

	render() {
		return (
			<div>
				<CalMenuBar 
					date={this.state.date} 
					moveForward={this.moveForward}
					moveBackward={this.moveBackward}
				/>
				<CalViewPort 
					setAppointment={this.props.setAppointment}
					date={this.state.date}
					style={CalendarStyles}
					availability={this.props.availability} 
					appointments={this.props.appointments} 
					user_appointment={this.props.user_appointment}
					possibleSelections={this.props.possibleSelections}
					serviceLength={this.props.serviceLength}
					clear={this.props.clear}
					resetClear={this.props.resetClear}
					cancelAppointment={this.props.cancelAppointment}
					requestClear={this.props.requestClear}
				/>
			</div>
		)
	}
}

const CalendarStyles = {

}

export default Calendar;