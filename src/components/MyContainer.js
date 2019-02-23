import React from 'react';
import { Container } from 'react-bootstrap';

function MyContainer(props) {
	return (
		<Container style={ContainerStyles}>
			{props.children}
		</Container>
	)
}

const ContainerStyles = {
	marginTop: "30px",
}

export default MyContainer;
