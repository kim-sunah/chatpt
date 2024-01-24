import React, {useState,useEffect} from 'react'
import ProductForm from './product-form'
import {server} from '../../constant.js'
import { useSearchParams, useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/button'

const style = {
	width: 700,
	margin: '10px auto'
}

const ProductUpdate = props => {
	const [product,setProduct] = useState({})
	const [images,setImages] = useState([])
	const [searchParams, setSearchParams] = useSearchParams()
	const navigate = useNavigate()
	const id = +searchParams.get('id')
	if(isNaN(id) || !Number.isInteger(id) || id<1){
		alert('해당 상품이 존재하지 않습니다.')
		navigate('/')
	}
	// 인증
	const Authorization = 'Bearer '+window.sessionStorage.getItem('accessToken')
	const refreshtoken = window.sessionStorage.getItem('refreshToken')
	
	const getProduct = async () => {
		const res = await fetch(server+`/product?id=${id}`)
		if(res.status!==200){
			alert('해당 상품이 존재하지 않습니다.')
			navigate('/')
		}
		const product_ = await res.json()
		setProduct(product_)
		console.log(product_)
	}
	
	const getImages = async () => {
		const res = await fetch(server+`/product/${id}/image`)
		if(res.status!=200) return
		const images_ = await res.json()
		setImages(images_)
	}
	
	useEffect(() => {
		if(!window.sessionStorage.getItem('accessToken') || !refreshtoken || window.sessionStorage.getItem('authority')!=='seller'){
			alert('권한이 없습니다.')
			navigate('/')
		}
		getProduct()
		getImages()
	},[])
	
	const updateProduct = async (e,body) => {
		e.preventDefault()
		const {thumbnail, image, ...body_} = body
		const res = await fetch(server+`/product/${id}`, {method:'PATCH',
		headers:{'Content-Type':'application/json', Authorization, refreshtoken},
		body: JSON.stringify(body_)})
		if(res.status!==200) return alert('오류가 발생했습니다. 다시 시도해주세요.')
		if(body.thumbnail){
			const formData = new FormData()
			formData.append('image', thumbnail)
			const res_thumbnail = await fetch(server+`/product/${id}/thumbnail`, {method:'PATCH',
			headers:{Authorization, refreshtoken},
			body: formData})
		}
		alert('상품 수정이 완료되었습니다.')
		navigate('/')
	}
	
	const deleteProduct = async e => {
		e.preventDefault()
		try{
			const res = await fetch(server+`/product/${id}`, {method:'delete',
			headers:{'Content-Type':'application/json', Authorization, refreshtoken}})
			if(res.status===200){
				alert('상품 삭제가 완료되었습니다.')
				navigate('/')
			}
		}catch(e){
			alert('오류가 발생했습니다. 다시 시도해주세요.')
		}
	}
	
	const uploadImage = async (e,image_) => {
		const formData = new FormData()
		formData.append('image', image_)
		const res = await fetch(server+`/product/${id}/image`, {method:'post',
		headers:{Authorization, refreshtoken},
		body: formData})
		const image__ = await res.json()
		setImages([...images,image__])
	}
	
	const deleteImage = async e => {
		if(window.confirm('이미지를 삭제하시겠습니까?')){
			try{
				const image_id = +e.target.dataset.imageId
				const res = await fetch(server+`/product/image/${image_id}`,{method:'delete',
				headers:{'Content-Type':'application/json', Authorization, refreshtoken}})
				alert(res.status)
				if(res.status===200){
					const updatedImages = images.filter(image => image.id !== image_id)
					setImages(updatedImages)
					return alert('이미지 삭제가 완료되었습니다.')
				}
			}catch(e){
				alert('오류가 발생했습니다. 다시 시도해주세요.')
			}
		}
	}
	
	return (
		<div style={style}>
			<ProductForm onSubmit={updateProduct} deleteProduct={deleteProduct} product={product} images={images} uploadImage={uploadImage} deleteImage={deleteImage} tag='상품 수정' />
		</div>
	)
}

export default ProductUpdate