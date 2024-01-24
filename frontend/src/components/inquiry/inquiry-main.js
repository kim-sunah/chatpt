import InquiryCard from './inquiry-card'
import React, {useState,useEffect} from 'react'
import {server} from '../../constant'

const style = {
	width: 700,
	textAlign: 'center',
	margin: '10px auto'
}

const InquiryMain = props => {
	const [inquiries,setInquiries] = useState([])
	
	const getInquiries = async () => {
		const res = await fetch(server+'/inquiry/all')
		const inquiries_ = await res.json()
		setInquiries(inquiries_)
		console.log(inquiries)
	}
	
	useEffect(() => {
		getInquiries()
	},[])
	
	return (
		<div style={style}>
			{inquiries.map(inquiry => <InquiryCard key={inquiry.id} inquiry={inquiry} /> )}
		</div>
	)
}

export default InquiryMain