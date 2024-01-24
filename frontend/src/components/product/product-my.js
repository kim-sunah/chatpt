import React, {useState,useEffect} from 'react'
import ProductForm from './product-form'
import {server} from '../../constant.js'
import { useSearchParams, useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/button'
import SearchCard from '../search/search-card'

const ProductMy = props => {
	const [products,setProducts] = useState([])
	const authorization = 'Bearer '+window.sessionStorage.getItem('accessToken')
	const refreshtoken = window.sessionStorage.getItem('refreshToken')
	const navigate = useNavigate()
	
	const getProducts = async () => {
		if(window.sessionStorage.getItem('authority')!=='seller'){
			alert('권한이 없습니다.')
			navigate('/')
		}
		const res = await fetch(server+`/product/my`,{headers:{'Content-Type' : 'application/json', authorization,refreshtoken}})
		if(res.status!==200){
			alert('권한이 없습니다.')
			navigate('/')
		}
		const products_ = await res.json()
		setProducts(products_)
	}
	
	useEffect(() => {
		getProducts()
	},[])
	
	return (
		<div style={{textAlign:'center'}}>
			<Button onClick={() => navigate('../create')}>상품 등록</Button>
			{products.map(product => <SearchCard key={product.id} product={product} edit={true} />)}
		</div>
	)
}

export default ProductMy