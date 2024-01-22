import React, {useState,useEffect} from 'react'
import ProductForm from './product-form'
import {server} from '../../constant.js'
import { useNavigate } from 'react-router-dom'

const style = {
	width: 700,
	margin: '10px auto'
}

export default function ProductCreate(props){
	const navigate = useNavigate()
	// 인증 추가
	const [Authorization,setAuthorization] = useState('Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzA1NzYyOTkxLCJleHAiOjE3MDU3NjMxMTF9.0q5KuDZSPh2TAn5-ofLTZDNFrX5eSTuC8HzwyEvvFfw')
	const [refreshtoken,setRefreshtoken] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDU3NjI5OTEsImV4cCI6MTcwNjM2Nzc5MX0.8GaubrgbLn1wUHoQrLLyWlGd7FqETkZnz6_7-QpwTBE')
	
	const createProduct = async (e,body) => {
		e.preventDefault()
		const {thumbnail, ...body_} = body
		const res = await fetch(server+'/product', {method:'post',
		headers:{'Content-Type':'application/json', Authorization, refreshtoken},
		body: JSON.stringify(body_)})
		if(res.status!==201) return alert('오류가 발생했습니다. 다시 시도해주세요.')
		const id = (await res.json()).id
		if(body.thumbnail){
			const formData = new FormData()
			formData.append('image', thumbnail)
			const res_thumbnail = await fetch(server+`/product/${id}/thumbnail`, {method:'PATCH',
			headers:{Authorization, refreshtoken},
			body: formData})
		}
		alert('상품 등록이 완료되었습니다.')
		navigate('/')
	}
	
	return (
		<div style={style}>
			<ProductForm onSubmit={createProduct} />
		</div>
	)
}