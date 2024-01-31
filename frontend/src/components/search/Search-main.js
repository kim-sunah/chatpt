import React, {useState,useEffect} from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import SearchForm from './Search-form.js'
import SearchCard from './Search-card.js'
import {server} from '../../constant.js'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { PaginationControl } from 'react-bootstrap-pagination-control'

const style = {
	width: 700,
	textAlign: 'center',
	margin: '10px auto'
}

export default function SearchMain(props){
	const [searchParams,setSearchParams] = useSearchParams()
	const key = searchParams.get('key') || ''
	const antiKey = searchParams.get('antiKey') || ''
	const page = +searchParams.get('page') || 1
	const pageSize = +searchParams.get('pageSize') || 5
	const categories = +searchParams.get('categories') || 1023
	const minSalePrice = +searchParams.get('minSalePrice') || 1
	const maxSalePrice = +searchParams.get('maxSalePrice') || 4294967295
	const [count,setCount] = useState(0)
	const [products,setProducts] = useState([])
	const navigate = useNavigate()
	
	const search = async e => {
		const url = new URL(server+'/product/search')
		const params = new URLSearchParams()
		params.append('key',key)
		if(antiKey) params.append('antiKey',antiKey)
		if(categories) params.append('categories',categories)
		if(minSalePrice) params.append('minSalePrice',minSalePrice)
		if(maxSalePrice) params.append('maxSalePrice',maxSalePrice)
		if(page) params.append('page',page)
		if(pageSize) params.append('pageSize',pageSize)
		url.search = params.toString()
		const res = await fetch(url)
		const res_ = await res.json()
		setProducts(res_[0])
		setCount(res_[1])
	}
	
	useEffect(() => {
		if(key) search()
	},[searchParams])
	
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
	
	return (
		<div style={style}>
			<div>
				{products.length? (
					<div>
						<h2>검색 결과 ({count})</h2>
					</div>
					):(<h2>검색 결과가 없습니다.</h2>)}
				{products.map(product => <SearchCard key={product.id} product={product} />)}
			</div>
			{products.length? <PaginationControl page={page} limit={pageSize} total={count} changePage = {page => {
				const url = new URL(window.location.href)
				url.searchParams.set('page',page)
				navigate('?'+url.searchParams.toString())
			}} />:''}
		</div>
	)
}
