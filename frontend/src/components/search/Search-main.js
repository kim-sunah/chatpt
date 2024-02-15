import React, { useState, useEffect } from 'react'
import logo from "../../img/image2.png"
import {useSelector} from "react-redux"
import { Link } from 'react-router-dom';

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
		const selectedcategory = event.target.value
		setcategory(selectedcategory)
		
	};

	useEffect(()=>{
		if(category !== "Category"){
			fetch("http://localhost:4000/product/categorysearch", {
			method: "POST",
			headers: {
			  "Content-Type": "application/json", 
			},
			body: JSON.stringify({ name: search ,category : category , selected : selectedValue })
		  })
			.then(res => res.json())
			.then(resData => {console.log(resData); if(resData.statusCode === 200){
			
				setproductlist(resData.result)
			}else{
				setproductlist("")
			}})
			.catch(err => console.log(err));
		}
		
	},[category,selectedValue])

	const elasticsearch = ()=>{
		
	
	}
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
		<div className="p-6 max-w-screen-xl px-40 mx-40" style={{ margin: "0px auto" }}>
			<main className="p-4">
				<h1 className="text-3xl font-bold mb-6">"{search}" 에 대한 검색 결과</h1>
				<div className="flex gap-4 mb-6">
					<select onChange ={handlecategoryChange} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
						<option value="Category">카테고리</option>
						<option value="Yoga">요가</option>
						<option value="Pilates">필라테스</option>
						<option value="Fitness">헬스</option>
						<option value="Sports">스포츠</option>
						<option value="Stretch">스트레칭</option>
						<option value="Posture">자세교정</option>
						<option value="Taekwondo">태권도</option>
						{/*<option value="Hapkido">합기도</option>*/}
						<option value="Others">그외.....</option>
					</select>
					<select onChange ={handleSelectChange} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
						<option value="Order">강의명 순</option>
						{/* <option value="Popularity">인기 순</option> */}
					</select>
				</div>
				<h2 className="text-2xl font-bold mb-4">검색한 강의</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-5 gap-10 ">
					{productlist && productlist.map(product=>(
					
						<Link to ={`http://localhost:3000/product/${product._source.id}`}><div key = {product._source.id} className="rounded-lg border bg-card text-card-foreground shadow-sm w-full" data-v0-t="card">
						<div className="p-6 max-w-md ">
							<img
								alt="category class"
								className="w-full h-36 object-cover"
								height="200"
								src={product._source.thumbnail}
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
					</div></Link>

					))}
					
					
				</div>
			</main>
		</div>
		
	)

}
export default SearchMain