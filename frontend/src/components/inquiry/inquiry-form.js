import React, {useState} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/button'

const InquiryForm = props => {
	const [inquiry_body,setBody] = useState('')
	return (
		<Form onSubmit={e => props.createInquiry(e,inquiry_body)}>
			<Form.Group>
				<Form.Label>문의 내용</Form.Label>
				<Form.Control as="textarea" onChange={e => setBody(e.target.value)} />
			</Form.Group> <br />
			<Button type='submit'>제출</Button>
		</Form>
	)
}

export default InquiryForm