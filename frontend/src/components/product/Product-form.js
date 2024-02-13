import {useState, useEffect} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {server} from '../../constant.js'
import './form.css'

const style = {
	width: 550,
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

const categoryList = [['헬스','Fitness'], ['요가','Yoga'], ['필라테스','Pilates'], ['합기도','Hapkido'], ['태권도','Taekwondo'], ['자세교정','Posture'], ['스트레칭','Stretch'], ['발레','Ballet'], ['스포츠','Sports'], ['기타','Others']]
const weekdayList = ['일요일','월요일','화요일','수요일','목요일','금요일','토요일']

const ProductForm = props => {
	const [name,setName] = useState(props.product?.name || '')
	const [category,setCategory] = useState(props.product?.category || 'Others')
	const [status,setStatus] = useState(props.product?.status || 0)
	const [product_body,setBody] = useState(props.product?.body || '')
	const [price,setPrice] = useState(props.product?.price || 1)
	const [sale_price,setSalePrice] = useState(props.product?.sale_price || 1)
	const [thumbnail,setThumbnail] = useState(props.product?.thumbnail || '')
	const [images,setImages] = useState(props.images || [])
	const [image_,setImage_] = useState([])
	const [intro,setIntro] = useState(props.product?.intro || '')
	const [capacity,setCapacity] = useState(props.product?.capacity || 1)
	const [start_on,setStartOn] = useState(props.product?.start_on || (new Date().toISOString().slice(0,10)))
	const [end_on,setEndOn] = useState(props.product?.end_on || (new Date().toISOString().slice(0,10)))
	const [weekday,setWeekday] = useState(props.product?.weekday || 0)
	const [start_at,setStartAt] = useState(props.product?.start_at || '06:00:00')
	const [end_at,setEndAt] = useState(props.product?.end_at || '07:00:00')
	
	/* useEffect(() => {
	    setName(props.product?.name || '')
	    setCategory(props.product?.category || 'Others')
	    setStatus(props.product?.status || 0)
	    setBody(props.product?.body || '')
	    setPrice(props.product?.price || 1)
	    setSalePrice(props.product?.sale_price || 1)
		setThumbnail(props.product?.thumbnail || '')
		setImages(props.images || [])
	}, [props.product, props.images]) */
	
	const handleFileChange = e => {
		const file = e.target.files[0]
		if (file) setThumbnail(file)
	}

	const handleImageChange = e => {
		const file = e.target.files[0]
		if (file) setImage_(file)
	}
	
	return (
		<Form style={style} onSubmit={e => props.onSubmit(e,{name,category,body:product_body,price,sale_price,thumbnail,image:image_,intro,capacity,start_on,end_on,weekday,start_at,end_at})}>
			<Form.Group>
				<Form.Label>이름</Form.Label>
				<Form.Control required onChange={e => setName(e.target.value)} defaultValue={props.product?.name || ''} />
			</Form.Group>
			<Form.Group>
				<Form.Label>카테고리</Form.Label>
				<Form.Select onChange={e => setCategory(e.target.value)} value={category}>
					{categoryList.map((category_,i) => { console.log(category_[1]); return <option key={i} value={category_[1]}>{category_[0]}</option>})}
				</Form.Select>
			</Form.Group>
			<Form.Group>
				<Form.Label>간단 소개</Form.Label>
				<Form.Control required onChange={e => setIntro(e.target.value)} defaultValue={props.product?.intro || ''} />
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
				<Form.Label>정원(최대 100명)</Form.Label>
				<Form.Control type='number' onChange={e => setCapacity(+e.target.value)} defaultValue={props.product?.capacity || 0} />
			</Form.Group>
			<Form.Group>
				<Form.Label>강의 시작일</Form.Label>
				<Form.Control type="date" onChange={e => setStartOn(e.target.value)} defaultValue={props.product?.start_on || (new Date().toISOString().slice(0,10))} />
			</Form.Group>
			<Form.Group>
				<Form.Label>강의 종료일</Form.Label>
				<Form.Control type="date" onChange={e => setEndOn(e.target.value)} defaultValue={props.product?.end_on || (new Date().toISOString().slice(0,10))} />
			</Form.Group>
			<Form.Group>
				<Form.Label>수업 요일</Form.Label>
				<Form.Select onChange={e => setWeekday(+e.target.value)} value={weekday}>
					{weekdayList.map((weekday_,i) => <option key={i} value={i}>{weekday_}</option>)}
				</Form.Select>
			</Form.Group>
			<Form.Group>
				<Form.Label>수업 시작 시간</Form.Label>
				<Form.Control type='time' onChange={e => setStartAt(+e.target.value)} defaultValue={props.product?.start_at || '06:00:00'} />
			</Form.Group>
			<Form.Group>
				<Form.Label>수업 종료 시간</Form.Label>
				<Form.Control type='time' onChange={e => setEndAt(+e.target.value)} defaultValue={props.product?.end_at || '07:00:00'} />
			</Form.Group>
			<p>*실제 수업을 진행할 요일과 시간을 작성하기를 권장드리지만, 반드시 모든 수업이 작성한 수업 요일, 수업 시간에 진행되어야 하는 것은 아닙니다.</p>
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
