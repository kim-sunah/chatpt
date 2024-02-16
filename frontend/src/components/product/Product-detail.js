import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import openSocket from 'socket.io-client';

import Button from 'react-bootstrap/Button';
import './style.css';
import logo from '../../img/Designer.jpeg';

import './product.css';
import { Image } from '@chakra-ui/react';

export default function ProductCard(props) {
    const { id } = useParams();
    const navigate = useNavigate();
    const comment = useRef();
    const updatecommnet = useRef();
    const [commentList, setcommentList] = useState();
    const [onestar, setonestar] = useState(false);
    const [twostar, settwostar] = useState(false);
    const [threestar, setthreestar] = useState(false);
    const [fourstar, setfourstar] = useState(false);
    const [fivestar, setfivestar] = useState(false);
    const [starsum, setstarsum] = useState();
    const [wish, setwish] = useState(false);
    const [Review, setReview] = useState(false);
    const [MyReview, setMyReview] = useState();
    const Authorization = 'Bearer ' + window.sessionStorage.getItem('accessToken');
    const refreshtoken = window.sessionStorage.getItem('refreshToken');
    const [products, setProduct] = useState([], 0);
    const [average, setAverage] = useState({});
    const [student, setStudent] = useState([1]);
    const [host, setHost] = useState({});
    const [img, setImg] = useState([]);

    const [trainerImg, setTrainerImg] = useState({});

    useEffect(() => {
        getProduct();
        getAverage();
        getStudent();
        // getTrainerImg();
        // getHost();
    }, []);

    useEffect(() => {
        if (products.user_id) getHost();
        getImg();
    }, [products]);

    useEffect(() => {
        fetch(`http://3.36.1.132:4000/comment/product/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + sessionStorage.getItem('accessToken'),
                refreshtoken: sessionStorage.getItem('refreshToken'),
            },
        })
            .then((res) => res.json())
            .then((resData) => {
                setcommentList(resData);
            })
            .catch((err) => console.log(err));
        if (sessionStorage.getItem('accessToken')) {
            fetch(`http://3.36.1.132:4000/wishlist/product/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + sessionStorage.getItem('accessToken'),
                    refreshtoken: sessionStorage.getItem('refreshToken'),
                },
            })
                .then((res) => res.json())
                .then((resData) => {
                    setwish(resData);
                })
                .catch((err) => {
                    console.log(err);
                });
            fetch(`http://3.36.1.132:4000/comment/my/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + sessionStorage.getItem('accessToken'),
                    refreshtoken: sessionStorage.getItem('refreshToken'),
                },
            })
                .then((res) => res.json())
                .then((resData) => {
                    setMyReview(resData[0][0]);
                })
                .catch((err) => console.log(err));
        }

        const socket = openSocket('http://3.36.1.132:4000', { transports: ['websocket'] });
        socket.on('events', (data) => {
            if (data === 'LIKE') {
                setwish(true);
            } else if (data === 'UNLIKE') {
                setwish(false);
            } else if (data === 'createcomment' || data === 'updatecomment' || data === 'deletecomment')
                fetch(`http://3.36.1.132:4000/comment/product/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + sessionStorage.getItem('accessToken'),
                        refreshtoken: sessionStorage.getItem('refreshToken'),
                    },
                })
                    .then((res) => res.json())
                    .then((resData) => {
                        setcommentList(resData);
                    })
                    .catch((err) => console.log(err));
            fetch(`http://3.36.1.132:4000/comment/my/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + sessionStorage.getItem('accessToken'),
                    refreshtoken: sessionStorage.getItem('refreshToken'),
                },
            })
                .then((res) => res.json())
                .then((resData) => {
                    setMyReview(resData[0][0]);
                })
                .catch((err) => console.log(err));
        });
    }, []);

    const commenthandler = (event) => {
        event.preventDefault();
        if (!starsum || !comment) {
            alert('충족되지 않은 입력란이 존재합니다.');
        } else {
            fetch(`http://3.36.1.132:4000/comment/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + sessionStorage.getItem('accessToken'),
                    refreshtoken: sessionStorage.getItem('refreshToken'),
                },
                body: JSON.stringify({ comment: comment.current.value, rating: starsum }),
            })
                .then((res) => res.json())
                .then((resData) => {
                    if (resData.statusCode !== 200 && resData.message) {
                        alert(resData.message);
                    }
                })
                .catch((err) => console.log(err));
            setonestar(false);
            settwostar(false);
            setthreestar(false);
            setfourstar(false);
            setfivestar(false);
            comment.current.value = '';
        }
    };

    const updatecommenthandler = (event) => {
        event.preventDefault();
        if (!starsum || !updatecommnet) {
            alert('충족되지 않은 입력란이 존재합니다.');
        } else {
            fetch(`http://3.36.1.132:4000/comment/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + sessionStorage.getItem('accessToken'),
                    refreshtoken: sessionStorage.getItem('refreshToken'),
                },
                body: JSON.stringify({ comment: updatecommnet.current.value, rating: starsum }),
            })
                .then((res) => res.json())
                .then((resData) => {
                    if (resData.statusCode !== 200) {
                        alert(resData.message);
                    } else if (resData.statusCode === 200) {
                        window.location.reload();
                        alert('수정이 완료되었습니다.');
                    }
                })
                .catch((err) => console.log(err));
            setonestar(false);
            settwostar(false);
            setthreestar(false);
            setfourstar(false);
            setfivestar(false);
            setstarsum(0);
            updatecommnet.current.value = '';
        }
    };

    const deletecomment = () => {
        fetch(`http://3.36.1.132:4000/comment/${MyReview.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + sessionStorage.getItem('accessToken'),
                refreshtoken: sessionStorage.getItem('refreshToken'),
            },
            body: JSON.stringify({ comment: updatecommnet.current.value, rating: starsum }),
        })
            .then((res) => res.json())
            .then((resData) => {
                console.log(resData);
            })
            .catch((err) => console.log(err));
    };

    const starhandler = (event) => {
        if (event === 'one') {
            setonestar(true);
            settwostar(false);
            setthreestar(false);
            setfourstar(false);
            setfivestar(false);
            setstarsum(1);
        } else if (event === 'two') {
            setonestar(true);
            settwostar(true);
            setthreestar(false);
            setfourstar(false);
            setfivestar(false);
            setstarsum(2);
        } else if (event === 'three') {
            setonestar(true);
            settwostar(true);
            setthreestar(true);
            setfourstar(false);
            setfivestar(false);
            setstarsum(3);
        } else if (event === 'four') {
            setonestar(true);
            settwostar(true);
            setthreestar(true);
            setfourstar(true);
            setfivestar(false);
            setstarsum(4);
        } else if (event === 'five') {
            setonestar(true);
            settwostar(true);
            setthreestar(true);
            setfourstar(true);
            setfivestar(true);
            setstarsum(5);
        }
    };

    const wishListhandler = (event) => {
        event.preventDefault();
        if (!wish) {
            fetch(`http://3.36.1.132:4000/wishlist/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + sessionStorage.getItem('accessToken'),
                    refreshtoken: sessionStorage.getItem('refreshToken'),
                },
            })
                .then((res) => res.json())
                .catch((err) => console.log(err));
        } else if (wish) {
            fetch(`http://3.36.1.132:4000/wishlist/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + sessionStorage.getItem('accessToken'),
                    refreshtoken: sessionStorage.getItem('refreshToken'),
                },
            })
                .then((res) => res.json())
                .catch((err) => console.log(err));
        }
    };

    const AllReviews = (event) => {
        setReview(false);
    };
    const MyReviews = (event) => {
        setReview(true);
    };

    const searchParams = useParams();
    const productId = searchParams.id;
    const getProduct = async () => {
        const res = await fetch(`http://3.36.1.132:4000/product?id=${productId}`, {
            method: 'GET',
            headers: {
                Authorization,
                refreshtoken,
            },
        });

        if (res.status !== 200) return alert('해당 강의가 존재하지 않습니다.');
        setProduct(await res.json());
    };

    const weeklyday = (weekday) => {
        // const arr = [0, 1, 2, 3, 4, 5, 6];
        // const day = arr.filter((day) => weekday?.indexOf(day));
        // return day;

        const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
        const selectedDays = daysOfWeek.filter((day, index) => (weekday ?? []).includes(index.toString()));
        return selectedDays.join(', ');
    };

    const getAverage = async () => {
        const res = await fetch(`http://3.36.1.132:4000/comment/rating/${productId}`, {});
        if (res.status !== 200) return alert('해당 정보를 불러올 수 없습니다.');
        setAverage(await res.json());
    };

    const getStudent = async () => {
        const res = await fetch(`http://3.36.1.132:4000/payment/${productId}`, {});
        if (res.status !== 200) return alert('수강생 인원을 불러올 수 없습니다.');
        setStudent(await res.json());
    };

    // const TrainerId = searchParams.id;
    // const getTrainerImg = async () => {
    //     try {
    //         const res = await fetch(`http://3.36.1.132:4000/users/Hostupdate/${TrainerId}`, {
    //             method: 'GET',
    //             Authorization,
    //             refreshtoken,
    //         });

    //         if (res.status === 200) {
    //             const data = await res.json();
    //             setTrainerImg(data.hostInfo?.profile_image);
    //         } else {
    //             alert('트레이너 이미지를 불러올 수 없습니다.');
    //         }
    //     } catch (error) {
    //         console.error('Error fetching trainer image:', error);
    //         alert('트레이너 이미지를 불러오는 중에 오류가 발생했습니다.');
    //     }
    // };

    const getHost = async () => {
        try {
            const res = await fetch(`http://3.36.1.132:4000/users/HostImg/${products.user_id}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', Authorization, refreshtoken },
            });

            if (res.status !== 200) {
                return alert('트레이너 정보를 가져올 수 없습니다.');
            }

            const hostData = await res.json();
            setHost(hostData);
        } catch (error) {
            console.error('트레이너 정보를 가져오는 중에 오류가 발생했습니다.', error);
        }
    };

    const getImg = async () => {
        try {
            const res = await fetch(`http://3.36.1.132:4000/product/${id}/image/`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', Authorization, refreshtoken },
            });

            if (res.status !== 200) {
                return alert('상품 이미지를 가져올 수 없습니다.');
            }

            const imgData = await res.json();
            console.log(imgData);
            setImg(imgData);
        } catch (error) {
            console.error('상품 이미지 정보를 가져오는 중에 오류가 발생했습니다.', error);
        }
    };
    function ProductCard({ imageSrc, altText, title, category, availability, price, originalPrice }) {
        return (
            <div className="flex flex-col items-center p-4 border">
                <img src={imageSrc} alt={altText} className="mb-4" width="150" height="150" style={{ aspectRatio: "150 / 150", objectFit: "cover" }} />
                <h3 className="mb-2 text-lg font-bold">{title}</h3>
                <p className="mb-2 text-sm">카테고리: {category}</p>
                <p className="mb-2 text-sm">{availability}</p>
                <p className="text-lg font-bold text-red-600">{price}</p>
                <p className="text-sm line-through text-gray-500">{originalPrice}</p>
            </div>
        );
    }
    return (
        <div className="max-w-screen-lg mx-auto">
            <main>
                <section className="my-4">
                    <img src={products.thumbnail} alt="Featured product" className="w-full h-auto" width="1024" height="300" style={{ aspectRatio: "1024 / 300", objectFit: "cover" }} />
                </section>
                <section className="p-4">
                    <h2 className="text-2xl font-bold">{products.name}</h2>
                    <div className="mt-4 mb-4 text-sm space-x-2">
                        <span className="text-gray-500 line-through">₩{products.price}</span>
                        <span className="ml-2 text-lg font-bold text-red-600">₩{products.sale_price}</span>
                        <span className="mt1">
                            <button
                                onClick={() => navigate(`../../payment?id=${id}`)}
                                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-40%"
                            >
                                지금 구매
                            </button>
                        </span>
                        <p className="text-sm text-red-500">
                            {(((products.price - products.sale_price) * 100) / products.price) | 0} % 할인중!
                        </p>

                    </div>

                    <div className="flex space-x-2 mb-4">
                        <div className="inline-flex items-center rounded-full whitespace-nowrap border px-2.5 py-0.5 w-fit text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">{products.category}</div>
                        <div className="inline-flex items-center rounded-full whitespace-nowrap border px-2.5 py-0.5 w-fit text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                            리뷰 평점: {average.avg}
                        </div>
                        <div className="flex items-center space-x-4">
                            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2">
                                {' '}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill={wish ? 'red' : 'white'}
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="w-6 h-6"
                                    onClick={wishListhandler}
                                >
                                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <p className="mb-1">이 강의는 {products.capacity} 명 수강할 수 있어요</p>
                    <p className="mb-1">현재 {student[1
                    ]} 분이 이 강의를 수강신청하셨어요</p>
                    <br />
                    <div className="mb-4">
                        <h3 className="font-bold">강의 기간</h3>
                        <p>{products.start_on} ~ {products.end_on}</p>
                        <p>매주 {weeklyday(products.weekday)}</p>

                        <p>{products.start_at}부터 {products.end_at} 까지 진행되며 이용약관을 확인하시고 여러분들의 자세한 사항들은 관리자에게 채팅을 통하여 문의하여 주시면 됩니다.</p>
                    </div>
                    <div className="mb-4">
                        <h3 className="font-bold">상세설명</h3>
                        <br />
                        {products.body}
                    </div>
                </section>

                <section className="grid grid-cols-3 gap-4 p-4">
                    {img.map((Image) => {
                        console.log(Image)
                        return (
                            <img src={Image.original_url} alt="Yoga class" className="w-full h-auto" width="300" height="300" style={{ aspectRatio: "300 / 300", objectFit: "cover" }} />
                        )
                    })}
                </section>
                <div className="flex justify-center">
                    {products.shorts && (
                        <video className="shorts" width="1000" height="1000" controls>
                            <source src={products.shorts} type="video/mp4" />
                        </video>
                    )}
                </div>
                <div class="col-span-1 md:col-span-3">
                    <div class="mt-8 bg-white p-4 rounded-lg shadow">
                        <div style={{ display: "flex" }}>
                            <h3 class="text-lg font-semibold" onClick={AllReviews}>모든 리뷰&nbsp;&nbsp;/ </h3>
                            <h3 class="text-lg font-semibold" onClick={MyReviews}>&nbsp;&nbsp;내 리뷰</h3>
                        </div>
                        {!Review && <div>
                            {commentList && commentList.map(comment => (
                                <div key={comment.id} className="flex items-center space-x-4 mt-10">
                                    <div class="inline-flex items-center rounded-full whitespace-nowrap border px-2.5 py-0.5 w-fit text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                                        {comment.rating}
                                    </div>
                                    <span className="relative flex shrink-0 overflow-hidden rounded-full w-10 h-10 border">
                                        <img className="aspect-square h-full w-full" alt="profile" src={comment.user.profile_image} />
                                    </span>

                                    <div class="grid gap-1.5">
                                        <div className="flex items-center gap-2">
                                            <div className="font-semibold">{comment.user.nickname}</div>
                                            <div className="text-gray-500 text-xs dark:text-gray-400">{comment.createdAt.split("T")[0]}</div>
                                        </div>
                                        <div>{comment.body}</div>
                                    </div>
                                </div>
                            ))}
                            <form onSubmit={commenthandler} className="mt-4">
                                <textarea
                                    className="flex min-h-[80px] border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full h-24 p-2 border rounded-md"
                                    placeholder="Write your review here..."
                                    ref={comment}
                                ></textarea>
                                <div className="mt-4">
                                    <div className="flex items-center space-x-2" >
                                        <div className="flex items-center space-x-2">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill={onestar ? "black" : "white"}
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="w-6 h-6 "
                                                onClick={() => starhandler("one")}
                                            >
                                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                            </svg>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill={twostar ? "black" : "white"}
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="w-6 h-6 "
                                                onClick={() => starhandler("two")}
                                            >
                                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                            </svg>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill={threestar ? "black" : "white"}
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="w-6 h-6 "
                                                onClick={() => starhandler("three")}
                                            >
                                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                            </svg>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill={fourstar ? "black" : "white"}
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="w-6 h-6"
                                                onClick={() => starhandler("four")}
                                            >
                                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                            </svg>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill={fivestar ? "black" : "white"}
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="w-6 h-6"
                                                onClick={() => starhandler("five")}
                                            >
                                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                            </svg>
                                        </div>
                                        <Button type="submit" variant="outline" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">Submit Review</Button>
                                    </div>

                                </div>
                            </form>
                        </div>}
                        {Review && MyReview && <div>
                            <div class="mt-4 flex items-center space-x-4">
                                <div class="inline-flex items-center rounded-full whitespace-nowrap border px-2.5 py-0.5 w-fit text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                                    4.5
                                </div>
                                <span class="relative flex shrink-0 overflow-hidden rounded-full w-10 h-10 border">
                                    <img src={MyReview.profile_image} class="flex h-full w-full items-center justify-center rounded-full bg-muted">YU</img>
                                </span>
                                <div class="grid gap-1.5">
                                    <div class="flex items-center gap-2">
                                        <div class="font-semibold">asd</div>
                                        <div class="text-gray-500 text-xs dark:text-gray-400">{MyReview.createdAt}</div>
                                    </div>
                                    <div>{MyReview.body}</div>
                                </div>
                            </div>
                            <div class="mt-4">
                                <textarea
                                    class="flex min-h-[80px] border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full h-24 p-2 border rounded-md"
                                    placeholder="Modify your review here..."
                                ></textarea>
                            </div>
                            <div class="mt-4">
                                <div class="flex items-center space-x-2">
                                    <div class="flex items-center space-x-2">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            class="w-6 h-6 fill-primary"
                                        >
                                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                        </svg>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            class="w-6 h-6 fill-primary"
                                        >
                                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                        </svg>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            class="w-6 h-6 fill-primary"
                                        >
                                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                        </svg>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            class="w-6 h-6 fill-muted stroke-muted-foreground"
                                        >
                                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                        </svg>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            class="w-6 h-6 fill-muted stroke-muted-foreground"
                                        >
                                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                        </svg>
                                    </div>
                                    <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                                        Update Review
                                    </button>
                                </div>
                            </div>
                        </div>}
                    </div>
                </div>
            </main>
        </div>
    );
}
