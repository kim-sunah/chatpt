import React, {useState,useEffect} from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import {server} from '../../constant.js'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

const style = {
	width: 600,
	textAlign:'center'
}

const buttonStyle = {
	width: 100,
	margin: '10px'
}

const categoryList = ['Fitness', 'Yoga', 'Pilates', 'Hapkido', 'Taekwondo', 'Posture', 'Stretch', 'Ballet', 'Sports', 'Others']

const pageSizeList = [5,10,20,50,100]

export default function SearchForm(){
	const [show,setShow] = useState(false)
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
	
	const search = e => {
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
		navigate('/search?'+params.toString())
	}

	const handleShow = () => setShow(true)
	const handleClose = () => setShow(false)
	
	return (
		<div style={style}>
			<Form style={{display:'flex', justifyContent:'center', alignItems:'center'}} onSubmit={e => search(e)}>
				<Form.Group>
					<Form.Control required placeholder='검색어를 입력해주세요.' onChange={e => setKey(e.target.value)} />
				</Form.Group>
				<Button style={buttonStyle} onClick={handleShow}>상세 검색</Button>
				<Button style={buttonStyle} type='submit'>검색</Button>
				{/* <Form.Group style={{width:300, margin:'10px auto'}}>
					<Form.Check type='radio' onChange={props.sortProducts} name='sortOrder' value='highSalesVolume' id='highSalesVolume' label='판매량 높은 순' />
					<Form.Check type='radio' onChange={props.sortProducts} name='sortOrder' value='highRating' id='highRating' label='평점 높은 순' />
					<Form.Check type='radio' onChange={props.sortProducts} name='sortOrder' value='highSalePrice' id='highSalePrice' label='가격 높은 순' />
					<Form.Check type='radio' onChange={props.sortProducts} name='sortOrder' value='lowSalePrice' id='lowSalePrice' label='가격 낮은 순' />
				</Form.Group> */}
			</Form>
			<Modal show={show}>
				<Modal.Header>상세 검색</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group>
							<Form.Label>제외 검색어</Form.Label>
							<Form.Control placeholder='검색어를 입력해주세요.' value={antiKey} onChange={e => setAntiKey(e.target.value)} />
						</Form.Group>
						<Form.Group>
							<Form.Label>카테고리</Form.Label>
							{categoryList.map((category,i) => (
								<Form.Check key={i} type='checkbox' checked={(categories&(1<<i))>0} onChange={() => setCategories(categories^(1<<i))} label={category} />
							))}
						</Form.Group>
						<Form.Group>
							<Form.Label>최소 가격</Form.Label>
							<Form.Control type='number' value={minSalePrice} onChange={e => setMinSalePrice(+e.target.value)} />
						</Form.Group>
						<Form.Group>
							<Form.Label>최대 가격</Form.Label>
							<Form.Control type='number' value={maxSalePrice} onChange={e => setMaxSalePrice(+e.target.value)} />
						</Form.Group>
						<Form.Group>
							<Form.Label>페이지 당 상품 개수</Form.Label>
							{pageSizeList.map((pageSize_,i) => (
								<Form.Check key={i} name='pageSize' type='radio' checked={pageSize===pageSize_} onChange={() => setPageSize(pageSize_)} label={pageSize_} />
							))}
						</Form.Group>
						<br />
						<Button onClick={handleClose}>닫기</Button>
					</Form>
				</Modal.Body>
			</Modal>
		</div>
	)
}