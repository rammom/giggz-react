import React, { Component } from 'react';

import CalMenuBar from './CalMenuBar';
import CalViewPort from './CalViewPort';

export class Calendar extends Component {

	state = {
		startDate: new Date(),
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
					possibleSelections={this.props.possibleSelections}
					serviceLength={this.props.serviceLength}
				/>
			</div>
		)
	}
}

const CalendarStyles = {

}

export default Calendar;