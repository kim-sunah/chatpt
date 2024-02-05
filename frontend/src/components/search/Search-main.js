import React, { useState, useEffect } from 'react'
import logo from "../../img/image2.png"
import {useSelector} from "react-redux"

const SearchMain = () => {


	const [selectedValue, setSelectedValue] = useState("Order"); // 초기값 설정
	const [category , setcategory] = useState("Category")
	const [productlist , setproductlist] = useState("")
	const search = useSelector((state) => state.search.search)

	const handleSelectChange = (event) => {
	  const selectedOption = event.target.value;
	  setSelectedValue(selectedOption)
	
	};

	const handlecategoryChange = (event) => {
		fetch("http://localhost:4000/product/categorysearch", {
			method: "POST",
			headers: {
			  "Content-Type": "application/json", 
			},
			body: JSON.stringify({ name: search ,category : event.target.value , selected : selectedValue })
		  })
			.then(res => res.json())
			.then(resData => {if(resData.statusCode === 200){
			
				setproductlist(resData.result)
			}else{
				setproductlist("")
			}})
			.catch(err => console.log(err));
	
	};
	useEffect(() => {
		fetch("http://localhost:4000/product/search", {
			method: "POST",
			headers: {
			  "Content-Type": "application/json", 
			},
			body: JSON.stringify({name: search})
		  })
			.then(res => res.json())
			.then(resData => {if(resData.statusCode === 200){
				
				setproductlist(resData.result)
			}else{
				setproductlist("")
			}})
			.catch(err => console.log(err));
	}, [search]);

	return (
		<div className="bg-white min-h-screen px-40 mx-5">
			<main className="p-4">
				<h1 className="text-3xl font-bold mb-6">{search} 에 대한 검색 결과</h1>
				<div className="flex gap-4 mb-6">
					<select onChange ={handlecategoryChange} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
						<option value="Category">카테고리</option>
						<option value="Yoga">요가</option>
						<option value="Pilates">필라테스</option>
						<option value="Health">헬스</option>
						<option value="Others">그외.....</option>
					</select>
					<select onChange ={handleSelectChange} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
						<option value="Order">강의명 순</option>
						<option value="Popularity">인기 순</option>
						<option value="강의 기간(짧은 순)">강의 기간(짧은 순)</option>
						<option value="강의기간(긴 순)">강의기간(긴 순)</option>
					</select>
				</div>
				<h2 className="text-2xl font-bold mb-4">검색한 상품</h2>

				<div className="grid grid-cols-4 gap-4">
					{productlist && productlist.map(product=>(
						<div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full" data-v0-t="card">
						<div className="p-6 max-w-md">
							<img
								alt="yoga class"
								className="mb-4 h-48 w-full object-cover"
								height="200"
								src="/placeholder.svg"
								width="200"
								style={{ aspectRatio: '200 / 200', objectFit: 'cover' }}
							/>
							<h3 className="text-xl font-semibold mb-2">{product._source.productname}</h3>
							<p className="text-sm mb-2">{product._source.Instructor}</p>
						
							<p className="text-sm mb-2">기간 : {product._source.start} ~{product._source.end}</p>
							<p className="text-sm mb-2">시간 :  {product._source.startTime} ~ {product._source.endTime}</p>
							<p className="text-lg font-bold">
								{product._sourcesale_price}
								<span className="text-sm line-through">{product._sourceprice}</span>
							</p>
						</div>
					</div>

					))}
					
					
				</div>
			</main>
		</div>
		
	)

}
export default SearchMain