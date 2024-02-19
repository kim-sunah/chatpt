import ss from '../../../img/picture.png';
import logo from '../../../img/Designer.jpeg';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { left } from '@popperjs/core';

const spanStyle = {
    padding: '20px',
    background: '#efefef',
    color: '#000000',
};

const divStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '400px',
};
const slideImages = [
    {
        url: 'https://chatpt-githubaction-s3-bucket.s3.ap-northeast-2.amazonaws.com/images/%EB%A9%94%EC%9D%B8%ED%99%94%EB%A9%B41.jpg',
    },
    {
        url: 'https://chatpt-githubaction-s3-bucket.s3.ap-northeast-2.amazonaws.com/images/%ED%9C%B4%EC%8B%9D.png',
    },
    {
        url: 'https://chatpt-githubaction-s3-bucket.s3.ap-northeast-2.amazonaws.com/images/123.png',
    },
];
const Bodymain = () => {
    const [weekBest, setWeekBest] = useState([]);
    const [yourBest, setYourBest] = useState([]);
    const [category, setCategory] = useState('');
    const [categoryBest, setCategoryBest] = useState([]);
    const [ratings, setRatings] = useState([]);
    const navigate = useNavigate();

    const turnedOn = true;
    const getBest = async () => {
        const res = await fetch('https://iamchatpt.com:4430/payment/best');
        const weekBest_ = await res.json();
        if (weekBest_.length < 5) {
            const res2 = await fetch('https://iamchatpt.com:4430/product/latest');
            const latests = await res2.json();
            for (let i = 0; i < latests.length && weekBest_.length < 5; ++i)
                if (!weekBest_.filter((product) => product.product_id === latests[i].id).length)
                    weekBest_.push({
                        product_id: latests[i].id,
                        product_intro: latests[i].intro,
                        product_thumbnail: latests[i].thumbnail,
                        product_name: latests[i].name,
						product_sale_price: latests[i].sale_price
                    });
        }
        let yourBest_ = [];
        setWeekBest(weekBest_);
        if (turnedOn) {
            const name = localStorage.getItem('name');
            if (name) {
                const res = await fetch(`https://iamchatpt.com:4430/payment/personalBest?key=${name}`);
                if (res.status === 200) yourBest_ = await res.json();
            }
        }
        for (let i = 0; i < weekBest_.length && yourBest_.length < 5; ++i) {
            if (!yourBest_.filter((product) => product.product_id === weekBest_[i].product_id).length)
                yourBest_.push(weekBest_[i]);
        }
        setYourBest(yourBest_);
        console.log(yourBest_);
        try {
            const arr = await Promise.all(
                weekBest_.map(async (product) => {
                    const res = await fetch(`https://iamchatpt.com:4430/comment/rating/${product.product_id}`);
                    return [product.product_id, (await res.json()).avg];
                })
            );
            const arr2 = await Promise.all(
                yourBest_.map(async (product) => {
                    const res = await fetch(`https://iamchatpt.com:4430/comment/rating/${product.product_id}`);
                    return [product.product_id, (await res.json()).avg];
                })
            );
            const ratings_ = {};
            for (let [id, avg] of arr) ratings_[id] = avg.toFixed(1);
            for (let [id, avg] of arr2) ratings_[id] = avg.toFixed(1);
            setRatings(ratings_);
        } catch (e) {
            console.log(e);
        }
    };

    const imgStyle = {
        aspectRatio: '200/400',
        objectFit: 'cover',
    };

    useEffect(() => {
        getBest();
    }, []);

    const getRating = async (id) => {
        const res = await fetch(`https://iamchatpt.com:4430/comment/rating/${id}`);
        return (await res.json()).avg;
    };
    return (
        <div className="p-6 max-w-screen-xl px-40 mx-40" style={{ margin: '0px auto' }}>
            <Slide>
                {slideImages.map((slideImage, index) => (
                    <div key={index}>
                        <div style={{ ...divStyle, backgroundImage: `url(${slideImage.url})` }}></div>
                    </div>
                ))}
            </Slide>
            <section>
                <h2 className="text-xl font-bold mb-4 mt-5">카테고리별 클래스 모음</h2>
                <div className="flex flex-col sm:flex-row  hide-scrollbar mb-4">
                    <div className="flex flex-col items-center mr-8">
                        <img
                            onClick={() => navigate('category?category=Fitness')}
                            src="https://t3.ftcdn.net/jpg/07/01/02/86/240_F_701028687_VSrowDXMwZC2NaiPzOuCtDhNlJsmJKxt.jpg"
                            className="relative flex shrink-0 overflow-hidden w-24 h-24 border rounded-full mb-2"
                        ></img>
                        <span className="text-lg">헬스</span>
                    </div>
                    <div className="flex flex-col items-center mr-8">
                        <img
                            onClick={() => navigate('category?category=Yoga')}
                            src="https://t4.ftcdn.net/jpg/05/97/88/03/240_F_597880350_uiFlP1K43erEO9eY6LmKU9UeKrUc6i0I.jpg"
                            className="relative flex shrink-0 overflow-hidden w-24 h-24 border rounded-full mb-2"
                        ></img>
                        <span className="text-lg">요가</span>
                    </div>
                    <div className="flex flex-col items-center mr-8">
                        <img
                            onClick={() => navigate('category?category=Pilates')}
                            src="https://t4.ftcdn.net/jpg/03/21/27/41/240_F_321274152_gkyD5mHMQsV1sSEwgVnXye3I7SR4KVWr.jpg"
                            className="relative flex shrink-0 overflow-hidden w-24 h-24 border rounded-full mb-2"
                        ></img>
                        <span className="text-lg">필라테스</span>
                    </div>
                    {/* <div className="flex flex-col items-center mr-8">
                        <img
                            onClick={() => navigate('category?category=Hapkido')}
                            src="https://t4.ftcdn.net/jpg/00/21/55/81/240_F_21558137_ObrgnMLOVnaZqY7UHcuarsg7ECPrUlji.jpg"
                            className="relative flex shrink-0 overflow-hidden w-24 h-24 border rounded-full mb-2"
                        ></img>
                        <span className="text-lg">합기도</span>
                    </div> */}
                    <div className="flex flex-col items-center mr-8">
                        <img
                            onClick={() => navigate('category?category=Taekwondo')}
                            src="https://t3.ftcdn.net/jpg/04/95/82/30/240_F_495823028_LMnd7NLwE5YZBc59JSmvfSkWbjmxse1o.jpg"
                            className="relative flex shrink-0 overflow-hidden w-24 h-24 border rounded-full mb-2"
                        ></img>
                        <span className="text-lg">태권도</span>
                    </div>
                    <div className="flex flex-col items-center mr-8">
                        <img
                            onClick={() => navigate('category?category=Posture')}
                            src="https://cdn-icons-png.flaticon.com/128/5718/5718756.png"
                            className="relative flex shrink-0 overflow-hidden w-24 h-24 border rounded-full mb-2"
                        ></img>
                        <span className="text-lg">자세교정</span>
                    </div>
                    <div className="flex flex-col items-center mr-8">
                        <img
                            onClick={() => navigate('category?category=Stretch')}
                            src="https://t3.ftcdn.net/jpg/05/16/95/10/240_F_516951055_ioVvarRsEoOVqnvp4NQT0OjMCfaLVAzF.jpg"
                            className="relative flex shrink-0 overflow-hidden w-24 h-24 border rounded-full mb-2"
                        ></img>
                        <span className="text-lg">스트레칭</span>
                    </div>
                    <div className="flex flex-col items-center mr-8">
                        <img
                            onClick={() => navigate('category?category=Ballet')}
                            src="https://t4.ftcdn.net/jpg/06/32/30/19/240_F_632301967_HF80Y2LJGslMlfs5Sa6Hd8iBfWNBTSsF.jpg"
                            className="relative flex shrink-0 overflow-hidden w-24 h-24 border rounded-full mb-2"
                        ></img>
                        <span className="text-lg">발레</span>
                    </div>
                    <div className="flex flex-col items-center mr-8">
                        <img
                            onClick={() => navigate('category?category=Sports')}
                            src="https://t3.ftcdn.net/jpg/03/91/21/18/240_F_391211816_NfWaGuFnA6u6L48kNiUf4MqDgIBBg3Du.jpg"
                            className="relative flex shrink-0 overflow-hidden w-24 h-24 border rounded-full mb-2"
                        ></img>
                        <span className="text-lg">스포츠</span>
                    </div>
                    <div className="flex flex-col items-center mr-8">
                        <img
                            onClick={() => navigate('category?category=Others')}
                            src="https://t3.ftcdn.net/jpg/02/05/20/22/240_F_205202232_pT8ejfvEQC5f0DHelBz6hP4bx5PQwMJc.jpg"
                            className="relative flex shrink-0 overflow-hidden w-24 h-24 border rounded-full mb-2"
                        ></img>
                        <span className="text-lg">기타</span>
                    </div>
                </div>
            </section>
            <h2 className="text-xl font-bold mb-4 mt-5">당신에게 추천하는 강의</h2>
            <div className="max-w-screen-xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-5 gap-10">
                    {yourBest.length > 0 &&
                        yourBest.map((product) => (
                            <Link to={`product/${product.product_id}`}>
                                <div key={product.product_id} className="overflow-hidden">
                                    <div className="flex items-center justify-between mb-2">
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
                                            <span className="text-xs font-semibold ml-1">
                                                {ratings[product.product_id]}
                                            </span>
                                        </div>
                                    </div>
                                    <img
                                        src={product.product_thumbnail}
                                        alt="Course thumbnail"
                                        className="w-full h-36 object-cover"
                                        width="240"
                                        height="160"
                                        style={{ aspectratio: 240 / 160, objectfit: 'cover' }}
                                    />
                                    <div className="mt-2">
                                        <h3 className="text-lg font-semibold mb-2">{product.product_name}</h3>
                                        <p className="text-sm mb-4">{product.product_intro}</p>
                                        <p>{product.product_sale_price?.toLocaleString()}원</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                </div>
            </div>

            <main className="bg-white text-black pt-8">
                <h2 className="text-xl font-bold mb-4 mt-5">최근 인기있는 강의</h2>
                <div className="max-w-screen-xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-5 gap-10">
                        {weekBest.length > 0 &&
                            weekBest.map((product) => (
                                <Link to={`product/${product.product_id}`}>
                                    <div key={product.product_id} className=" overflow-hidden">
                                        <div className="flex items-center justify-between mb-2">
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
                                                <span className="text-xs font-semibold ml-1">
                                                    {ratings[product.product_id]}
                                                </span>
                                            </div>
                                        </div>

                                        <img
                                            src={product.product_thumbnail}
                                            alt="Course thumbnail"
                                            className="w-full h-36 object-cover"
                                            width="240"
                                            height="160"
                                            style={{ aspectratio: 240 / 160, objectfit: 'cover' }}
                                        />
                                        <div className="mt-2">
                                            <h3 className="text-lg font-semibold mb-2">{product.product_name}</h3>
                                            <p className="text-sm mb-4">{product.product_intro}</p>
                                            <p>{product.product_sale_price?.toLocaleString()}원</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                    </div>
                </div>
            </main>
        </div>
    );
};
export default Bodymain;
