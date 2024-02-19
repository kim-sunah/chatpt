export default function PaymentCard({payment}){
	const localTimezoneOffset = (new Date().getTimezoneOffset())*60000
	const localize = time => {
		const date = (new Date(time)).getTime()
		return new Date(date).toLocaleString()
	}
	
	return (
		<tr>
			<td>{payment.product.name}</td>
			<td>{payment.spending+payment.mileage}</td>
			<td>{payment.spending}</td>
			<td>{payment.method}</td>
			<td>{payment.mileage}</td>
			<td>{localize(payment.createdAt)}</td>
		</tr>
	)
}