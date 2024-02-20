import { useNavigate, useSearchParams } from "react-router-dom"
import React, { useEffect, useRef, useState } from "react"

export default function PaymentSuccess() {
	const [searchParams] = useSearchParams()
	const user_id = +searchParams.get('user_id')
	const product_id = +searchParams.get('product_id')
	const mileage = +searchParams.get('mileage')
	const Authorization = 'Bearer ' + window.sessionStorage.getItem('accessToken')
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
				const res = await fetch('https://api.tosspayments.com/v1/payments/confirm', { method: 'post', headers: { Authorization: process.env.REACT_APP_TOSS_API_KEY }, body: JSON.stringify(requestData) })
				const approval = await res.json()
				if (res.status !== 200) throw new Error('결제가 승인되지 않았습니다. 다시 한 번 시도해주세요.')
				await fetch(`https://iamchatpt.com:4430/payment`, {
					method: 'post', headers: { 'Content-Type': 'application/json', Authorization, refreshtoken },
					body: JSON.stringify({ user_id, product_id, spending: requestData.amount, mileage, method: approval.method })
				})
			} catch (error) {
				console.error("Error confirming payment:", error);
			}
		}
		confirm()
		alert('결제에 성공했습니다.')
		navigate('../../mypage')
	}, [])

	return <p>결제가 완료되었습니다.</p>
}