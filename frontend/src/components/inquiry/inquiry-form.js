import React, {useState} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/button'

const InquiryForm = props => {
	const [inquiry_body,setBody] = useState('')
	return (
		<Form onSubmit={e => props.createInquiry(e,inquiry_body)}>
			<Form.Group>
				<Form.Label>{props.reply? '답변 내용':'문의 내용'}</Form.Label>
				<Form.Control required as="textarea" rows={10} onChange={e => setBody(e.target.value)} />
			</Form.Group> <br />
			<Button type='submit' className='me-2'>제출</Button>
			{props.handleClose && <Button onClick={props.handleClose}>닫기</Button>}
		</Form>
	)
}

export default InquiryForm