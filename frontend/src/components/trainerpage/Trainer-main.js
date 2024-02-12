import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './trainerpage.css';
import { PaginationControl } from 'react-bootstrap-pagination-control';

const TrainerPage = () => {
    const Authorization = 'Bearer' + window.sessionStorage.getItem('accessToken');
    const refreshtoken = window.sessionStorage.getItem('refreshToken');
    const [user, setUser] = useState({});
    const [product, setProduct] = useState({});
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
            headers: { 'Content-Type': 'application/json', Authorization, refreshtoken },
        });
        if (res.status !== 200) {
            alert('로그인을 해주세요.');
            // navigate('/Login');
        }

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
        const res = await fetch(`http://localhost:4000/product/my`);
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
                    throw new Error('결제 정보 실패');
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

    return (
        <div className="mainpage">
            <h1>강사 페이지</h1>
            <button className="registrationButton" onClick={handleLectureRegistration}>
                강의 등록
            </button>
            <div className="lectureListContainer">
                <h2>등록한 강의 목록</h2>
                <productList product={product} />
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
                <uerList user={user} />
                <paymentList payment={payment} />
                <button className="messageButton" onClick={handleMessageButton}>
                    메시지 보내기
                </button>
            </div>
        </div>
    );
};
export default TrainerPage;
