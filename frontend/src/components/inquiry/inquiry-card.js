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

const statusList = ['접수 완료','답변 확인','처리 완료']

const InquiryCard = props => {
	return (
		<Card style={style}>
			<Card.Body>{props.user_id && props.user_id!=props.inquiry.user_id && '관리자: '}{props.inquiry.body}</Card.Body>
			<Card.Footer>
				<p>작성시각: {(new Date(props.inquiry.createdAt)).toLocaleString()}</p>
				{props.inquiry.status!==undefined && <p>상태: {statusList[props.inquiry.status]}</p>}
			</Card.Footer>
		</Card>
	)
}

export default InquiryCard