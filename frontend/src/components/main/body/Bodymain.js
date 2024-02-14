import ss from "../../../img/picture.png"
import logo from "../../../img/Designer.jpeg"
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import { useState, useEffect } from 'react'
import { useNavigate, Link } from "react-router-dom"
import { left } from "@popperjs/core";

const spanStyle = {
    padding: '20px',
    background: '#efefef',
    color: '#000000'
}

const divStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '400px'
}
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
	const [weekBest,setWeekBest] = useState([])
	const [yourBest,setYourBest] = useState([])
	const [category,setCategory] = useState('')
	const [categoryBest,setCategoryBest] = useState([])
	const [ratings,setRatings] = useState([])
	const navigate = useNavigate()

    const turnedOn = true
    const getBest = async () => {
        const res = await fetch('http://localhost:4000/payment/best')
        const weekBest_ = await res.json()
        if (weekBest_.length < 5) {
            const res2 = await fetch('http://localhost:4000/product/latest')
            const latests = await res2.json()
            for (let i = 0; i < latests.length && weekBest_.length < 5; ++i)
                if (!weekBest_.filter(product => product.product_id === latests[i].id).length) weekBest_.push({ product_id: latests[i].id, product_intro: latests[i].intro, product_thumbnail: latests[i].thumbnail, product_name: latests[i].name })
        }
        let yourBest_ = []
        setWeekBest(weekBest_)
        if (turnedOn) {
            const name = localStorage.getItem('name')
            if (name) {
                const res = await fetch(`http://localhost:4000/payment/personalBest?key=${name}`)
                yourBest_ = await res.json()
            }
        }
        for (let i = 0; i < weekBest_.length && yourBest_.length < 5; ++i) {
            if (!yourBest_.filter(product => product.product_id === weekBest_[i].product_id).length) yourBest_.push(weekBest_[i])
        }
        setYourBest(yourBest_)
		try{
			const arr = await Promise.all(weekBest_.map(async product => {
				const res = await fetch(`http://localhost:4000/comment/rating/${product.product_id}`)
				return [product.product_id, (await res.json()).avg]
			}))
			const arr2 = await Promise.all(yourBest_.map(async product => {
				const res = await fetch(`http://localhost:4000/comment/rating/${product.product_id}`)
				return [product.product_id, (await res.json()).avg]
			}))
			const ratings_ = {}
			for(let [id,avg] of arr) ratings_[id] = avg.toFixed(1)
			for(let [id,avg] of arr2) ratings_[id] = avg.toFixed(1)
			setRatings(ratings_)
		}catch(e){
			console.log(e)
		}
    }

    const imgStyle = {
        aspectRatio: '200/400',
        objectFit: 'cover'
    };
	

	useEffect(() => {
		getBest()
	},[])
	
	const getRating = async id => {
		const res = await fetch(`http://localhost:4000/comment/rating/${id}`)
		return (await res.json()).avg
	}

    return (
        <div className="p-6 max-w-screen-xl px-40 mx-40" style={{ margin: "0px auto" }}>

            <Slide>
                {slideImages.map((slideImage, index) => (
                    <div key={index}>
                        <div style={{ ...divStyle, 'backgroundImage': `url(${slideImage.url})` }}>
                        </div>
                    </div>
                ))}
            </Slide>
            <section>
                <h2 className="text-xl font-bold mb-4 mt-5">카테고리별 클래스 모음</h2>
                <div className="flex flex-col sm:flex-row  hide-scrollbar mb-4" >
                    <div className="flex flex-col items-center mr-8">
                        <img onClick={() => navigate('category?category=Posture')} src="https://chatpt-githubaction-s3-bucket.s3.ap-northeast-2.amazonaws.com/images/%EC%9E%90%EC%84%B8%EA%B5%90%EC%A0%95.png" className="relative flex shrink-0 overflow-hidden w-24 h-24 border rounded-full mb-2"></img>
                        <span className="text-lg">자세개선</span>
                    </div>
                    <div className="flex flex-col items-center mr-8">
                        <img onClick={() => navigate('category?category=Yoga')} src="https://chatpt-githubaction-s3-bucket.s3.ap-northeast-2.amazonaws.com/images/%EC%9A%94%EA%B0%80.jpg" className="relative flex shrink-0 overflow-hidden w-24 h-24 border rounded-full mb-2"></img>
                        <span className="text-lg">요가</span>
                    </div>
                    <div className="flex flex-col items-center mr-8">
                        <img onClick={() => navigate('category?category=Pilates')} src="https://chatpt-githubaction-s3-bucket.s3.ap-northeast-2.amazonaws.com/images/%ED%95%84%EB%9D%BC%ED%85%8C%EC%8A%A4.png" className="relative flex shrink-0 overflow-hidden w-24 h-24 border rounded-full mb-2"></img>
                        <span className="text-lg">필라테스</span>
                    </div>
                    <div className="flex flex-col items-center mr-8">
                        <img onClick={() => navigate('category?category=Fitness')} src="https://chatpt-githubaction-s3-bucket.s3.ap-northeast-2.amazonaws.com/images/%ED%97%AC%EC%8A%A4.png" className="relative flex shrink-0 overflow-hidden w-24 h-24 border rounded-full mb-2"></img>
                        <span className="text-lg">헬스</span>
                    </div>
                    <div className="flex flex-col items-center mr-8">
                        <img onClick={() => navigate('category?category=Ballet')} src="https://chatpt-githubaction-s3-bucket.s3.ap-northeast-2.amazonaws.com/images/%EB%B0%9C%EB%A0%88.png" className="relative flex shrink-0 overflow-hidden w-24 h-24 border rounded-full mb-2"></img>
                        <span className="text-lg">발레</span>
                    </div>
                </div>
            </section>
            <h2 className="text-xl font-bold mb-4 mt-5">당신에게 추천하는 강의</h2>
            <div className="max-w-screen-xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-5 gap-8">
                    {yourBest.length > 0 && yourBest.map(product => (
                        <Link to={`product/${product.product_id}`}><div key={product.product_id} className="overflow-hidden">
                            <img
                                src={product.product_thumbnail}
                                alt="Course thumbnail"
                                className="w-full h-36 object-cover"
                                width="240"
                                height="160"
                                style={{ aspectratio: 240 / 160, objectfit: "cover" }}
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold mb-2">{product.product_name}</h3>
                                <p className="text-sm mb-4">{product.product_intro}</p>
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center" style={{ marginLeft: "80%" }}>
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
                                        <span className="text-xs font-semibold ml-1">{ratings[product.product_id]}</span>
                                    </div>
                                </div>
                            </div>
                        </div></Link>


                    ))}
                </div></div>

     
            <main className="bg-white text-black pt-8">
                <h2 className="text-xl font-bold mb-4 mt-5">최근 인기있는 강의</h2>
                <div className="max-w-screen-xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-5 gap-10">
                        {weekBest.length > 0 && weekBest.map(product => (
                            

                            <Link to={`product/${product.product_id}`}><div key={product.product_id} className=" overflow-hidden">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center " >
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
                                            <span className="text-xs font-semibold ml-1">{ratings[product.product_id]}</span>
                                        </div>
                                    </div>

                                <img
                                    src={product.product_thumbnail}
                                    alt="Course thumbnail"
                                    className="w-full h-36 object-cover"
                                    width="240"
                                    height="160"
                                
                                    style={{ aspectratio: 240 / 160, objectfit: "cover" }}
                                />
                                <div className="mt-2">
                                    <h3 className="text-lg font-semibold mb-2">{product.product_name}</h3>
                                    <p className="text-sm mb-4">{product.product_intro}</p>
                                
                                </div>
                            </div></Link>


                        ))}

                    </div>
                </div>
            </main>




        </div>
    )

}
export default Bodymain