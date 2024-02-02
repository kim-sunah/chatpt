import React, { useEffect } from 'react';

const Payment = props => {
	const Authorization = 'Bearer '+window.sessionStorage.getItem('accessToken')
	const refreshtoken = window.sessionStorage.getItem('refreshToken')
	
  useEffect(() => {
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

	// props에서 product, user 정보는 받는다고 가정
  const requestKakaoPay = async () => {
    const { IMP } = window;
    IMP.init(process.env.REACT_APP_IAMPORT_CODE);
	const res = await fetch("http://localhost:4000/users/Mypage", {method : "GET" , headers:{"Content-Type" : "application/json", Authorization, refreshtoken} })
	if(res.status!==200) return alert('로그인을 해주세요.')
	const {user} = await res.json()
	const res2 = await fetch('http://localhost:4000/product?id=19')
	if(res2.status!==200) return alert('해당 상품이 존재하지 않습니다.')
	const product = await res2.json()

    IMP.request_pay({
      pg: 'TC0ONETIME',
      merchant_uid: new Date().getTime(),
      name: product.name,
      amount: product.sale_price,
      buyer_email: user.email,
      buyer_name: user.nickname
    }, async (rsp) => {
		if(rsp.success){
			const res = await fetch(`http://localhost:4000/payment`,{method:'post',headers:{'Content-Type':'application/json', Authorization, refreshtoken},
			body: JSON.stringify({user_id:user.id,product_id:product.id,mileage:0})})
			console.log(await res.json())
		}else alert('결제에 실패했습니다.')
		console.log(rsp)
      /* try {
        const { data } = await fetch('http://localhost:4000//'+rsp.imp_uid,{method:'post'});
        if (rsp.paid_amount === data.response.amount) {
          alert('결제 성공');
        } else {
          alert('결제 실패');
        }
      } catch (error) {
        console.error('Error while verifying payment:', error);
        alert('결제 실패2');
      } */
    });
  };

  return (
    <div>
      <button onClick={requestKakaoPay}>카카오페이로 결제하기</button>
    </div>
  );
};

export default Payment;