import React, { Component } from 'react';
import { Card, ListGroup, ListGroupItem, Row, Col, ProgressBar } from 'react-bootstrap';

import MyNavbar from '../components/MyNavbar';
import MyButton from '../components/MyButton';
import MyContainer from '../components/MyContainer';
import axios from 'axios';

let click_distance = 4;
let progress = `${(100/5)*(6-click_distance)}`

export class StorePage extends Component {

	state = {
		store: {}
	}

	async componentWillMount() {
		await axios.get(`/api/store/${this.props.match.params.slug}`)
			.then(res => {
				console.log(res.data);
				this.setState({store: res.data.store});
			})
			.catch(err => {
				console.log(err.response);
			})
	}

	gen_card = (employee) => {

		let services = [];
		employee.services.forEach(service => {
			services.push(
				<ListGroupItem key={service._id}>{service.name}</ListGroupItem>
			);
		})
		if (services.length === 0)
			services.push(<ListGroupItem key="1">N/A</ListGroupItem>)

		return (
			<Card style={{ width: '18rem' }}>
				{/* <Card.Img variant="top" src="#" /> */}

				<Card.Body>
					<Card.Title>{employee.user.firstname} {employee.user.lastname}</Card.Title>
				</Card.Body>

				<Card.Header>Services offered</Card.Header>
				<ListGroup className="list-group-flush">
					{services}
				</ListGroup>

				<Card.Body>
					<MyButton text="Select" />
				</Card.Body>

			</Card>
		);
	}

	gen_employee_cards = () => {
		let cards = [];
		if (!this.state.store || !this.state.store.employees) return null;
		this.state.store.employees.forEach((employee) => {
			cards.push(this.gen_card(employee));
		});
		return cards;
	}

	render() {
		return (
			<div>
				<MyNavbar color="#dd0000" history={this.props.history}/>
				<MyContainer>
					<Row>
						<Col sm={2}>
							<MyButton text="Go Back" size="sm" onClick={() => { this.props.history.goBack() }} />
						</Col>
						<Col style={{ margin: "auto" }}>
							<ProgressBar animated variant="danger" now={progress} label={`${click_distance} clicks away`} />
						</Col>
					</Row>
					<br/>
					<h1>Treat Yourself With The Very Best.</h1>
					<h5>Choose from a selection of <b style={{color: "#dd0000"}}>{this.state.store.name}</b>'s professional employees.</h5>
					<hr/>
					{this.gen_employee_cards()}
				</MyContainer>
			</div>
		)
	}
}

export default StorePage;
