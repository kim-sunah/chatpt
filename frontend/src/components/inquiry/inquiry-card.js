import React, {useState,useEffect} from 'react'
import Card from 'react-bootstrap/Card'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

const style = {
	margin: '10px auto',
	padding: '5px',
	width: 600,
	border: '1px solid black',
	borderRadius: 15
}

const statusList = ['접수 완료','답변 확인','처리 완료']
const role = {'User':'작성자: ','Host':'트레이너: ','Admin':'관리자: '}

const InquiryCard = props => {
	return (
		<Card onClick={props.onClick} style={style}>
			<Card.Body>{role[props.inquiry.role]}{props.inquiry.body}</Card.Body>
			<Card.Footer>
				<p>작성시각: {(new Date(props.inquiry.createdAt)).toLocaleString()}</p>
				{props.inquiry.status!==undefined && <p>상태: {statusList[props.inquiry.status]}</p>}
			</Card.Footer>
		</Card>
	)
}

export default InquiryCard