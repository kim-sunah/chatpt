import React, {useState,useEffect} from 'react'
import Card from 'react-bootstrap/Card'
import { useNavigate } from 'react-router-dom'

const style = {
	margin: '10px auto',
	padding: '5px',
	width: 500,
	border: '1px solid black',
	borderRadius: 15
}

const cardStyle = {
	padding: '5px',
	borderRadius: 15,
	display: 'inline-block'
}

const imgStyle = {
	borderRadius: 15,
	objectFit: 'cover',
	width: 200,
	height: 150,
	marginRight: 10
}

const decimal1 = (total,count) => {
	if(!count) return '0.0'
	const rating = total*10/count|0
	return `{rating/10|0}.{rating%10}`
}

export default function SearchCard(props){
	const {id, name, thumbnail, price, sale_price, rating_total, rating_count, sales_volume} = props.product
	const navigate = useNavigate()
	return (
		<Card onClick={() => window.open(`../productDetail?id=${id}`,'_blank')} style={style}>
			<Card.Header style={{display:'flex'}}>
				<img style={imgStyle} src={thumbnail || 'default.png'} />
				<div>
					<h2>{name}</h2>
					<h4>{price}원</h4>
					<h4>{sale_price}원</h4>
					<p>{decimal1(rating_total,rating_count)} ({rating_count}) 판매량: {sales_volume}</p>
				</div>
			</Card.Header>
		</Card>
	)
}