import React, {useState,useEffect} from 'react'
import { PaginationControl } from 'react-bootstrap-pagination-control'
import {server} from '../../constant.js'
import PaymentCard from './Payment-card'
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'

const style = {
	width: 800,
	margin: '15px auto'
}
const tableStyle = {
	
}
const switchStyle = {
	margin:'0 10px',
	borderColor: '#ccc'
}

const pageSize = 5

export default function PaymentMy(){
	const [page,setPage] = useState(1)
	const [payments,setPayments] = useState([])
	const [count,setCount] = useState(0)
	const [inTable,setInTable] = useState(true)
	const authorization = 'Bearer '+window.sessionStorage.getItem('accessToken')
	const refreshtoken = window.sessionStorage.getItem('refreshToken')
	
	const getPayments = async () => {
		const res = await fetch(server+`/payment/my?page=${page}`,{headers:{'Content-Type' : 'application/json', authorization,refreshtoken}})
		const [payments_,count_] = (await res.json()).data
		setPayments(payments_)
		setCount(count_)
		console.log(page,payments_)
	}
	
	useEffect(() => {
		getPayments()
	},[page])
	
	return (
		<div style={style}>
			<div style={{display:'flex', alignItems:'center'}}>
				<h3>결제 내역 총 {count}건</h3>
			</div>
			<Table style={tableStyle}>
				<thead>
					<tr>
						<th>강의</th>
						<th>가격</th>
						<th>결제액</th>
						<th>결제수단</th>
						<th>마일리지 사용</th>
						<th>결제 일시</th>
					</tr>
				</thead>
				<tbody>
					{payments.map(payment => <PaymentCard key={payment.id} payment={payment} />)}
				</tbody>
			</Table>
			<PaginationControl page={page} limit={pageSize} total={count} changePage = {page => setPage(page)} />
		</div>
	)
}