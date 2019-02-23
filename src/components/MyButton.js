import React from 'react';
import { Button } from 'react-bootstrap';

function MyButton({text, ...props}) {
	return (
		<Button {...props} style={ButtonStyles}>
			{text}
		</Button>
	)
}

const ButtonStyles = {
	backgroundColor: "#dd0000",
	borderColor: "#dd0000"
}

export default MyButton;