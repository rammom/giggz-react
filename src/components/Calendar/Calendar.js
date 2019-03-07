import React, { Component } from 'react';

import CalMenuBar from './CalMenuBar';
import CalViewPort from './CalViewPort';
import moment from 'moment';
moment().format();

export class Calendar extends Component {

	state = {
		startDate: moment(new Date()).startOf('day'),
	}

	render() {
		return (
			<div>
				<CalMenuBar 
					date={this.state.startDate} 
				/>
				<CalViewPort 
					setAppointment={this.props.setAppointment}
					date={this.state.startDate}
					style={CalendarStyles}
					availability={this.props.availability} 
					appointments={this.props.appointments} 
					user_appointment={this.props.user_appointment}
					possibleSelections={this.props.possibleSelections}
					serviceLength={this.props.serviceLength}
					clear={this.props.clear}
					resetClear={this.props.resetClear}
					cancelAppointment={this.props.cancelAppointment}
				/>
			</div>
		)
	}
}

const CalendarStyles = {

}

export default Calendar;