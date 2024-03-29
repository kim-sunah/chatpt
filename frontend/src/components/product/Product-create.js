import React, {useState,useEffect} from 'react'
import ProductForm from './Product-form.js'
import {server} from '../../constant.js'
import { useNavigate } from 'react-router-dom'

const style = {
	width: 700,
	margin: '10px auto'
}

export default function ProductCreate(props){
	const navigate = useNavigate()
	// 인증
	const Authorization = 'Bearer '+window.sessionStorage.getItem('accessToken')
	const refreshtoken = window.sessionStorage.getItem('refreshToken')
	
	useEffect(() => {
		if(!window.sessionStorage.getItem('accessToken') || !refreshtoken || window.sessionStorage.getItem('authority') !=='Host'){
			alert('권한이 없습니다.')
			navigate('/')
		}
	}, [])

	const createProduct = async (e,body) => {
		e.preventDefault()
		const {thumbnail, images, shorts, ...body_} = body
		console.log(body_)
		const res = await fetch(server+'/product', {method:'post',
			headers:{'Content-Type':'application/json', Authorization, refreshtoken},
			body: JSON.stringify(body_)})
		if(res.status!==201){
			const {message} = await res.json()
			if(message[0]==='적') return alert(message)
			return alert('오류가 발생했습니다. 다시 시도해주세요.')
		}
		const id = (await res.json()).id
		if(thumbnail){
			const formData = new FormData()
			formData.append('image', thumbnail)
			const res_thumbnail = await fetch(server+`/product/${id}/thumbnail`, {method:'PATCH',
				headers:{Authorization, refreshtoken},
				body: formData})
		}
		if(images.length){
			await Promise.all(images.map(async image => {
				const formData = new FormData()
				formData.append('image', image)
				await fetch(server+`/product/${id}/image`, {method:'post',
					headers:{Authorization, refreshtoken},
					body: formData})
			}))
		}
		if(shorts){
			const formData = new FormData()
			formData.append('shorts', shorts)
			const res_shorts = await fetch(server+`/product/${id}/shorts`, {method:'PATCH',
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
