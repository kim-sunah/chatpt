import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/button'
import Form from 'react-bootstrap/form'

const buttonStyle = {
	margin: '10px'
}

const style = {
	margin: '10px auto',
	textAlign: 'center'
}

const formStyle = {
	width: 500,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-around',
	margin: '0 auto'
}

const Payment = props => {
	const Authorization = 'Bearer '+window.sessionStorage.getItem('accessToken')
	const refreshtoken = window.sessionStorage.getItem('refreshToken')
	const [user,setUser] = useState({})
	// product는 prop으로 받아야할듯
	const [product,setProduct] = useState({})
	const [mileage,setMileage] = useState(0)
	const [ready,setReady] = useState(true)
	const [message,setMessage] = useState('')
	const [spending,setSpending] = useState(0)
	
	const getUser = async () => {
		const res = await fetch("http://localhost:4000/users/Mypage", {method : "GET" , headers:{"Content-Type" : "application/json", Authorization, refreshtoken} })
		if(res.status!==200) return alert('로그인을 해주세요.')
		setUser((await res.json()).user)
	}
	
	const getProduct = async () => {
		const res = await fetch('http://localhost:4000/product?id=19')
		if(res.status!==200) return alert('해당 상품이 존재하지 않습니다.')
		setProduct(await res.json())
	}
	
	const handleMileage = e => {
		const mileage_ = +e.target.value
		if(isNaN(mileage_) || !Number.isInteger(mileage_) || mileage_<0 || mileage_>product.sale_price || mileage_>user.mileage){
			setReady(false)
			setMessage('마일리지 사용량이 적절한 값이 아니거나 상품 가격 또는 보유 마일리지를 초과합니다.')
			setSpending(product.sale_price)
			return
		}
		setReady(true)
		setMileage(mileage_)
		setSpending(product.sale_price-mileage_)
	}
	
  useEffect(() => {
	  getUser()
	  getProduct()
    const jquery = document.createElement("script");
    jquery.src = "http://code.jquery.com/jquery-1.12.4.min.js";
    const iamport = document.createElement("script");
    iamport.src = "http://cdn.iamport.kr/js/iamport.payment-1.1.7.js";
    document.head.appendChild(jquery);
    document.head.appendChild(iamport);
    return () => {
      document.head.removeChild(jquery);
      document.head.removeChild(iamport);
    };
	
  }, []);
	
	const callback = async (rsp) => {
		if(rsp.success){
			const res = await fetch(`http://localhost:4000/payment`,{method:'post',headers:{'Content-Type':'application/json', Authorization, refreshtoken},
			body: JSON.stringify({user_id:user.id,product_id:product.id,spending,mileage})})
			console.log(await res.json())
		}else alert('결제에 실패했습니다.')
		console.log(rsp)
    }

  const requestKakaoPay = async () => {
    const { IMP } = window;
    IMP.init(process.env.REACT_APP_IAMPORT_CODE);

    IMP.request_pay({
      pg: 'TC0ONETIME',
      merchant_uid: new Date().getTime(),
      name: product.name,
      amount: spending,
      buyer_email: user.email,
      buyer_name: user.nickname
    },callback) ;
  };

  return (
    <div style={style}>
		<p>상품 가격: {product.sale_price}</p>
		<Form.Group style={formStyle}>
			<Form.Label >마일리지 사용</Form.Label>
			<Form.Control style={{width:300}} onChange={e => handleMileage(e)} size="lg" type="text" placeholder="0" />
		</Form.Group><br />
		{!ready && <p>{message}</p>}
		<p>보유 마일리지: {user.mileage}</p>
		<p>결제 금액: {spending}</p>
		<Button style={buttonStyle} disabled={!spending} onClick={requestKakaoPay}>카카오페이로 결제하기</Button>
		<Button style={buttonStyle} disabled={spending} onClick={() => callback({success:true})}>마일리지로 결제하기</Button>
    </div>
  );
};

export default Payment;