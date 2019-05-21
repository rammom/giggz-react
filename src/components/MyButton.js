import React from 'react';
import { Button } from 'react-bootstrap';
import './MyButton.css';

function MyButton({text, style, Variant, ...props}) {
	return (
		<Button {...props} variant="dark" style={{...style}} className={`${Variant ? `${Variant}-button` : ""} ud-button`}>
			{text}
		</Button>
	)
}

export default MyButton;