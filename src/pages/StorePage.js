import React, { Component } from 'react';
import { Card, CardDeck, ListGroup, ListGroupItem, Row, Col, ProgressBar } from 'react-bootstrap';

import MyNavbar from '../components/MyNavbar';
import MyButton from '../components/MyButton';
import MyContainer from '../components/MyContainer';
import GoogleMap from '../components/GoogleMap';
import axios from 'axios';




let click_distance = 4;
let progress = `${(100/5)*(6-click_distance)}`

export class StorePage extends Component {

	state = {
		store: {
			name: '',
			address: {
				street: '',
				city: '',
				state: '',
				country: '',
			}
		}
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
			console.log(service)
			services.push(
				<ListGroupItem key={service._id}><span>{service.name}</span><span style={{float: "right"}}>${service.price}</span></ListGroupItem>
			);
		})
		if (services.length === 0)
			services.push(<ListGroupItem key="1">N/A</ListGroupItem>)

		return (
			<Card style={{ width: '18rem' }} key={employee._id}>
				<Card.Img variant="top" src={employee.user.image} />

				<Card.Body style={{padding: "0"}}>
					<Card.Title style={{textAlign: "center", paddingTop: "1em"}}>{employee.user.firstname} {employee.user.lastname}</Card.Title>
					<Card.Header>Services offered</Card.Header>
					<ListGroup className="list-group-flush">
						{services}
					</ListGroup>
				</Card.Body>

				

				<MyButton text="Select" onClick={() => {this.props.history.push(`/store/${this.props.match.params.slug}/${employee._id}`)}} />

			</Card>
		);
	}

	gen_card_deck = (cards) => {
		return (
			<CardDeck style={{ marginBottom: "1em" }}>
				{cards}
			</CardDeck>
		)
	}

	gen_employee_cards = () => {
		let cards = [];
		if (!this.state.store || !this.state.store.employees) return null;
		let cardDecks = [];
		for (let i = 0; i < this.state.store.employees.length; i += 3) {
			cards.push(this.gen_card(this.state.store.employees[i]));
			if (i + 1 < this.state.store.employees.length) cards.push(this.gen_card(this.state.store.employees[i + 1]));
			if (i + 2 < this.state.store.employees.length) cards.push(this.gen_card(this.state.store.employees[i + 2]));
			cardDecks.push(this.gen_card_deck(cards));
			cards = []
		}
		return cardDecks;
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
					<h5>Choose from a selection of <b style={{color: "#dd0000"}}>{this.state.store.name}</b>'s professional employees and services.</h5>
					<div>
						<GoogleMap 
							address={this.state.store.address}
							zoom={12}
						/>
					</div>
					<hr/>
					<CardDeck>
						{this.gen_employee_cards()}
					</CardDeck>
					<br/>
					
				</MyContainer>
			</div>
		)
	}
}

export default StorePage;
