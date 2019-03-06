import React, { Component } from 'react';
import './Calendar.css';
import { Row } from 'react-bootstrap';

export class CalDayCol extends Component {

	state = {
		quartersTaken: new Set(),
		blocksAvailable: {},	
	}

	
	componentDidUpdate(previousProps) {
		if (JSON.stringify(this.props.appointments) !== JSON.stringify(previousProps.appointments)) {
			let appointments = [...this.props.appointments];
			this.setState({ appointments });
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
				let quartersTaken = this.state.quartersTaken;
				while (length > 0){
					let ref = `${this.props.date.day()}_${hour}_${quarter}`;
					if (!document.getElementById(ref)) break;
					document.getElementById(ref).classList.add("redShade");
					quartersTaken.add(ref);
					length -= 15;
					quarter = (quarter%4)+1;
					minute += 15;
					if (minute >= 60){
						minute = 0;
						hour += 1;
					}
					if (hour === 24) {
						hour = 0;
					}
				}
				this.setState({quartersTaken});
			});
			this.updateCalendar();
		}

		if (this.props.serviceLength !== previousProps.serviceLength) 
			this.updateCalendar();
	}

	updateCalendar = () => {
		let quarter = 1;
		let req_service_block_size = this.props.serviceLength / 15;
		let blocksAvailable = {};

		for (let i = this.props.startHour; i < this.props.endHour + 1;) {
			let next_ref = `${this.props.date.day()}_${i}_${quarter}`;
			let next_ref_block = [];
			while (!this.state.quartersTaken.has(next_ref) && i < this.props.endHour + 1) {
				next_ref_block.push(next_ref);
				if (next_ref_block.length === req_service_block_size) {
					blocksAvailable[next_ref_block[0]] = [...next_ref_block];
					next_ref_block.shift();
				}

				quarter++;
				if (quarter > 4) {
					quarter = 1;
					i++;
				}

				next_ref = `${this.props.date.day()}_${i}_${quarter}`;
			}
			next_ref_block = [];
			quarter += 1;

			if (quarter > 4) {
				quarter = 1;
				i++;
			}
		}

		this.setState({ blocksAvailable });

		for (let block in this.state.blocksAvailable) {
			this.state.blocksAvailable[block].forEach(ref => {
				document.getElementById(ref).classList.add("greenShade");
			});
		}
	}

	highlightBlock = (e) => {
		if (this.state.blocksAvailable[e.target.id]){
			// let hour = e.target.id.split('_')[1];
			// let ampm = (hour < 12) ? "am" : "pm";
			// if (hour > 12) hour = hour%12;
			// if (hour === 0) hour = 12;
			// let quarter = e.target.id.split('_')[2];
			// let minute = (15*(parseInt(quarter)-1));
			// if (minute === 0) minute = "00";
			// let time = `${hour}:${minute} ${ampm}`;
			//document.getElementById(e.target.id).innerHTML = `<span>${time}</span>`;
			this.state.blocksAvailable[e.target.id].forEach(block => {
				document.getElementById(block).classList.add("greenShadeHover");
			})
		}
	}
	unhighlightBlock = (e) => {
		if (this.state.blocksAvailable[e.target.id]) {
			//document.getElementById(e.target.id).innerHTML = "";
			this.state.blocksAvailable[e.target.id].forEach(block => {
				document.getElementById(block).classList.remove("greenShadeHover");
			})
		}
	}

	handleClick = (e) => {
		if (!e.target.id) return;
		let hour = parseInt(e.target.id.split('_')[1]);
		let quarter = e.target.id.split('_')[2];
		let minute = (15 * (parseInt(quarter) - 1));
		let appointment = {
			date: this.props.date,
			hour: hour,
			minute: minute,
		}
		this.props.setAppointment(appointment);
	}

	gen_time_slots = () => {
		let slots = [];
		let i = this.props.startHour;
		for (; i < this.props.endHour+1; ++i) {
			slots.push(
				<div key={i} className="noPadding topBorder hourSlot" id={i}>
					<Row className="noMargin quarterSlot" id={`${this.props.date.day()}_${i}_1`} onMouseEnter={this.highlightBlock} onMouseLeave={this.unhighlightBlock} onClick={this.handleClick}></Row>
					<Row className="noMargin quarterSlot" id={`${this.props.date.day()}_${i}_2`} onMouseEnter={this.highlightBlock} onMouseLeave={this.unhighlightBlock} onClick={this.handleClick}></Row>
					<Row className="noMargin quarterSlot" id={`${this.props.date.day()}_${i}_3`} onMouseEnter={this.highlightBlock} onMouseLeave={this.unhighlightBlock} onClick={this.handleClick}></Row>
					<Row className="noMargin quarterSlot" id={`${this.props.date.day()}_${i}_4`} onMouseEnter={this.highlightBlock} onMouseLeave={this.unhighlightBlock} onClick={this.handleClick}></Row>
				</div>
			)
		}
		
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