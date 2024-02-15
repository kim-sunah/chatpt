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

const videoStyle = {
	borderRadius: 15,
	objectFit: 'cover',
	width: 300,
	height: 225
}

const xStyle = {
	cursor: 'pointer'
}

const categoryList = [['헬스','Fitness'], ['요가','Yoga'], ['필라테스','Pilates'], ['태권도','Taekwondo'], ['자세교정','Posture'], ['스트레칭','Stretch'], ['발레','Ballet'], ['스포츠','Sports'], ['기타','Others']]
const weekdayList = ['일','월','화','수','목','금','토']

const ProductForm = props => {
	const [name,setName] = useState(props.product?.name || '')
	const [category,setCategory] = useState(props.product?.category || 'Others')
	const [product_body,setBody] = useState(props.product?.body || '')
	const [price,setPrice] = useState(props.product?.price || 1)
	const [sale_price,setSalePrice] = useState(props.product?.sale_price || 1)
	const [thumbnail,setThumbnail] = useState(props.product?.thumbnail || '')
	const [images,setImages] = useState(props.images || [])
	const [newImages,setNewImages] = useState([])
	const [shorts,setShorts] = useState(props.product?.shorts || '')
	const [intro,setIntro] = useState(props.product?.intro || '')
	const [capacity,setCapacity] = useState(props.product?.capacity || 1)
	const [start_on,setStartOn] = useState(props.product?.start_on || (new Date().toISOString().slice(0,10)))
	const [end_on,setEndOn] = useState(props.product?.end_on || (new Date().toISOString().slice(0,10)))
	const [start_at,setStartAt] = useState(props.product?.start_at || '06:00:00')
	const [end_at,setEndAt] = useState(props.product?.end_at || '07:00:00')
	
	const handleFileChange = e => {
		const file = e.target.files[0]
		if (file) setThumbnail(file)
	}

	const handleImageChange = e => {
		const file = e.target.files[0]
		if(file) setNewImages([...newImages,file])
		e.target.value = null
	}

	const handleShortChange = e => {
		const file = e.target.files[0]
		if (file) setShorts(file)
	}

	const bitToString = weekday => {
		let res = ''
		for(let i=1,j=0;i<=64;i*=2,++j)
			if(weekday&i) res += j
		return res
	}
	
	const stringToBit = weekdayString => {
		let res = 0
		for(let c of [...weekdayString])
			res ^= 1<<+c
		return res
	}
	
	const [weekday,setWeekday] = useState(props.product?.weekday? stringToBit(props.product.weekday):0)
	
	useEffect(() => {
		setName(props.product?.name || '')
	    setCategory(props.product?.category || 'Others')
		setBody(props.product?.body || '')
		setPrice(props.product?.price || 1)
		setSalePrice(props.product?.sale_price || 1)
		setThumbnail(props.product?.thumbnail || '')
		setIntro(props.product?.intro || '')
		setCapacity(props.product?.capacity || 1)
		setWeekday(props.product?.weekday? stringToBit(props.product.weekday):0)
		setStartOn(props.product?.start_on || (new Date().toISOString().slice(0,10)))
		setEndOn(props.product?.end_on || (new Date().toISOString().slice(0,10)))
		setStartAt(props.product?.start_at || '06:00:00')
		setEndAt(props.product?.end_at || '07:00:00')
		setShorts(props.product?.shorts || '')
	}, [props.product, props.images])
	
	return (
		<Form style={style} onSubmit={e => {
			e.preventDefault()
			if(start_on<=end_on && Number.isInteger(capacity) && 1<=capacity && capacity<=100 && weekday>0){
				props.onSubmit(e,{name,category,body:product_body,price,sale_price,thumbnail,images:newImages,intro,capacity,start_on,end_on,weekday:bitToString(weekday),start_at,end_at,shorts})
		}}}>
			<Form.Group>
				<Form.Label>이름</Form.Label>
				<Form.Control required onChange={e => setName(e.target.value)} value={name} />
			</Form.Group>
			<Form.Group>
				<Form.Label>카테고리</Form.Label>
				<Form.Select onChange={e => setCategory(e.target.value)} value={category}>
					{categoryList.map((category_,i) => <option key={i} value={category_[1]}>{category_[0]}</option>)}
				</Form.Select>
			</Form.Group>
			<Form.Group>
				<Form.Label>간단 소개</Form.Label>
				<Form.Control required onChange={e => setIntro(e.target.value)} value={intro} />
			</Form.Group>
			<Form.Group>
				<Form.Label>설명</Form.Label>
				<Form.Control as="textarea" onChange={e => setBody(e.target.value)} value={product_body} />
			</Form.Group>
			<Form.Group>
				<Form.Label>정가</Form.Label>
				<Form.Control required type='number' onChange={e => setPrice(parseInt(e.target.value))} value={price} />
			</Form.Group>
			<Form.Group>
				<Form.Label>판매가</Form.Label>
				<Form.Control type='number' onChange={e => setSalePrice(parseInt(e.target.value))} value={sale_price} />
			</Form.Group>
			<Form.Group>
				<Form.Label>정원(최대 100명)</Form.Label>
				<Form.Control type='number' onChange={e => setCapacity(parseInt(e.target.value))} value={capacity} />
			</Form.Group>
			{!(Number.isInteger(capacity) && 1<=capacity && capacity<=100) && <p style={{color:'red'}}>정원은 1 이상 100 이하의 자연수여야 합니다.</p>}
			<Form.Group>
				<Form.Label>강의 시작일</Form.Label>
				<Form.Control type="date" onChange={e => setStartOn(e.target.value)} value={start_on} />
			</Form.Group>
			<Form.Group>
				<Form.Label>강의 종료일</Form.Label>
				<Form.Control type="date" onChange={e => setEndOn(e.target.value)} value={end_on} />
			</Form.Group>
			{start_on>end_on && <p style={{color:'red'}}>강의 종료일이 강의 시작일보다 빠를 수 없습니다.</p>}
			<Form.Group>
				<Form.Label>수업 요일</Form.Label>
				<div style={{display:'flex',justifyContent:'space-between'}}>
					{weekdayList.map((weekday_,i) => <Form.Check key={i} onChange={() => setWeekday(weekday^(1<<i))} checked={(weekday&(1<<i))>0} label={weekday_}/>)}
				</div>
			</Form.Group>
			{weekday===0 && <p style={{color:'red'}}>적어도 하나의 수업 요일을 지정해야 합니다.</p>}
			<Form.Group>
				<Form.Label>수업 시작 시간</Form.Label>
				<Form.Control type='time' onChange={e => setStartAt(e.target.value)} value={start_at} />
			</Form.Group>
			<Form.Group>
				<Form.Label>수업 종료 시간</Form.Label>
				<Form.Control type='time' onChange={e => setEndAt(e.target.value)} value={end_at} />
			</Form.Group>
			<p>*실제 수업을 진행할 요일과 시간을 작성하기를 권장드리지만, 반드시 모든 수업이 작성한 수업 요일, 수업 시간에 진행되어야 하는 것은 아니며 실제 시간은 강사님 재량으로 자유롭게 선택하실 수 있습니다.</p>
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
				<Form.Control multiple type='file' onChange={handleImageChange} accept='.jpg, .jpeg, .png' />
				{newImages.length>0 && newImages.map((img,i) => (
					<div key={i} style={{display:'flex'}}>
						<p style={{marginRight:'10px'}}>{img.name}</p>
						<p style={xStyle} onClick={() =>setNewImages(newImages.filter((img,j) => j!==i))}>X</p>
					</div>))}
				{props.product && <Button onClick={e => { 
					props.uploadImage(e,newImages)
					setNewImages([])
				}}>이미지 추가</Button> }
			</Form.Group>
			<Form.Group>
				<Form.Label>상품 쇼츠 (mp4, avi, mov, mkv만 가능, 50MB 이하)</Form.Label>
				{props.product?.shorts && (
					<video style={videoStyle} controls>
						<source src={props.product.shorts} type='video/mp4' />
					</video>
				)}
				<Form.Control type='file' onChange={handleShortChange} accept='.mp4, .avi, .mov, .mkv' defaultValue={props.product?.shorts || ''} />
			</Form.Group>
			<br />
			<Button type='submit' className='me-2'>{props.tag || '상품 등록'}</Button>
			{props.tag && (<Button onClick={props.deleteProduct} className='me-2'>상품 삭제</Button>)}
		</Form>
	)
}

export default ProductForm
