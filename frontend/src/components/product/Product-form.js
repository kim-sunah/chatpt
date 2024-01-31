import {useState, useEffect} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {server} from '../../constant.js'

const style = {
	width: 500,
	margin: '5px auto'
}

const thumbnailStyle = {
	borderRadius: 15,
	objectFit: 'cover',
	width: 240,
	height: 180
}

const imgStyle = {
	width: 'auto',
	height: 'auto',
	maxWidth: 200,
	maxHeight: 150,
	display: 'block',
	margin: '10px'
}

const categoryList = ['Fitness', 'Yoga', 'Pilates', 'Hapkido', 'Taekwondo', 'Posture', 'Stretch', 'Ballet', 'Sports', 'Others']
const statusList = ['Salable', 'Unsalable', 'Pending']

const ProductForm = props => {
	const [name,setName] = useState(props.product?.name || '')
	const [category,setCategory] = useState(props.product?.category || 9)
	const [status,setStatus] = useState(props.product?.status || 0)
	const [product_body,setBody] = useState(props.product?.body || '')
	const [price,setPrice] = useState(props.product?.price || 1)
	const [sale_price,setSalePrice] = useState(props.product?.sale_price || 1)
	const [thumbnail,setThumbnail] = useState(props.product?.thumbnail || '')
	const [images,setImages] = useState(props.images || [])
	const [image_,setImage_] = useState([])
	
	useEffect(() => {
	    setName(props.product?.name || '')
	    setCategory(props.product?.category || 9)
	    setStatus(props.product?.status || 0)
	    setBody(props.product?.body || '')
	    setPrice(props.product?.price || 1)
	    setSalePrice(props.product?.sale_price || 1)
		setThumbnail(props.product?.thumbnail || '')
		setImages(props.images || [])
	}, [props.product, props.images])
	
	const handleFileChange = e => {
		const file = e.target.files[0]
		if (file) setThumbnail(file)
	}

	const handleImageChange = e => {
		const file = e.target.files[0]
		if (file) setImage_(file)
	}
	
	return (
		<Form style={style} onSubmit={e => props.onSubmit(e,{name,category,status,body:product_body,price,sale_price,thumbnail,image:image_})}>
			<Form.Group>
				<Form.Label>이름</Form.Label>
				<Form.Control required onChange={e => setName(e.target.value)} defaultValue={props.product?.name || ''} />
			</Form.Group>
			<Form.Group>
				<Form.Label>카테고리</Form.Label>
				<Form.Select onChange={e => setCategory(+e.target.value)} value={category}>
					{categoryList.map((category_,i) => <option key={i} value={i}>{category_}</option>)}
				</Form.Select>
			</Form.Group>
			<Form.Group>
				<Form.Label>판매 상태</Form.Label>
				<Form.Select value={status} onChange={e => setStatus(+e.target.value)}>
					{statusList.map((status_,i) => <option key={i} value={i}>{status_}</option>)}
				</Form.Select>
			</Form.Group>
			<Form.Group>
				<Form.Label>설명</Form.Label>
				<Form.Control as="textarea" onChange={e => setBody(e.target.value)} defaultValue={props.product?.body || ''} />
			</Form.Group>
			<Form.Group>
				<Form.Label>정가</Form.Label>
				<Form.Control required type='number' onChange={e => setPrice(+e.target.value)} defaultValue={props.product?.price || ''} />
			</Form.Group>
			<Form.Group>
				<Form.Label>판매가</Form.Label>
				<Form.Control type='number' onChange={e => setSalePrice(+e.target.value)} defaultValue={props.product?.sale_price || ''} />
			</Form.Group>
			<Form.Group>
				<Form.Label>썸네일 (jpg, jpeg, png만 가능, 2MB 이하)</Form.Label>
				{props.product?.thumbnail && (
					<img style={thumbnailStyle} src={props.product?.thumbnail} />
				)}
				<Form.Control type='file' onChange={handleFileChange} accept='.jpg, .jpeg, .png' defaultValue={props.product?.thumbnail || ''} />
			</Form.Group>
			<Form.Group>
				<Form.Label>상품 이미지 (jpg, jpeg, png만 가능, 2MB 이하)</Form.Label>
				{props.images && (props.images.map(image => (
					<img style={imgStyle} src={image.original_url} key={image.id} data-image-id={image.id} onClick={props.deleteImage} />
				)))}
				<Form.Control type='file' onChange={handleImageChange} accept='.jpg, .jpeg, .png' />
				{props.product && <Button onClick={e => props.uploadImage(e,image_)}>이미지 추가</Button> }
			</Form.Group>
			<br />
			<Button type='submit' className='me-2'>{props.tag || '상품 등록'}</Button>
			{props.tag && (<Button onClick={props.deleteProduct} className='me-2'>상품 삭제</Button>)}
		</Form>
	)
}

export default ProductForm
