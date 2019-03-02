import React, { Component } from 'react';
import './Calendar.css';
import { Row } from 'react-bootstrap';

export class CalDayCol extends Component {

	state = {
		quartersTaken: new Set(),
		blocksAvailable: {},	
	}

	
	componentDidUpdate(previousProps) {
		console.log(JSON.stringify(this.props.appointments) !== JSON.stringify(previousProps.appointments))
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
					let ref = `${this.props.day}_${hour}_${quarter}`;
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
				console.log(this.state);
			});
			this.updateCalendar();
		}
	}

	updateCalendar = () => {
		let quarter = 1;
		let req_service_block_size = this.props.serviceLength / 15;
		let blocksAvailable = this.state.blocksAvailable;

		for (let i = this.props.startHour; i < this.props.endHour + 1;) {
			let next_ref = `${this.props.day}_${i}_${quarter}`;
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

				next_ref = `${this.props.day}_${i}_${quarter}`;
			}
			console.log(next_ref);
			next_ref_block = [];
			quarter += 1;

			if (quarter > 4) {
				quarter = 1;
				i++;
			}
		}

		this.setState({ blocksAvailable });
		console.log(this.state);

		for (let block in this.state.blocksAvailable) {
			this.state.blocksAvailable[block].forEach(ref => {
				document.getElementById(ref).classList.add("greenShade");
			});
		}
	}

	highlightBlock = (e) => {
		if (this.state.blocksAvailable[e.target.id]){
			this.state.blocksAvailable[e.target.id].forEach(block => {
				document.getElementById(block).classList.add("greenShadeHover");
			})
		}
	}
	unhighlightBlock = (e) => {
		if (this.state.blocksAvailable[e.target.id]) {
			this.state.blocksAvailable[e.target.id].forEach(block => {
				document.getElementById(block).classList.remove("greenShadeHover");
			})
		}
	}

	gen_time_slots = () => {
		let slots = [];
		let i = this.props.startHour;
		for (; i < this.props.endHour+1; ++i) {
			slots.push(
				<div key={i} className="noPadding topBorder hourSlot" id={i}>
					<Row className="noMargin quarterSlot" id={`${this.props.day}_${i}_1`} onMouseEnter={this.highlightBlock} onMouseLeave={this.unhighlightBlock}></Row>
					<Row className="noMargin quarterSlot" id={`${this.props.day}_${i}_2`} onMouseEnter={this.highlightBlock} onMouseLeave={this.unhighlightBlock}></Row>
					<Row className="noMargin quarterSlot" id={`${this.props.day}_${i}_3`} onMouseEnter={this.highlightBlock} onMouseLeave={this.unhighlightBlock}></Row>
					<Row className="noMargin quarterSlot" id={`${this.props.day}_${i}_4`} onMouseEnter={this.highlightBlock} onMouseLeave={this.unhighlightBlock}></Row>
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