import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { loadPaymentWidget } from '@tosspayments/payment-widget-sdk';
import Modal from 'react-bootstrap/Modal';
import PaymentToss from './Payment-toss';
import { useNavigate, useSearchParams } from 'react-router-dom';

const style = {
	margin: '20px auto',
	textAlign: 'center',
	width: 750 // Increased width for better alignment
}

const wrapStyle = {
	margin: '15px auto',
	width: 700 // Adjusted width for better spacing
}

const productStyle = {
	padding: '10px', // Increased padding for better spacing
	display: 'flex',
	margin: '10px auto', // Adjusted margin for better spacing
	width: 700, // Adjusted width for better alignment
	height: 130, // Increased height for better alignment
	//border: '1px solid #ccc', // Added border for better visibility
	borderRadius: '5px' // Added border radius for better aesthetics
}

const imageStyle = {
	width: 100, // Adjusted width for better visibility
	height: 100, // Adjusted height for better visibility
	objectFit: 'cover',
	marginRight: '20px' // Increased margin for better spacing
}

const infoStyle = {
	margin: 'auto', // Centered content horizontally
	textAlign: 'left'
}

const tagStyle = {
	textAlign: 'left',
	//paddingLeft: 20, // Increased padding for better alignment
	fontWeight: 700,
	margin: '25px auto'
}

const formStyle = {
	width: '100%',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	margin: '0 auto'
}

const radioStyle = {
	width: '100%', // Increased width for better alignment
	margin: '10px auto',
	textAlign: 'left'
}

const buttonStyle = {
	margin: '10px',
	width: 500 // Adjusted width for better visibility
}

const tableStyle = {
	width: '100%',
}

const priceStyle = {
	width: '100%',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	margin: '10px auto'
}

const borderStyle = {
	height: 3,
	width: '100%',
	backgroundColor: '#ccc'
}
const Payment = (props) => {
	const Authorization = 'Bearer ' + window.sessionStorage.getItem('accessToken');
	const refreshtoken = window.sessionStorage.getItem('refreshToken');
	const [user, setUser] = useState({});
	// product는 prop으로 받아야할듯
	const [product, setProduct] = useState({});
	const [mileage, setMileage] = useState(0);
	const [ready, setReady] = useState(true);
	const [spending, setSpending] = useState(0);
	const [show, setShow] = useState(false);
	const [searchParams] = useSearchParams();
	const [method, setMethod] = useState('kakao');
	const navigate = useNavigate();

	const id = searchParams.get('id')
	const getInfo = async () => {
		const res = await fetch('https://iamchatpt.com:444/users/Mypage', {
			method: 'GET',
			headers: { 'Content-Type': 'application/json', Authorization, refreshtoken },
		});
		if (res.status !== 200) {
			alert('로그인을 해주세요.');
			navigate('/Login');
		}
		const user_ = (await res.json()).user;
		setUser(user_);

		const res2 = await fetch(`https://iamchatpt.com:444/payment/my/${id}`, { headers: { 'Content-Type': 'application/json', Authorization, refreshtoken } })
		const payment = await res2.json()
		if (payment.id) {
			alert('이미 구매한 강의입니다.')
			navigate('../mypage')
		}

		const res3 = await fetch(`https://iamchatpt.com:444/product?id=${id}`);
		if (res3.status !== 200) {
			alert('해당 상품이 존재하지 않습니다.');
			navigate('/')
		}
		const product_ = await res3.json()
		if (product_.user_id === user_.id) {
			alert('자신이 등록한 강의는 구매할 수 없습니다.')
			navigate('../mypage')
		}
		setProduct(product_);
	}

	const handleMileage = (e) => {
		const mileage_ = parseInt(e.target.value) || 0;
		if (
			mileage_ < 0 ||
			mileage_ > product.sale_price ||
			mileage_ > user.mileage
		)
			return setReady(false);
		setReady(true);
		setMileage(mileage_);
	};

	useEffect(() => {
		getInfo()
		const jquery = document.createElement('script');
		jquery.src = 'http://code.jquery.com/jquery-1.12.4.min.js';
		const iamport = document.createElement('script');
		iamport.src = 'http://cdn.iamport.kr/js/iamport.payment-1.1.7.js';
		document.head.appendChild(jquery);
		document.head.appendChild(iamport);
		return () => {
			document.head.removeChild(jquery);
			document.head.removeChild(iamport);
		};
	}, []);

	useEffect(() => {
		if (product.sale_price && !isNaN(mileage)) setSpending(product.sale_price - mileage);
	}, [product, mileage]);

	const callback = async (rsp, isKakao = true) => {
		if (rsp.success) {
			const res = await fetch(`https://iamchatpt.com:444/payment`, {
				method: 'post',
				headers: { 'Content-Type': 'application/json', Authorization, refreshtoken },
				body: JSON.stringify({
					user_id: user.id,
					product_id: product.id,
					spending,
					mileage,
					method: isKakao ? 'KAKAOPAY' : 'MILEAGE',
				}),
			});
			alert('결제에 성공했습니다.')
			navigate(`../product/${id}`)
		} else alert('결제에 실패했습니다.');
	};

	const requestKakaoPay = async () => {
		const { IMP } = window;
		IMP.init(process.env.REACT_APP_IAMPORT_CODE);
		IMP.request_pay(
			{
				merchant_uid: new Date().getTime(),
				name: product.name,
				amount: spending,
				buyer_email: user.email,
				buyer_name: user.nickname,
			},
			callback
		);
	};

	const handleShow = () => setShow(true);
	const handleClose = () => setShow(false);

	const pay = () => {
		if (spending === 0) callback({ success: true }, false);
		else if (method === 'kakao') requestKakaoPay();
		else handleShow();
	};

	return (
		<div style={style}>
			<div style={wrapStyle}>
				<h5 style={tagStyle}>강의 정보</h5>
				<div style={productStyle}>
					<img src={product.thumbnail} style={imageStyle} />
					<div style={infoStyle}>
						<h5>{product.name}</h5>
						<h6>{product.intro}</h6>
						<h5>{product.sale_price?.toLocaleString()}원</h5>
					</div>
				</div>
			</div><div style={borderStyle} />
			<div style={wrapStyle}>
				<h5 style={tagStyle}>구매자 정보</h5>
				<div style={infoStyle}>
					<h6>{user.nickname}</h6>
					<h6>{user.email}</h6>
					<h6>{user.phone}</h6>
				</div>
			</div><div style={borderStyle} />
			<div style={wrapStyle}>
				<h5 style={tagStyle}>마일리지</h5>
				<Form.Group style={formStyle}>
					<Form.Label style={{}}>마일리지 사용</Form.Label>
					<Form.Control value={mileage} style={{ width: 300 }} onChange={e => handleMileage(e)} size="lg" type="text" placeholder="0" />
					<Button variant='dark' onClick={() => {
						setMileage(Math.min(product.sale_price, user.mileage))
						setReady(true)
					}}>전액 사용</Button>
				</Form.Group><br />
				<h6 style={{ textAlign: 'right', fontWeight: 700 }}>보유 마일리지 {user.mileage?.toLocaleString()}</h6>
				{!ready && <p>마일리지 사용량이 적절한 값이 아니거나 상품 가격 또는 보유 마일리지를 초과합니다.</p>}
			</div><div style={borderStyle} />
			<div style={wrapStyle}>
				<h5 style={tagStyle}>주문 내역</h5>
				<div style={priceStyle}>
					<h6>상품 가격</h6>
					<h6>{product.sale_price?.toLocaleString()}원</h6>
				</div>
				<div style={priceStyle}>
					<h6>마일리지 사용</h6>
					<h6>{mileage?.toLocaleString()}원</h6>
				</div><hr />
				<div style={priceStyle}>
					<h5>결제 금액</h5>
					<h5>{spending?.toLocaleString()}원</h5>
				</div>
			</div><div style={borderStyle} />
			<div style={wrapStyle}>
				<h5 style={tagStyle}>결제 수단</h5>
				<div style={radioStyle}>
					<Form.Check style={{ margin: '15px auto' }} defaultChecked disabled={mileage === product.sale_price} onChange={() => setMethod('kakao')} name='method' type='radio' label='카카오페이' />
					<Form.Check style={{ margin: '15px auto' }} name='method' disabled={mileage === product.sale_price} onChange={() => setMethod('toss')} type='radio' label='토스페이먼츠' />
				</div>
			</div>
			<Button variant='dark' style={buttonStyle} onClick={pay} disabled={!ready}>{mileage === product.sale_price && '마일리지로'} 결제하기</Button> <br />
			<Modal show={show}>
				<PaymentToss product={product} user={user} spending={spending} mileage={mileage} callback={callback} handleClose={handleClose} />
			</Modal>
		</div>
	);
};

export default Payment;
