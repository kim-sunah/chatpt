import { useSearchParams, useNavigate, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const categoryList = ['Fitness', 'Yoga', 'Pilates', 'Hapkido', 'Taekwondo', 'Posture', 'Stretch', 'Ballet', 'Sports', 'Others']
const ProductCategory = props => {
	const [searchParams] = useSearchParams()
	const navigate = useNavigate()
	const category = searchParams.get('category')
	const [categoryBest,setCategoryBest] = useState([])
	if(categoryList.indexOf(category)===-1){
		alert('잘못된 접근입니다.')
		navigate('/')
	}
	const getCategoryBest = async () => {
		if(category){
			const res = await fetch(`http://localhost:4000/payment/categoryBest?category=${category}`)
			const categoryBest_ = await res.json()
			setCategoryBest(categoryBest_)
			console.log(categoryBest)
		}
	}
	
	useEffect(() => {
		getCategoryBest()
	},[category])
	
	return (
		<div className="max-w-screen-xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-5 gap-8">
				{categoryBest.length>0 && categoryBest.map(product => (
                <Link to = {`../product/${product.product_id}`}><div key ={product.product_id} className="rounded-lg overflow-hidden">
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
                            <div className="flex items-center" style={{marginLeft :"80%"}}>
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
                </div></Link>


            ))}
            </div></div>
	)
}
export default ProductCategory