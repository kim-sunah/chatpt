import { useNavigate, useSearchParams } from "react-router-dom"
import React, { useEffect, useRef, useState } from "react"

export default function PaymentSuccess(){
	const [searchParams] = useSearchParams()
	const user_id = +searchParams.get('user_id')
	const product_id = +searchParams.get('product_id')
	const mileage = +searchParams.get('mileage')
	const Authorization = 'Bearer '+window.sessionStorage.getItem('accessToken')
    const refreshtoken = window.sessionStorage.getItem('refreshToken')
	const navigate = useNavigate()
	useEffect(() => {
		const requestData = {
		  orderId: searchParams.get("orderId"),
		  amount: searchParams.get("amount"),
		  paymentKey: searchParams.get("paymentKey"),
		};

		async function confirm() {
		  try {
			const res2 = await fetch('https://api.tosspayments.com/v1/payments/confirm',{method:'post',headers:{Authorization:'Basic dGVzdF9za19leDZCSkdRT1ZEUE85YlEwYjJMYVZXNHcyek5iOg=='},body:JSON.stringify(requestData)})
			console.log(res2)
			const res = await fetch(`http://localhost:4000/payment`,{method:'post',headers:{'Content-Type':'application/json', Authorization, refreshtoken},
			body: JSON.stringify({user_id,product_id,spending:requestData.amount,mileage})})
		  } catch (error) {
			console.error("Error confirming payment:", error);
		  }
		}
		confirm()
	},[])
	
	return <p>결제가 완료되었습니다.</p>
}