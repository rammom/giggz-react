import React, { Component } from 'react';
import './Calendar.css';

export class CalTimeSlots extends Component {

	gen_time_slots = () => {
		let slots = [];
		let i;
		for (i = this.props.startHour; i < this.props.endHour; ++i){
			slots.push(
				<div key={i} className="timeText topBorder hourSlot">{(i === 12) ? 'Noon' : `${(i<12) ? i+"am" : (i%12)+"pm"}`}</div>
			)
		}
		i = this.props.endHour;
		slots.push(
			<div key={i} className="timeText topBorder bottomBorder hourSlot">{(i === 12) ? 'Noon' : `${(i < 12) ? i + "am" : (i % 12) + "pm"}`}</div>
		)
		return slots;
	}

	render() {
		return (
			<div style={CalTimeSlotsStyles}>
				{this.gen_time_slots()}
			</div>
		)
	}
}

const CalTimeSlotsStyles = {
	backgroundColor: "#f7f7f7",
}

export default CalTimeSlots
