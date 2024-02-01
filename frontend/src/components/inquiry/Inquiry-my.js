import InquiryCard from './Inquiry-card'
import React, {useState,useEffect} from 'react'
import {server} from '../../constant'
import { useNavigate } from 'react-router-dom'

const style = {
	width: 700,
	textAlign: 'center',
	margin: '10px auto'
}

const InquiryMy = props => {
	const navigate = useNavigate()
	const [inquiries,setInquiries] = useState([])
	// 인증
	const authorization = 'Bearer '+window.sessionStorage.getItem('accessToken')
	const refreshtoken = window.sessionStorage.getItem('refreshToken')
	
	const getInquiries = async () => {
		const res = await fetch(server+'/inquiry/my',{headers:{'Content-Type' : 'application/json', authorization,refreshtoken}})
		const inquiries_ = await res.json()
		console.log(inquiries)
		setInquiries(inquiries_)
	}
	
	useEffect(() => {
		if(!window.sessionStorage.getItem('accessToken') || !refreshtoken){
			alert('권한이 없습니다.')
			navigate('/')
		}
		getInquiries()
	},[])
	
	return (
		<div style={style}>
			{inquiries.map(inquiry => <InquiryCard key={inquiry.id} inquiry={inquiry} onClick={e => navigate(`../detail?id=${inquiry.id}`)} /> )}
		</div>
	)
}

export default InquiryMy
