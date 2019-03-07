import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import './Calendar.css';
import utils from '../../utils';

let months = utils.months;
let days = utils.weekdays_upper_short;

export class CalMenuBar extends Component {



	render() {
		return (
			<div style={MenuBarStyles}>
				<span style={TitleText}><b>{months[this.props.date.month()]}</b> {this.props.date.year()}</span>
				<Row>
					<Col xs={1} className="noMargin"></Col>
					<Col className="noMargin textCenter">
						<span>{days[this.props.date.day()]} &nbsp; {this.props.date.date()}</span>
					</Col>
					<Col className="noMargin textCenter">
						<span>{days[this.props.date.add(1, 'days').day()]} &nbsp; {this.props.date.date()}</span>
					</Col>
					<Col className="noMargin textCenter">
						<span>{days[this.props.date.add(1, 'days').day()]} &nbsp; {this.props.date.date()}</span>
					</Col>
					<Col className="noMargin textCenter">
						<span>{days[this.props.date.add(1, 'days').day()]} &nbsp; {this.props.date.date()}</span>
					</Col>
					<Col className="noMargin textCenter">
						<span>{days[this.props.date.add(1, 'days').day()]} &nbsp; {this.props.date.date()}</span> 
					</Col>
					<Col className="noMargin textCenter">
						<span>{days[this.props.date.add(1, 'days').day()]} &nbsp; {this.props.date.date()}</span>
					</Col>
					<Col className="noMargin textCenter">
						<span>{days[this.props.date.add(1, 'days').day()]} &nbsp; {this.props.date.date()}</span>
					</Col>
					<span style={{visibility: "hidden"}}>{this.props.date.subtract(6, 'days').day()}</span>
				</Row>
			</div>
		)
	}
}

const MenuBarStyles = {
	width: "100%",
	border: "2px solid black",
	borderBottom: "1px solid black",
	borderTopLeftRadius: "15px",
	borderTopRightRadius: "15px",
	backgroundColor: "#f7f7f7",
	padding: "0.5em",
	margin: "auto",
	overflow: "hidden"
}

const TitleText = {
	//fontSize: "150%",
}

export default CalMenuBar;