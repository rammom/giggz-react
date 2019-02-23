import React, { Component } from 'react';
import axios from 'axios';

import MyNavbar from '../components/MyNavbar';
import { Card, ListGroup, ListGroupItem, ProgressBar, Row, Col } from 'react-bootstrap';
import MyButton from '../components/MyButton';
import MyContainer from '../components/MyContainer';

let click_distance = 5;
let progress = `${(100 / 5) * (6 - click_distance)}`

export class StorePage extends Component {

	state = {
		stores: [],
	}

	async componentWillMount() {
		await axios.get('api/store/bunch')
			.then(res => {
				console.log(res);
				this.setState({stores: res.data.stores})
			})
			.catch(err => {
				console.log(err.response)
			})
	}

	gen_cards = () => {
		let cards = [];
		this.state.stores.forEach((store) => {
			cards.push(this.gen_card(store));
		});
		return cards;
	}

	gen_card = (store) => {

		let employees = [];
		store.employees.forEach(employee => {
			employees.push(
				<ListGroupItem key={employee._id}>{employee.user.firstname} {employee.user.lastname}</ListGroupItem>
			);
		})

		return (
			<Card style={{ width: '18rem' }}>
				{/* <Card.Img variant="top" src="#" /> */}

				<Card.Body>
					<Card.Title>{store.name}</Card.Title>
					<Card.Text>
						{store.description}
					</Card.Text>
				</Card.Body>

				<Card.Header>Employees</Card.Header>
				<ListGroup className="list-group-flush">
					{employees}
				</ListGroup>

				<Card.Body>
					<MyButton text="Book Your Gigg" onClick={() => { this.props.history.push(`/store/${store.slug}`, {store}) }} />
				</Card.Body>

			</Card>
		)
	}

	render() {
		return (
			<div>
				<MyNavbar color="#dd0000" absolute={false} history={this.props.history}/>
				<MyContainer>
					<Row>
						<Col sm={2}>
							<MyButton text="Go Back" size="sm" onClick={() => {this.props.history.goBack()}}/>
						</Col>
						<Col style={{margin: "auto"}}>
							<ProgressBar animated variant="danger" now={progress} label={`${click_distance} clicks away`} />
						</Col>
					</Row>
					<br/>
					<h1>Your next Gigg is just a couple more clicks away.</h1>
					<h5>Checkout some stores in your area.</h5>
					<hr/>
					{this.gen_cards(this.state.stores)}
				</MyContainer>
			</div>
		)
	}
}

export default StorePage;
