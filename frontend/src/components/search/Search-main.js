import React, { useState, useEffect } from 'react'
import logo from "../../img/image2.png"

const SearchMain = () => {
	return (
		<div className="bg-white min-h-screen px-16 mx-8">
			<header className="flex items-center justify-between p-4 border-b">
				<span className="text-2xl font-bold">logo</span>
				<div className="flex items-center space-x-4">
					<input
						className="flex h-10 w-full rounded-md border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border p-2"
						placeholder="검색"
					/>
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
						className="h-6 w-6"
					>
						<circle cx="8" cy="21" r="1"></circle>
						<circle cx="19" cy="21" r="1"></circle>
						<path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
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
						className="h-6 w-6"
					>
						<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
						<circle cx="12" cy="7" r="4"></circle>
					</svg>
				</div>
			</header>
			<main className="p-4">
				<h1 className="text-3xl font-bold mb-6">‘요가’ 에 대한 검색 결과</h1>
				<div className="flex gap-4 mb-6">
					<select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
						<option value="남양주시내">요가</option>
						<option value="남양주시내">필라테스</option>
						<option value="남양주시내">헬스</option>

					</select>

					<select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
						<option value="남양주시내">강의명 순</option>
						<option value="남양주시내">인기 순</option>
						<option value="남양주시내">강의 기간(짧은 순)</option>
						<option value="남양주시내">강의시간(긴 순)</option>

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
		// <div className="bg-white min-h-screen">
		// 	<header className="flex items-center justify-between p-4 border-b">
		// 		<img src={logo} className="text-2xl font-bold" style={{width:"200px", height :"80px"}}></img>
		// 		<div className="flex items-center space-x-4">
		// 			<input
		// 				className="flex h-10 w-full rounded-md border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border p-2"
		// 				placeholder="검색"
		// 			/>
		// 			<svg
		// 				xmlns="http://www.w3.org/2000/svg"
		// 				width="24"
		// 				height="24"
		// 				viewBox="0 0 24 24"
		// 				fill="none"
		// 				stroke="currentColor"
		// 				stroke-width="2"
		// 				stroke-linecap="round"
		// 				stroke-linejoin="round"
		// 				className="h-6 w-6"
		// 			>
		// 				<circle cx="8" cy="21" r="1"></circle>
		// 				<circle cx="19" cy="21" r="1"></circle>
		// 				<path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
		// 			</svg>
		// 			<svg
		// 				xmlns="http://www.w3.org/2000/svg"
		// 				width="24"
		// 				height="24"
		// 				viewBox="0 0 24 24"
		// 				fill="none"
		// 				stroke="currentColor"
		// 				stroke-width="2"
		// 				stroke-linecap="round"
		// 				stroke-linejoin="round"
		// 				className="h-6 w-6"
		// 			>
		// 				<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
		// 				<circle cx="12" cy="7" r="4"></circle>
		// 			</svg>
		// 		</div>
		// 	</header>
		// 	<main className="p-4">
		// 		<h1 className="text-3xl font-bold mb-6">‘요가’ 에 대한 검색 결과</h1>
		// 		<div className="flex gap-4 mb-6">
		// 			<select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
		// 				<option value="남양주시내">요가</option>
		// 				<option value="남양주시내">필라테스</option>
		// 				<option value="남양주시내">헬스</option>

		// 			</select>

		// 			<select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
		// 				<option value="남양주시내">강의명 순</option>
		// 				<option value="남양주시내">인기 순</option>
		// 				<option value="남양주시내">강의 기간(짧은 순)</option>
		// 				<option value="남양주시내">강의시간(긴 순)</option>

		// 			</select>

		// 		</div>
		// 		<h2 className="text-2xl font-bold mb-4">검색한 상품</h2>
		// 		<div className="grid grid-cols-4 gap-20">
		// 			<div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full" data-v0-t="card">
		// 				<div className="p-6 max-w-md">
		// 					<img
		// 						alt="yoga class"
		// 						className="mb-4 h-48 w-full object-cover"
		// 						height="200"
		// 						src="/placeholder.svg"
		// 						width="200"
		// 						style={{ aspectRatio: '200 / 200', objectFit: 'cover' }}
		// 					/>
		// 					<h3 className="text-xl font-semibold mb-2">제목 (30자 이내)</h3>
		// 					<p className="text-sm mb-2">트레이너 이름</p>

		// 					<p className="text-sm mb-2">기간 : 2023-01-01 ~ 2023-06-01</p>
		// 					<p className="text-sm mb-2">시간 : 15:00 ~ 16:00</p>
		// 					<p className="text-lg font-bold">
		// 						₩180,000
		// 						<span className="text-sm line-through">₩360,000</span>
		// 					</p>
		// 				</div>
		// 			</div>
		// 			<div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full" data-v0-t="card">
		// 				<div className="p-6">
		// 					<img
		// 						alt="yoga class"
		// 						className="mb-4 h-48 w-full object-cover"
		// 						height="200"
		// 						src="/placeholder.svg"
		// 						width="200"
		// 						style={{ aspectRatio: '200 / 200', objectFit: 'cover' }}
		// 					/>
		// 					<h3 className="text-xl font-semibold mb-2">제목 (30자 이내)</h3>
		// 					<p className="text-sm mb-2">트레이너 이름</p>

		// 					<p className="text-sm mb-2">기간 : 2023-01-01 ~ 2023-06-01</p>
		// 					<p className="text-sm mb-2">시간 : 15:00 ~ 16:00</p>
		// 					<p className="text-lg font-bold">
		// 						₩180,000
		// 						<span className="text-sm line-through">₩360,000</span>
		// 					</p>
		// 				</div>
		// 			</div>
		// 			<div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full" data-v0-t="card">
		// 				<div className="p-6">
		// 					<img
		// 						alt="yoga class"
		// 						className="mb-4 h-48 w-full object-cover"
		// 						height="200"
		// 						src="/placeholder.svg"
		// 						width="200"
		// 						style={{ aspectRatio: '200 / 200', objectFit: 'cover' }}
		// 					/>
		// 					<h3 className="text-xl font-semibold mb-2">제목 (30자 이내)</h3>
		// 					<p className="text-sm mb-2">트레이너 이름</p>

		// 					<p className="text-sm mb-2">기간 : 2023-01-01 ~ 2023-06-01</p>
		// 					<p className="text-sm mb-2">시간 : 15:00 ~ 16:00</p>
		// 					<p className="text-lg font-bold">
		// 						₩180,000
		// 						<span className="text-sm line-through">₩360,000</span>
		// 					</p>
		// 				</div>
		// 			</div>
		// 			<div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full" data-v0-t="card">
		// 				<div className="p-6">
		// 					<img
		// 						alt="yoga class"
		// 						className="mb-4 h-48 w-full object-cover"
		// 						height="200"
		// 						src="/placeholder.svg"
		// 						width="200"
		// 						style={{ aspectRatio: '200 / 200', objectFit: 'cover' }}
		// 					/>
		// 					<h3 className="text-xl font-semibold mb-2">제목 (30자 이내)</h3>
		// 					<p className="text-sm mb-2">트레이너 이름</p>
		// 					<p className="text-sm mb-2">기간 : 2023-01-01 ~ 2023-06-01</p>
		// 					<p className="text-sm mb-2">시간 : 15:00 ~ 16:00</p>
		// 					<p className="text-lg font-bold">
		// 						₩180,000
		// 						<span className="text-sm line-through">₩360,000</span>
		// 					</p>
		// 				</div>
		// 			</div>
		// 		</div>
		// 	</main>
		// </div>
	)

}
export default SearchMain