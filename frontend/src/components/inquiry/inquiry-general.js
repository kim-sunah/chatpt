import React, {useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import InquiryForm from './Inquiry-form'
import {server} from '../../constant.js'

const style = {
	margin: '10px auto',
	padding: '15px',
	width: 1000
}

const InquiryGeneral = props => {
	const navigate = useNavigate()
	// 인증
	const authorization = 'Bearer '+window.sessionStorage.getItem('accessToken')
	const refreshtoken = window.sessionStorage.getItem('refreshToken')
	
	const createInquiry = async (e,body) => {
		e.preventDefault()
		const res = await fetch(server+'/inquiry',{method:'post',
			headers:{'Content-Type':'application/json', authorization, refreshtoken},
			body: JSON.stringify({body})})
		if(res.status!==201) return alert('오류가 발생했습니다. 다시 시도해주세요.')
		alert('문의가 등록되었습니다.')
		navigate('/')
	}
	
	useEffect(() => {
		if(!window.sessionStorage.getItem('accessToken') || !refreshtoken){
			alert('권한이 없습니다.')
			navigate('/')
		}
	}, [])
	
	return (
		<div style={style}>
			<h5>*상품 정보, 주문, 배송, 반품, 환불 등 상품 관련 문의는 상품 정보 페이지에서 신청 부탁드립니다.</h5>
			<InquiryForm createInquiry={createInquiry} />
		</div>
	)
}

export default InquiryGeneral