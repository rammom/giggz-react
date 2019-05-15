import React, { Component } from 'react';

import MyNavbar from '../components/MyNavbar';
import { Card, CardDeck, ListGroup, ListGroupItem } from 'react-bootstrap';
import MyButton from '../components/MyButton';
import MyContainer from '../components/MyContainer';
//import LocationSearchInput from '../components/LocationSearchInput';




export class StorePage extends Component {

	state = {
		stores: [],
		user_location: null
	}




// 	processStores = (stores) => {
// 		this.setState({stores});
//   }
	async componentWillMount() {
		await axios.get('api/store/bunch')
			.then(res => {
				console.log(res);
				this.setState({stores: res.data.stores})
			})
			.catch(err => {
				console.log(err)
			})
	}

	gen_card_deck = (cards) => {
		return (
			<CardDeck style={{marginBottom: "1em"}}>
				{cards}
			</CardDeck>
		)
	}

	gen_cards = () => {
		let cards = [];
		let cardDecks = [];
		for (let i = 0; i < this.state.stores.length; i+=3){
			cards.push(this.gen_card(this.state.stores[i]));
			if (i+1 < this.state.stores.length) cards.push(this.gen_card(this.state.stores[i+1]));
			if (i+2 < this.state.stores.length) cards.push(this.gen_card(this.state.stores[i+2]));
			cardDecks.push(this.gen_card_deck(cards));
			cards = []
		}
		return cardDecks;
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

				<Card.Body style={{padding: "0"}}>
					<div style={{padding: "1em"}}>
						<Card.Title style={{ textAlign: "center", paddingTop: "1em", height: "6em", overflow: 'scroll' }}><h3>{store.name}</h3></Card.Title>
						
						<Card.Text style={{height: "10em", overflow: 'scroll'}}>
							{store.distance != null ? "Distance: " + store.distance +"km": ''}
							<br/>
							{store.description}
						</Card.Text>
					</div>
					<Card.Header>Employees</Card.Header>
					<ListGroup className="list-group-flush">
						{employees}
					</ListGroup>
				</Card.Body>


				
				<MyButton text="Book Your Gigg" onClick={() => { this.props.history.push(`/store/${store.slug}`, {store}) }} />

			</Card>
		)
	}

	

	render() {
		return (
			<div>
				
				<MyNavbar color="#dd0000" absolute={false} history={this.props.history}/>
				<MyContainer>
					{/* <Row>
						<Col sm={2}>
							<MyButton text="Go Back" size="sm" onClick={() => {this.props.history.goBack()}}/>
						</Col>
					</Row>
					<br/> */}
					<h1>Your next Gigg is just a couple more clicks away.</h1>
					<br />
					{/* <div>
						<LocationSearchInput processStores={this.processStores}/>
					</div> */}
					
					<hr/>
					<CardDeck>
						{this.gen_cards(this.state.stores)}
					</CardDeck>
				</MyContainer>
			</div>
		)
	}
}

export default StorePage;
