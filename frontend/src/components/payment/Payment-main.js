import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { loadPaymentWidget } from '@tosspayments/payment-widget-sdk';
import Modal from 'react-bootstrap/Modal';
import PaymentToss from './Payment-toss';
import { useNavigate, useSearchParams } from 'react-router-dom';

const buttonStyle = {
    margin: '10px',
};

const style = {
    margin: '20px auto',
    textAlign: 'center',
    width: 600,
};

const radioStyle = {
    width: 300,
    margin: '10px auto',
};

const formStyle = {
    width: 600,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    margin: '0 auto',
};

const wrapStyle = {
    margin: '15px auto',
    width: 550,
};

const productStyle = {
    padding: '5px',
    display: 'flex',
    margin: '5px auto',
    width: 600,
    height: 110,
};

const imageStyle = {
    maxWidth: 80,
    maxHeight: 80,
    objectFit: 'cover',
    margin: '10px',
};

const infoStyle = {
    margin: '10px',
    textAlign: 'left',
};

const tagStyle = {
    textAlign: 'left',
    paddingLeft: 10,
    fontWeight: 700,
};

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

    const getUser = async () => {
        const res = await fetch('http://localhost:4000/users/Mypage', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', Authorization, refreshtoken },
        });
        if (res.status !== 200) {
            alert('로그인을 해주세요.');
            navigate('/Login');
        }
        const user_ = (await res.json()).user;
        if (user_.authority !== 'User') {
            alert('권한이 없습니다.');
            navigate('/');
        }
        setUser(user_);
    };

    const getProduct = async () => {
        const id = searchParams.get('id');
        const res = await fetch(`http://localhost:4000/product?id=${id}`);
        if (res.status !== 200) return alert('해당 상품이 존재하지 않습니다.');
        setProduct(await res.json());
    };

    const handleMileage = (e) => {
        const mileage_ = +e.target.value;
        if (
            isNaN(mileage_) ||
            !Number.isInteger(mileage_) ||
            mileage_ < 0 ||
            mileage_ > product.sale_price ||
            mileage_ > user.mileage
        )
            return setReady(false);
        setReady(true);
        setMileage(mileage_);
    };

    useEffect(() => {
        getUser();
        getProduct();
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
            const res = await fetch(`http://localhost:4000/payment`, {
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
            console.log(await res.json());
        } else alert('결제에 실패했습니다.');
        console.log(rsp);
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
                <h4 style={tagStyle}>강의 정보</h4>
                <div style={productStyle}>
                    <img src={product.thumbnail} style={imageStyle} />
                    <div style={infoStyle}>
                        <h4>{product.name}</h4>
                        <h6>{product.intro}</h6>
                        <p>{product.sale_price?.toLocaleString()}원</p>
                    </div>
                </div>
            </div>
            <hr />
            <div style={wrapStyle}>
                <h4 style={tagStyle}>구매자 정보</h4>
                <div style={infoStyle}>
                    <h6>{user.nickname}</h6>
                    <h6>{user.email}</h6>
                    <h6>{user.phone}</h6>
                </div>
            </div>
            <hr />
            <div style={wrapStyle}>
                <h5 style={tagStyle}>보유 마일리지 {user.mileage?.toLocaleString()}</h5>
                <Form.Group style={formStyle}>
                    <Form.Label>마일리지 사용</Form.Label>
                    <Form.Control
                        value={mileage}
                        style={{ width: 300 }}
                        onChange={(e) => handleMileage(e)}
                        size="lg"
                        type="text"
                        placeholder="0"
                    />
                    <Button
                        onClick={() => {
                            setMileage(Math.min(product.sale_price, user.mileage));
                            setReady(true);
                        }}
                    >
                        전액 사용
                    </Button>
                </Form.Group>
                <br />
                {!ready && <p>마일리지 사용량이 적절한 값이 아니거나 상품 가격 또는 보유 마일리지를 초과합니다.</p>}
            </div>
            <hr />
            <div style={wrapStyle}>
                <h5 style={tagStyle}>주문 내역</h5>
                <table style={{ width: '100%' }}>
                    <tr>
                        <td>상품 가격</td>
                        <td>{product.sale_price?.toLocaleString()}원</td>
                    </tr>
                    <tr>
                        <td>마일리지 사용</td>
                        <td>{mileage?.toLocaleString()}원</td>
                    </tr>
                    <tr>
                        <th>결제 금액</th>
                        <th>{spending?.toLocaleString()}원</th>
                    </tr>
                </table>
            </div>
            <hr />
            <div style={wrapStyle}>
                <h5 style={tagStyle}>결제 수단</h5>
                <div style={radioStyle}>
                    <Form.Check
                        defaultChecked
                        disabled={mileage === product.sale_price}
                        onChange={() => setMethod('kakao')}
                        name="method"
                        type="radio"
                        label="카카오페이"
                    />
                    <Form.Check
                        name="method"
                        disabled={mileage === product.sale_price}
                        onChange={() => setMethod('toss')}
                        type="radio"
                        label="토스페이먼츠"
                    />
                </div>
            </div>
            <Button style={buttonStyle} onClick={pay} disabled={!ready}>
                {mileage === product.sale_price && '마일리지로'} 결제하기
            </Button>{' '}
            <br />
            {/*<Button style={buttonStyle} disabled={!ready || !spending} onClick={requestKakaoPay}>카카오페이로 결제하기</Button>
		<Button style={buttonStyle} disabled={!ready || !spending} onClick={handleShow}>통합 결제하기</Button>
			<Button style={buttonStyle} disabled={!ready || spending} onClick={() => callback({success:true},false)}>마일리지로 결제하기</Button>*/}
            <Modal show={show}>
                <PaymentToss
                    product={product}
                    user={user}
                    spending={spending}
                    mileage={mileage}
                    callback={callback}
                    handleClose={handleClose}
                />
            </Modal>
        </div>
    );
};

export default Payment;
