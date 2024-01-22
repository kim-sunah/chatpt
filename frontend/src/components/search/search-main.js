import React, {useState,useEffect} from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import SearchForm from './search-form'
import SearchCard from './search-card'
import {server} from '../../constant.js'

const style = {
	width: 700,
	textAlign: 'center',
	margin: '10px auto'
}

export default function SearchMain(props){
	const [products,setProducts] = useState([])
	const [searchParams, setSearchParams] = useSearchParams()
	const navigate = useNavigate()
	
	const search = async (e,key,antiKey,categories,minSalePrice,maxSalePrice,page,pageSize) => {
		e?.preventDefault()
		const url = new URL(server+'/product/search')
		const params = new URLSearchParams()
		params.append('key',key)
		if(antiKey) params.append('antiKey',antiKey)
		if(categories) params.append('categories',categories)
		if(minSalePrice) params.append('minSalePrice',minSalePrice)
		if(maxSalePrice) params.append('maxSalePrice',maxSalePrice)
		if(page) params.append('page',page)
		if(pageSize) params.append('pageSize',pageSize)
		console.log(key,antiKey,categories,minSalePrice,maxSalePrice,page,pageSize,params.toString())
		url.search = params.toString()
		const res = await fetch(url)
		const products_ = await res.json()
		setProducts(products_)
		navigate('?'+params.toString())
	}	
	
	/* const sortProducts = (e) => {
		if(e.target.value==='highSalePrice'){
			const sortedProducts = [...products].sort((a, b) => b.sale_price - a.sale_price);
			setProducts(sortedProducts)
		}
		else if(e.target.value==='lowSalePrice'){
			const sortedProducts = [...products].sort((a, b) => a.sale_price - b.sale_price);
			setProducts(sortedProducts)
		}
	} */
	
	useEffect(e => {
		const key = searchParams.get('key')
		const antiKey = searchParams.get('antiKey')
		const pageSize = +searchParams.get('pageSize')
		if(searchParams.get('pageSize') & [5,10,20,50,100].indexOf(pageSize)===-1){
			alert('잘못된 접근입니다.')
			return navigate('/')
		}
		const page = +searchParams.get('page')
		if(searchParams.get('page') && (isNaN(page) || !Number.isInteger(page) || page<1)){
			alert('잘못된 접근입니다.')
			return navigate('/')
		}
		const categories = +searchParams.get('categories')
		if(searchParams.get('categories') && (isNaN(categories) || !Number.isInteger(categories) || categories<1 || categories>1023)){
			alert('잘못된 접근입니다.')
			return navigate('/')
		}
		const minSalePrice = +searchParams.get('minSalePrice')
		if(searchParams.get('minSalePrice') && (isNaN(minSalePrice) || !Number.isInteger(minSalePrice) || minSalePrice<1)){
			alert('잘못된 접근입니다.')
			return navigate('/')
		}
		const maxSalePrice = +searchParams.get('maxSalePrice')
		if(searchParams.get('maxSalePrice') && (isNaN(maxSalePrice) || !Number.isInteger(maxSalePrice) || maxSalePrice<1)){
			alert('잘못된 접근입니다.')
			return navigate('/')
		}
		if(minSalePrice>maxSalePrice){
			alert('잘못된 접근입니다.')
			return navigate('/')
		}
		if(key) search(e,key,antiKey,categories,minSalePrice,maxSalePrice,page,pageSize)
	}, [])
	
	return (
		<div style={style}>
			{/*<SearchForm search={search} sortProducts={sortProducts} />*/}
			<SearchForm search={search} />
			<div>
				{products.map(product => <SearchCard key={product.id} product={product} />)}
			</div>
		</div>
	)
}