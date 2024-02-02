import React, { useState, useEffect } from 'react'
import logo from "../../img/image2.png"
import {useSelector} from "react-redux"

const SearchMain = () => {


	const [selectedValue, setSelectedValue] = useState("강의명 순"); // 초기값 설정
	const [category , setcategory] = useState("요가")
	const search = useSelector((state) => state.search.search)

	const handleSelectChange = (event) => {
	  const selectedOption = event.target.value;
	  console.log(selectedOption)
	  // 여기에서 selectedValue를 사용하거나 필요한 작업을 수행할 수 있습니다.
	};

	const handlecategoryChange = (event) => {
		const selectedOption = event.target.value;
		console.log(selectedOption)
		// 여기에서 selectedValue를 사용하거나 필요한 작업을 수행할 수 있습니다.
	  };
  

	
	return (
		<div className="bg-white min-h-screen px-40 mx-5">
			<main className="p-4">
				<h1 className="text-3xl font-bold mb-6">{search} 에 대한 검색 결과</h1>
				<div className="flex gap-4 mb-6">
					<select onChange ={handlecategoryChange} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
						<option value="요가">요가</option>
						<option value="필라테스">필라테스</option>
						<option value="헬스">헬스</option>
					</select>

					<select onChange ={handleSelectChange} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
						<option value="강의명 순">강의명 순</option>
						<option value="인기 순">인기 순</option>
						<option value="강의 기간(짧은 순)">강의 기간(짧은 순)</option>
						<option value="강의기간(긴 순)">강의기간(긴 순)</option>
					</select>
				</div>
				<h2 className="text-2xl font-bold mb-4">검색한 상품</h2>
				<div className="grid grid-cols-4 gap-4">
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
							<h3 className="text-xl font-semibold mb-2">제목 (30자 이내)</h3>
							<p className="text-sm mb-2">트레이너 이름</p>
						
							<p className="text-sm mb-2">기간 : 2023-01-01 ~ 2023-06-01</p>
							<p className="text-sm mb-2">시간 : 15:00 ~ 16:00</p>
							<p className="text-lg font-bold">
								₩180,000
								<span className="text-sm line-through">₩360,000</span>
							</p>
						</div>
					</div>
					<div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full" data-v0-t="card">
						<div className="p-6">
							<img
								alt="yoga class"
								className="mb-4 h-48 w-full object-cover"
								height="200"
								src="/placeholder.svg"
								width="200"
								style={{ aspectRatio: '200 / 200', objectFit: 'cover' }}
							/>
							<h3 className="text-xl font-semibold mb-2">제목 (30자 이내)</h3>
							<p className="text-sm mb-2">트레이너 이름</p>
							
							<p className="text-sm mb-2">기간 : 2023-01-01 ~ 2023-06-01</p>
							<p className="text-sm mb-2">시간 : 15:00 ~ 16:00</p>
							<p className="text-lg font-bold">
								₩180,000
								<span className="text-sm line-through">₩360,000</span>
							</p>
						</div>
					</div>
					<div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full" data-v0-t="card">
						<div className="p-6">
							<img
								alt="yoga class"
								className="mb-4 h-48 w-full object-cover"
								height="200"
								src="/placeholder.svg"
								width="200"
								style={{ aspectRatio: '200 / 200', objectFit: 'cover' }}
							/>
							<h3 className="text-xl font-semibold mb-2">제목 (30자 이내)</h3>
							<p className="text-sm mb-2">트레이너 이름</p>
							
							<p className="text-sm mb-2">기간 : 2023-01-01 ~ 2023-06-01</p>
							<p className="text-sm mb-2">시간 : 15:00 ~ 16:00</p>
							<p className="text-lg font-bold">
								₩180,000
								<span className="text-sm line-through">₩360,000</span>
							</p>
						</div>
					</div>
					<div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full" data-v0-t="card">
						<div className="p-6">
							<img
								alt="yoga class"
								className="mb-4 h-48 w-full object-cover"
								height="200"
								src="/placeholder.svg"
								width="200"
								style={{ aspectRatio: '200 / 200', objectFit: 'cover' }}
							/>
							<h3 className="text-xl font-semibold mb-2">제목 (30자 이내)</h3>
							<p className="text-sm mb-2">트레이너 이름</p>
							
							<p className="text-sm mb-2">기간 : 2023-01-01 ~ 2023-06-01</p>
							<p className="text-sm mb-2">시간 : 15:00 ~ 16:00</p>
							<p className="text-lg font-bold">
								₩180,000
								<span className="text-sm line-through">₩360,000</span>
							</p>
						</div>
					</div>
				</div>
			</main>
		</div>
		
	)

}
export default SearchMain