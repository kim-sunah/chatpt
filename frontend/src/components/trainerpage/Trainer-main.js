import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PaginationControl } from 'react-bootstrap-pagination-control';
import { Link } from 'react-router-dom';
import './trainerpage.css';
import { linkStyles } from './../admin/theme/components/link';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';

const TrainerPage = () => {
    const Authorization = 'Bearer ' + window.sessionStorage.getItem('accessToken');
    const refreshtoken = window.sessionStorage.getItem('refreshToken');
    const [user, setUser] = useState({});
    const [products, setProduct] = useState([[], 0]);
    const [payment, setPayment] = useState({});
    const [pageCount, setPageCount] = useState(0);
    const [pageNation, setPageNation] = useState(1);
    const [product_Id, setProduct_Id] = useState(0);
    const [selectedUser, setSelectedUser] = useState(null);
    const [revenue_Id, setRevenue_Id] = useState({ sum: '0', sum2: '0' });

    const navigate = useNavigate();

    useEffect(() => {
        getUser();
        getProduct();
        // getPayment();
    }, [product_Id, selectedUser]);

    useEffect(() => {
        getPayment();
        getRevenue();
    }, [product_Id]);

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
        if (product_Id === 0) {
            return;
        }
        console.log(product_Id);
        const id = searchParams.get('id');
        return fetch(`http://localhost:4000/payment/${product_Id}`, {
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

    const getRevenue = async () => {
        if (product_Id === 0) {
            return;
        }

        try {
            const res = await fetch(`http://localhost:4000/payment/revenue/${product_Id}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', Authorization, refreshtoken },
            });

            if (res.status === 200) {
                const revenueData = await res.json();
                console.log(revenueData);
                setRevenue_Id(revenueData);
            } else {
                alert('수익 정보를 가져오는데 실패했습니다.');
                throw new Error('수익 정보 불러오기 실패');
            }
        } catch (error) {
            console.error('수익 데이터를 가져오는 중 에러가 발생했습니다:', error);
        }
    };

    const handleLectureRegistration = () => {
        navigate('/product/create');
    };

    // const handleMessageButton = () => {
    //     navigate('/message');
    // };

    const handleSendMessage = (userId) => {
        setSelectedUser(userId);
        navigate(`/message?user=${userId}`);
    };

    const handleEditProduct = (e, productId) => {
        e.preventDefault();
        navigate(`../product/update?id=${productId}`);
    };

    const handleDeleteProduct = async (e, productId) => {
        e.preventDefault();
        if (window.confirm('정말로 이 강의를 삭제하시겠습니까?')) {
            try {
                const res = await fetch(`http://localhost:4000/product/${productId}`, {
                    method: 'DELETE',
                    headers: { Authorization, refreshtoken },
                });

                if (res.status === 200) {
                    alert(`프로덕트 삭제 - ID: ${productId}`);
                    getProduct();
                } else {
                    alert('프로덕트 삭제에 실패했습니다.');
                }
            } catch (error) {
                console.error('프로덕트 삭제 중 에러가 발생했습니다:', error);
            }
        }
    };

    const tableStyle = {};

    return (
        <div className="mainpage">
            <h1>강사 페이지</h1>
            <button className="registrationButton" onClick={handleLectureRegistration}>
                강의 등록
            </button>
            <div className="lectureListContainer">
                <h2>등록한 강의 목록</h2>
                <div className="productGrid">
                    {products[0]?.map((product) => (
                        <Link to={`../product/${product.id}`} key={product.id} className="productItemContainer">
                            <div className="productItem">
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
                                    <div className="flex items-center">
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
                                    <p className="text-sm mb-4">{product.intro}</p>
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex space-x-2">
                                            <button
                                                className="messageButton editButton"
                                                onClick={(e) => handleEditProduct(e, product.id)}
                                            >
                                                수정하기
                                            </button>
                                            <button
                                                className="messageButton deleteButton"
                                                onClick={(e) => handleDeleteProduct(e, product.id)}
                                            >
                                                삭제하기
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
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
                <Form.Select onChange={(e) => setProduct_Id(+e.target.value)} value={product_Id}>
                    {products[0]?.map((product) => (
                        <option key={product.id} value={product.id}>
                            {product.name}
                        </option>
                    ))}
                </Form.Select>
                {product_Id !== 0 && (
                    <>
                        <div className="revenueTotal">
                            <div style={{ fontSize: '11px' }}>
                                <></>
                                <strong>총 매출액:</strong> {parseInt(revenue_Id.sum) + parseInt(revenue_Id.sum2) || 0}
                                원
                            </div>
                        </div>
                        <Table className="responsive-table" style={tableStyle}>
                            <thead>
                                <tr>
                                    <th>이름</th>
                                    <th>이메일</th>
                                    <th>결제일</th>
                                    <th>결제금액</th>
                                    <th>결제수단</th>
                                    <th>마일리지 사용</th>
                                    <th>1:1 대화</th>
                                </tr>
                            </thead>
                        </Table>

                        {payment[0]?.map((payment) => {
                            const user = payment.user;
                            return (
                                <div key={user.id} className="userItem">
                                    <div className="userDetails">
                                        <div>{user.nickname}</div>
                                        <div>{user.email}</div>
                                        <div>{new Date(payment.createdAt).toLocaleDateString()}</div>
                                        <div>{payment.spending}원</div>
                                        <div>{payment.method}</div>
                                        <div>{payment.mileage}포인트</div>
                                        <div style={{ textAlign: 'right' }}>
                                            <button
                                                className="messageButton"
                                                onClick={() => handleSendMessage(user.id)}
                                            >
                                                대화하기
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </>
                )}
            </div>
        </div>
    );
};

export default TrainerPage;
