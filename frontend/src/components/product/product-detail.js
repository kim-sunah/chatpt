import React, {useState,useEffect} from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import {server} from '../../constant.js'
import Card from 'react-bootstrap/Card'
import Modal from 'react-bootstrap/Modal'
import InquiryForm from '../inquiry/inquiry-form'
import Button from 'react-bootstrap/Button'

const style = {
	margin: '10px auto',
	padding: '10px',
	width: 700
}

const thumbnailStyle = {
	borderRadius: 15,
	objectFit: 'cover',
	width: 360,
	height: 270,
	marginRight: 20
}

const imgStyle = {
	objectFit: 'cover',
	width: '100%',
	margin: '10px 0'
}

const decimal1 = (total,count) => {
	if(!count) return '0.0'
	const rating = total*10/count|0
	return `{rating/10|0}.{rating%10}`
}

export default function ProductCard(props){
	const [product,setProduct] = useState({})
	const [images,setImages] = useState([])
	const [searchParams, setSearchParams] = useSearchParams()
	const navigate = useNavigate()
	const id = +searchParams.get('id')
	if(isNaN(id) || !Number.isInteger(id) || id<1){
		alert('해당 상품이 존재하지 않습니다.')
		navigate('/')
	}
	
	const getProduct = async () => {
		const res = await fetch(server+`/product?id=${id}`)
		if(res.status!==200){
			alert('해당 상품이 존재하지 않습니다.')
			navigate('/')
		}
		const product_ = await res.json()
		setProduct(product_)
	}
	
	const getImages = async () => {
		const res = await fetch(server+`/product/${id}/image`)
		if(res.status!=200) return
		const images_ = await res.json()
		setImages(images_)
	}
	
	useEffect(() => {
		getProduct()
		getImages()
	},[])
	
	const [show,setShow] = useState(false)
	const handleShow = () => {
		const authorization = 'Bearer '+window.sessionStorage.getItem('accessToken')
		const refreshtoken = window.sessionStorage.getItem('refreshToken')
		if(!window.sessionStorage.getItem('accessToken') || !refreshtoken){
			alert('권한이 없습니다.')
			navigate('/')
		}
		setShow(true)
	}
	const handleClose = () => setShow(false)
	const createInquiry = async (e,body) => {
		e.preventDefault()
		const authorization = 'Bearer '+window.sessionStorage.getItem('accessToken')
		const refreshtoken = window.sessionStorage.getItem('refreshToken')
		const res = await fetch(server+'/inquiry',{method:'post',
			headers:{'Content-Type':'application/json', authorization, refreshtoken},
			body: JSON.stringify({body})})
		if(res.status!==201) return alert('오류가 발생했습니다. 다시 시도해주세요.')
		alert('문의가 등록되었습니다.')
		navigate('/')
	}
	
	return (
		<Card style={style}>
			<Card.Header style={{display:'flex'}}>
				<img style={thumbnailStyle} src={product.thumbnail || './tree.jpg'} />
				<div>
					<h1>{product.name}</h1>
					<h3>{product.price}원</h3>
					<h3>{product.sale_price}원</h3>
					<p>{product.body}</p>
					<p>{decimal1(product.rating_total,product.rating_count)} ({product.rating_count}) 판매량: {product.sales_volume}</p>
					<Button onClick={handleShow}>상품 문의</Button>
				</div>
			</Card.Header>
			<Card.Body>
				{images.map(image => <img key={image.id} style={imgStyle} src={image.original_url} />)}
			</Card.Body>
			<Modal show={show}>
				<Modal.Body>
					<InquiryForm createInquiry={createInquiry} />
					<Button className='mt-2' onClick={handleClose}>닫기</Button>
				</Modal.Body>
			</Modal>
		</Card>
	)
}