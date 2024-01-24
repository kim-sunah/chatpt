import React, {useState,useEffect} from 'react'
import {server} from '../../constant'
import { useSearchParams, useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import InquiryCard from './inquiry-card'
import Card from 'react-bootstrap/Card'
import InquiryForm from './inquiry-form'

const style = {
	width: 700,
	textAlign: 'center',
	margin: '10px auto'
}

const statusList = ['접수 완료','답변 확인','처리 완료']

const InquiryDetail = props => {
	const [inquiry,setInquiry] = useState({})
	const [replies,setReplies] = useState([])
	const [searchParams, setSearchParams] = useSearchParams()
	const navigate = useNavigate()
	const id = +searchParams.get('id')
	if(isNaN(id) || !Number.isInteger(id) || id<1){
		alert('해당 문의가 존재하지 않습니다.')
		navigate('/')
	}
	
	const getInquiry = async () => {
		const res = await fetch(server+`/inquiry/${id}`)
		if(res.status!=200){
			alert('해당 문의가 존재하지 않습니다.')
			navigate('/')
		}
		const inquiry_ = await res.json()
		setInquiry(inquiry_)
	}
	
	const getReplies = async () => {
		const res = await fetch(server+`/inquiry/${id}/replies`)
		const replies_ = await res.json()
		setReplies(replies_.reverse())
	}
	
	const createReply = async (e,body) => {
		e.preventDefault()
		const authorization = 'Bearer '+window.sessionStorage.getItem('accessToken')
		const refreshtoken = window.sessionStorage.getItem('refreshToken')
		if(!window.sessionStorage.getItem('accessToken') || !refreshtoken) return alert('권한이 없습니다.')
		const res = await fetch(server+`/inquiry/${id}`,{method:'post',
		headers:{'Content-Type':'application/json', authorization, refreshtoken},
		body: JSON.stringify({body})})
		if(res.status!==201) return alert('권한이 없습니다.')
		const reply = await res.json()
		setReplies([reply,...replies])
	}
	
	useEffect(() => {
		getInquiry()
		getReplies()
	},[])
	
	return (
		<Card style={style}>
			<Card.Header>
				<p>{inquiry.body}</p>
				<p>작성시각: {(new Date(inquiry.createdAt)).toLocaleString()}</p>
				<p>상태: {statusList[inquiry.status]}</p>
			</Card.Header>
			<Card.Body>
				<InquiryForm reply={true} createInquiry={createReply} />
				{replies.map(reply => <InquiryCard key={reply.id} user_id={inquiry.user_id} inquiry={reply} /> )}
			</Card.Body>
		</Card>
	)
}

export default InquiryDetail