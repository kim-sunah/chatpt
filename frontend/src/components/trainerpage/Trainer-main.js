import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PaginationControl } from 'react-bootstrap-pagination-control';
import { Link } from 'react-router-dom';
import './trainerpage.css';

const TrainerPage = () => {
    const Authorization = 'Bearer ' + window.sessionStorage.getItem('accessToken');
    const refreshtoken = window.sessionStorage.getItem('refreshToken');
    const [user, setUser] = useState({});
    const [products, setProduct] = useState([[], 0]);
    const [payment, setPayment] = useState({});
    const [pageCount, setPageCount] = useState(0);
    const [pageNation, setPageNation] = useState(1);

    const navigate = useNavigate();

    useEffect(() => {
        getUser();
        getProduct();
        getPayment();
    }, []);

    const getUser = async () => {
        const res = await fetch('http://localhost:4000/users/Mypage', {
            method: 'GET',
            headers: { Authorization, refreshtoken },
        });
        if (res.status !== 200) return alert('로그인을 해주세요.');
        setUser(await res.json());
        // navigate('/Login');

        // const user_ = (await res.json()).user;
        // const authority = user?.authority;
        // if (user_.authority !== 'Host') {
        //     alert('권한이 없습니다.');
        //     navigate('/');
        // }
        // setUser(user_);
        // }
    };

    const [searchParams] = useSearchParams();
    const getProduct = async () => {
        const id = searchParams.get('id');
        const res = await fetch(`http://localhost:4000/product/my`, {
            method: 'GET',
            headers: {
                Authorization,
                refreshtoken,
            },
        });

        if (res.status !== 200) return alert('해당 강의가 존재하지 않습니다.');
        setProduct(await res.json());
    };

    const getPayment = () => {
        const id = searchParams.get('id');
        return fetch(`http://localhost:4000/payment/${id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', Authorization, refreshtoken },
        })
            .then((res) => {
                if (res.status === 200) {
                    return res.json();
                } else {
                    alert('결제 정보를 가져오는데 실패했습니다.');
                    throw new Error('결제 정보 불러오기 실패');
                }
            })
            .then((data) => {
                setPayment(data);
            })
            .catch((error) => {
                console.error('결제 데이터를 가져오는 중 에러가 발생했습니다:', error);
            });
    };

    const handleLectureRegistration = () => {
        navigate('/product/create');
    };

    const handleMessageButton = () => {
        navigate('/message');
    };

    console.log(user);
    console.log(payment);

    return (
        <div className="mainpage">
            <h1>강사 페이지</h1>
            <button className="registrationButton" onClick={handleLectureRegistration}>
                강의 등록
            </button>
            <div className="lectureListContainer">
                <h2>등록한 강의 목록</h2>
                {products[0]?.map((product) => {
                    return (
                        <Link to={`../product/${product.id}`}>
                            <div key={product.id} className="rounded-lg overflow-hidden">
                                <img
                                    src={product.thumbnail}
                                    alt="Course thumbnail"
                                    className="w-full h-36 object-cover"
                                    width="240"
                                    height="160"
                                    style={{ aspectratio: 240 / 160, objectfit: 'cover' }}
                                />
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                                    <p className="text-sm mb-4">{product.intro}</p>
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center" style={{ marginLeft: '90%' }}>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="text-yellow-400 w-4 h-4"
                                            >
                                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                            </svg>
                                            <span className="text-xs font-semibold ml-1">4.5</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    );
                })}

                <PaginationControl
                    page={pageNation}
                    between={4}
                    total={pageCount}
                    limit={10}
                    changePage={(pages) => {
                        setPageNation(pages);
                    }}
                    ellipsis={1}
                />
            </div>
            <div className="userListContainer">
                <h2>강의를 수강하는 유저 목록</h2>
                {user[0]?.map((user) => {
                    return (
                        <Link to={`../user/${user.id}}`}>
                            <div className="rounded-lg overflow-hidden">
                                <h3>{user.user.nickname}</h3>
                                <div>이름: {user.name}</div>
                                <div>성별: {user.gender}</div>
                                <div>이메일: {user.email}</div>
                                <div>결제일: {new Date(user.payment.createdAt).toLocaleDateString()}</div>
                                <div>결제금액: {user.payment}원</div>
                                <div>결제수단: {user.payment.method}</div>
                            </div>
                        </Link>
                    );
                })}

                <button className="messageButton" onClick={handleMessageButton}>
                    메시지 보내기
                </button>
            </div>
        </div>
    );
};
export default TrainerPage;
