import React, {useState,useEffect} from 'react'
import Card from 'react-bootstrap/Card'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/button'

const style = {
	margin: '10px auto',
	padding: '5px',
	width: 600,
	border: '1px solid black',
	borderRadius: 15
}

const InquiryCard = props => {
	return (
		<Card style={style}>
			<Card.Body>{props.inquiry.body}</Card.Body>
		</Card>
	)
}

export default InquiryCard