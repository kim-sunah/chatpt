import React, {useState,useEffect} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

const style = {
	width: 600,
	textAlign:'center',
	margin: '10px auto'
}

const buttonStyle = {
	width: 100,
	margin: '10px'
}

const categoryList = ['Food', 'Health', 'Household', 'Pet', 'Cosmetics', 'Office', 'Appliances', 'Furniture', 'Media', 'Others']

export default function SearchForm(props){
	const [key,setKey] = useState('')
	const [antiKey,setAntiKey] = useState('')
	const [show,setShow] = useState(false)
	const [minSalePrice,setMinSalePrice] = useState(0)
	const [maxSalePrice,setMaxSalePrice] = useState(0)
	
	const handleShow = () => setShow(true)
	const handleClose = () => setShow(false)
	
	return (
		<div style={style}>
			<Form onSubmit={e => props.search(e,key,antiKey,1023,minSalePrice,maxSalePrice)}>
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
							<Form.Control placeholder='검색어를 입력해주세요.' onChange={e => setAntiKey(e.target.value)} />
						</Form.Group>
						<Form.Group>
							{categoryList.map((category,i) => (
								<Form.Check key={i} type='checkbox' value={1<<i} label={category} />
							))}
						</Form.Group>
						<Form.Group>
							<Form.Label>최소 가격</Form.Label>
							<Form.Control type='number' onChange={e => setMinSalePrice(+e.target.value)} />
						</Form.Group>
						<Form.Group>
							<Form.Label>최대 가격</Form.Label>
							<Form.Control type='number' onChange={e => setMaxSalePrice(+e.target.value)} />
						</Form.Group>
						<br />
						<Button onClick={handleClose}>닫기</Button>
					</Form>
				</Modal.Body>
			</Modal>
		</div>
	)
}