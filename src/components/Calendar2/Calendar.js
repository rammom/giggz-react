import React, { Component } from 'react';
import WeekView from './WeekView';
import dateFns from 'date-fns';

class Calendar extends Component {

	state = {
		currentMonth: new Date(),
	}

	movePrevWeek = () => {
		this.setState({ currentMonth: dateFns.subWeeks(this.state.currentMonth, 1) });
	}
	moveNextWeek = () => {
		this.setState({ currentMonth: dateFns.addWeeks(this.state.currentMonth, 1) });
	}

	render() {
		return (
			<div className="calendar-wrapper">
				<WeekView 
					currentMonth={this.state.currentMonth}
					movePrevWeek={this.movePrevWeek}
					moveNextWeek={this.moveNextWeek}
					interval={15}
					availability={this.props.availability}
					appointments={this.props.appointments}
					serviceLength={this.props.serviceLength}
					setAppointment={this.props.setAppointment}
				/>
			</div>
		)
  	}
}

export default Calendar;