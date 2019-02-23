import React, { Component } from 'react';
import { Row, Jumbotron } from 'react-bootstrap';

import MyButton from '../components/MyButton';
import MyNavbar from '../components/MyNavbar';

export class LandingPage extends Component {
	render() {
		return (
			<div>
				<MyNavbar absolute={true} history={this.props.history}/>
				<div style={OverlayStyle}></div>

				<Row style={PageOneStyles}>
					<Jumbotron style={JumbotronStyles}>
						<h1>Find your Gigg.</h1>
						<p>
							Giggz is an easy to use, multiplatform application that finds the best services near you. <br/> 
							Need a haircut? No problem, we've got a Gigg for you! 
						</p>
						<p>
							<MyButton variant="dark" text="Start Looking" onClick={() => {this.props.history.push('/stores')}}/>
						</p>
					</Jumbotron>
				</Row>
			</div>
		)
	}
}

const images = [
	"https://qtxasset.com/files/americansalon/field/image/bb-1215-Role-DSC0643-rev_C2101_R75530.jpg?qkpAjMRo6y7SlEBjkhVFsmz.mJurMhyo",
	"https://static.thatsup.co/content/img/place/m/a/man-stockholm-barbershop-3.jpg",
	"https://downtownlincoln.org/_files/images/roots1.jpeg"
]



const OverlayStyle = {
	width: "100vw",
	height: "100vh",
	backgroundColor: "#00000077",
	position: "absolute",
}

const PageOneStyles = {
	height: "100vh",
	width: "100vw",
	margin: "0",
	border: "2px solid black",
	backgroundImage: "url(" + images[Math.floor(Math.random() * images.length)]+")",
	backgroundRepeat: "no-repeat",
	backgroundSize: "cover",
	backgroundPosition: "center",
	zIndex: "1"
}

const JumbotronStyles = {
	backgroundColor: "#00000000",
	color: "white",
	margin: "auto",
	textAlign: "center",
	width: "60%",
	zIndex: "5"
}

export default LandingPage;
