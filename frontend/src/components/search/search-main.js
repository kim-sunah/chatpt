import React, {useState,useEffect} from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import SearchForm from './search-form'
import SearchCard from './search-card'
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
	const [products,setProducts] = useState([])
	const [searchParams,setSearchParams] = useSearchParams()
	const [key,setKey] = useState(searchParams.get('key') || '')
	const [antiKey,setAntiKey] = useState(searchParams.get('antiKey') || '')
	const [searched,setSearched] = useState(false)
	const [count,setCount] = useState(0)
	const [page,setPage] = useState(+searchParams.get('page') || 1)
	const [pageSize,setPageSize] = useState(+searchParams.get('pageSize') || 5)
	const [categories,setCategories] = useState(+searchParams.get('categories') || 1023)
	const [minSalePrice,setMinSalePrice] = useState(1)
	const [maxSalePrice,setMaxSalePrice] = useState(4294967295)
	const navigate = useNavigate()
	
	const search = async e => {
		e?.preventDefault()
		setSearched(true)
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
		const [products_,count_] = await res.json()
		setCount(count_)
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
		if(key) search()
	}, [searchParams])
	
	return (
		<div style={style}>
			<SearchForm search={search} key_={key} setKey={setKey} antiKey={antiKey} setAntiKey={setAntiKey} categories={categories} setCategories={setCategories} minSalePrice={minSalePrice} setMinSalePrice={setMinSalePrice} maxSalePrice={maxSalePrice} setMaxSalePrice={setMaxSalePrice} pageSize={pageSize} setPageSize={setPageSize} />
			<div>
				{searched? (
					products.length? (
						<div>
							<h2>검색 결과 ({count})</h2>
						</div>
						):(<h2>검색 결과가 없습니다.</h2>)
					):(<h2>원하는 상품을 검색해보세요!</h2>)}
				{products.map(product => <SearchCard key={product.id} product={product} />)}
			</div>
			{searched && <PaginationControl page={page} limit={pageSize} total={count} changePage = {page => {
				setPage(page)
				const url = new URL(window.location.href)
				url.searchParams.set('page',page)
				navigate('?'+url.searchParams.toString())
			}} />}
		</div>
	)
}