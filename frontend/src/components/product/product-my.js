import React, {useState,useEffect} from 'react'
import ProductForm from './product-form'
import {server} from '../../constant.js'
import { useLocation, useSearchParams, useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/button'
import SearchCard from '../search/search-card'
import { PaginationControl } from 'react-bootstrap-pagination-control'

export default function ProductMy(props){
	const [searchParams,setSearchParams] = useSearchParams()
	const [page,setPage] = useState(1)
	const [pageSize,setPageSize] = useState(5)
	const [count,setCount] = useState(0)
	const [products,setProducts] = useState([])
	const authorization = 'Bearer '+window.sessionStorage.getItem('accessToken')
	const refreshtoken = window.sessionStorage.getItem('refreshToken')
	const navigate = useNavigate()
	
	const getProducts = async (e,page,pageSize) => {
		if(window.sessionStorage.getItem('authority')!=='seller'){
			alert('권한이 없습니다.')
			navigate('/')
		}
		const url = new URL(server+`/product/my`)
		const params = new URLSearchParams()
		if(page) params.append('page',page)
		if(pageSize) params.append('pageSize',pageSize)
		url.search = params.toString()
		const res = await fetch(url,{headers:{'Content-Type' : 'application/json', authorization,refreshtoken}})
		if(res.status!==200){
			alert('권한이 없습니다.')
			navigate('/')
		}
		const [products_,count_] = await res.json()
		setPage(page)
		setPageSize(pageSize)
		setCount(count_)
		setProducts(products_)
		navigate('?'+params.toString())
	}
	
	useEffect(e => {
		const pageSize_ = searchParams.get('pageSize')
		if(pageSize_){
			if([5,10,20,50,100].indexOf(+pageSize_)===-1){
				alert('잘못된 접근입니다.')
				return navigate('/')
			}
			setPageSize(+pageSize_)
		}
		const page_ = searchParams.get('page')
		if(page_){
			if((isNaN(+page_) || !Number.isInteger(+page_) || +page_<1)){
				alert('잘못된 접근입니다.')
				return navigate('/')
			}
			setPage(+page_)
		}
		getProducts(e,page,pageSize)
	},[searchParams])
	
	return (
		<div style={{textAlign:'center'}}>
			<Button onClick={() => navigate('../create')}>상품 등록</Button>
			{products.map(product => <SearchCard key={product.id} product={product} edit={true} />)}
			<PaginationControl page={page} limit={pageSize} total={count} changePage = {page => {
				setPage(page)
				const url = new URL(window.location.href)
				url.searchParams.set('page',page)
				navigate('?'+url.searchParams.toString())
			}} />
		</div>
	)
}