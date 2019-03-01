import React, { Component } from 'react';
import './Calendar.css';
import { Row } from 'react-bootstrap';

export class CalDayCol extends Component {

	componentDidUpdate() {
		if (this.props.appointments){
			this.props.appointments.forEach(appt => {
				let date = new Date(appt.datetime);
				let hour = date.getHours();
				let minute = date.getMinutes();
				let quarter;
				if (minute < 15) quarter = 1;
				else if (minute < 30) quarter = 2;
				else if (minute < 45) quarter = 3;
				else quarter = 4;
				let length = appt.length;
				while (length > 0){
					let ref = `${hour}_${quarter}`;
					if (!document.getElementById(ref)) break;
					document.getElementById(ref).classList.add("greyed");
					length -= 15;
					quarter = (quarter%4)+1;
					minute += 15;
					if (minute >= 60){
						minute = 0;
						hour += 1
					}
					if (hour === 24) {
						hour = 0;
					}
				}
			});
		}
	}

	gen_time_slots = () => {
		let slots = [];
		let i = this.props.startHour;
		for (; i < this.props.endHour; ++i) {
			slots.push(
				<div key={i} className="noPadding topBorder hourSlot" id={i}>
					<Row className="noMargin quarterSlot" id={`${i}_1`}></Row>
					<Row className="noMargin quarterSlot" id={`${i}_2`}></Row>
					<Row className="noMargin quarterSlot" id={`${i}_3`}></Row>
					<Row className="noMargin quarterSlot" id={`${i}_4`}></Row>
				</div>
			)
		}
		i = this.props.endHour;
		slots.push(
			<div key={i} className="noPadding topBorder bottomBorder hourSlot" id={i}>
				<Row className="noMargin quarterSlot" id={`${i}_1`}></Row>
				<Row className="noMargin quarterSlot" id={`${i}_2`}></Row>
				<Row className="noMargin quarterSlot" id={`${i}_3`}></Row>
				<Row className="noMargin quarterSlot" id={`${i}_4`}></Row>
			</div>
		)
		return slots;
	}

	render() {
		return (
			<div style={DayColStyles}>
				{this.gen_time_slots()}
			</div>
		)
	}
}

const DayColStyles = {
	borderLeft: "1px solid #000000aa"
}

export default CalDayCol;