import { useSearchParams, useNavigate, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { PaginationControl } from 'react-bootstrap-pagination-control'

const categoryList = ['Fitness', 'Yoga', 'Pilates', 'Taekwondo', 'Posture', 'Stretch', 'Ballet', 'Sports', 'Others']
const ProductCategory = props => {
	const [searchParams] = useSearchParams()
	const navigate = useNavigate()
	const category = searchParams.get('category')
	if (categoryList.indexOf(category) === -1) {
		alert('잘못된 접근입니다.')
		navigate('/')
	}
	const [categoryBest, setCategoryBest] = useState([])
	const [page, setPage] = useState(1)
	const [count, setCount] = useState(0)
	const [ratings, setRatings] = useState({})

	const getCategoryBest = async () => {
		if (category) {
			const res = await fetch(`https://localhost:4000/payment/categoryBest?category=${category}&page=${page}`)
			const [categoryBest_, count_] = await res.json()
			setCategoryBest(categoryBest_)
			setCount(count_)
		}
	}

	useEffect(() => {
		getCategoryBest()
	}, [category, page])

	useEffect(() => {
		Promise.all(categoryBest.map(async product => {
			const res = await fetch(`https://localhost:4000/comment/rating/${product.id}`)
			return [product.id, (await res.json()).avg]
		}))
			.then(arr => {
				const ratings_ = {}
				for (let [id, avg] of arr) ratings_[id] = avg.toFixed(1)
				setRatings(ratings_)
			})
	}, [categoryBest])

	return (
		<div className="max-w-screen-xl mx-auto px-4 mt-4">
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-5 gap-8">
				{categoryBest.length > 0 && categoryBest.map(product => (
					<Link to={`../product/${product.id}`}><div key={product.id} className="rounded-lg overflow-hidden">
						<img
							src={product.thumbnail}
							alt="Course thumbnail"
							className="w-full h-36 object-cover"
							width="240"
							height="160"
							style={{ aspectratio: 240 / 160, objectfit: "cover" }}
						/>
						<div className="p-4">
							<h3 className="text-lg font-semibold mb-2">{product.name}</h3>
							<p className="text-sm mb-4">{product.intro}</p>
							<p>{product.sale_price?.toLocaleString()}원</p>
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
									<span className="text-xs font-semibold ml-1">{ratings[product.id]}</span>
								</div>
							</div>
						</div>
					</div></Link>


				))}
			</div>
			<PaginationControl page={page} limit={5} total={count} changePage={page => setPage(page)} />
		</div>
	)
}
export default ProductCategory