import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import './Calendar.css';


const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export class CalMenuBar extends Component {

	render() {
		return (
			<div style={MenuBarStyles}>
				<span style={TitleText}><b>{months[this.props.date.getMonth()]}</b> {this.props.date.getFullYear()}</span>
				<Row>
					<Col xs={1} className="noMargin"></Col>
					<Col className="noMargin textCenter">
						<span>{days[this.props.date.getDay() % 7]}</span>
					</Col>
					<Col className="noMargin textCenter">
						<span>{days[(this.props.date.getDay()+1)  % 7]}</span>
					</Col>
					<Col className="noMargin textCenter">
						<span>{days[(this.props.date.getDay()+2) % 7]}</span>
					</Col>
					<Col className="noMargin textCenter">
						<span>{days[(this.props.date.getDay()+3) % 7]}</span>
					</Col>
					<Col className="noMargin textCenter">
						<span>{days[(this.props.date.getDay()+4) % 7]}</span> 
					</Col>
					<Col className="noMargin textCenter">
						<span>{days[(this.props.date.getDay()+5) % 7]}</span>
					</Col>
					<Col className="noMargin textCenter">
						<span>{days[(this.props.date.getDay()+6) % 7]}</span>
					</Col>
					
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