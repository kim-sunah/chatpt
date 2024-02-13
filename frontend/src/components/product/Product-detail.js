import React, { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import openSocket from 'socket.io-client';

import Button from 'react-bootstrap/Button'
import './style.css'
import logo from "../../img/Designer.jpeg"

import "./product.css"


export default function ProductCard(props) {
	const { id } = useParams()
	const navigate = useNavigate()
	const comment = useRef()
	const updatecommnet = useRef()
	const [commentList, setcommentList] = useState()
	const [onestar, setonestar] = useState(false)
	const [twostar, settwostar] = useState(false)
	const [threestar, setthreestar] = useState(false)
	const [fourstar, setfourstar] = useState(false)
	const [fivestar, setfivestar] = useState(false)
	const [starsum, setstarsum] = useState()
	const [wish, setwish] = useState(false);
	const [Review, setReview] = useState(false)
	const [MyReview, setMyReview] = useState()
	

	useEffect(() => {
		fetch(`http://localhost:4000/comment/product/${id}`, { method: "GET", headers: { "Content-Type": "application/json", "Authorization": "Bearer " + sessionStorage.getItem("accessToken"), "refreshtoken": sessionStorage.getItem("refreshToken") } })
			.then(res => res.json())
			.then(resData => { setcommentList(resData) })
			.catch(err => console.log(err))
		if (sessionStorage.getItem("accessToken")) {
			fetch(`http://localhost:4000/wishlist/product/${id}`, { method: "GET", headers: { "Content-Type": "application/json", "Authorization": "Bearer " + sessionStorage.getItem("accessToken"), "refreshtoken": sessionStorage.getItem("refreshToken") } })
				.then(res => res.json())
				.then(resData => { setwish(resData) })
				.catch(err => { console.log(err) })
			fetch(`http://localhost:4000/comment/my/${id}`, { method: "GET", headers: { "Content-Type": "application/json", "Authorization": "Bearer " + sessionStorage.getItem("accessToken"), "refreshtoken": sessionStorage.getItem("refreshToken") } })
				.then(res => res.json())
				.then(resData => { setMyReview(resData[0][0]); console.log(resData[0][0]) })
				.catch(err => console.log(err))
		}


		const socket = openSocket('http://localhost:4000', { transports: ['websocket'] });
		socket.on('events', (data) => {
			if (data === "LIKE") {
				setwish(true)
			}
			else if (data === "UNLIKE") {
				setwish(false)
			}
			else if (data === "createcomment")
				fetch(`http://localhost:4000/comment/product/${id}`, { method: "GET", headers: { "Content-Type": "application/json", "Authorization": "Bearer " + sessionStorage.getItem("accessToken"), "refreshtoken": sessionStorage.getItem("refreshToken") } })
					.then(res => res.json())
					.then(resData => { setcommentList(resData) })
					.catch(err => console.log(err))
		});
	}, [])


	const commenthandler = (event) => {
		event.preventDefault()
		if (!starsum || !comment) {
			alert("충족되지 않은 입력란이 존재합니다.")
		}
		fetch(`http://localhost:4000/comment/${id}`, { method: "POST", headers: { "Content-Type": "application/json", "Authorization": "Bearer " + sessionStorage.getItem("accessToken"), "refreshtoken": sessionStorage.getItem("refreshToken") }, body: JSON.stringify({ comment: comment.current.value, rating: starsum }) })
			.then(res => res.json())
			.then(resData => {
				
				if (resData.statusCode !== 200) {
					alert(resData.message)
				}
			})
			.catch(err => console.log(err))
		setonestar(false)
		settwostar(false)
		setthreestar(false)
		setfourstar(false)
		setfivestar(false)
		comment.current.value = ""
	}

	const updatecommenthandler = (event) => {
		event.preventDefault()
		if (!starsum || !updatecommnet) {
			alert("충족되지 않은 입력란이 존재합니다.")
		}
		fetch(`http://localhost:4000/comment/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json", "Authorization": "Bearer " + sessionStorage.getItem("accessToken"), "refreshtoken": sessionStorage.getItem("refreshToken") }, body: JSON.stringify({ comment: updatecommnet.current.value, rating: starsum }) })
			.then(res => res.json())
			.then(resData => {
				
				if (resData.statusCode !== 200) {
					alert(resData.message)
				}
				else if(resData.statusCode === 200){
					window.location.reload()
					alert("수정이 완료되었습니다.")
				}
			})
			.catch(err => console.log(err))
		setonestar(false)
		settwostar(false)
		setthreestar(false)
		setfourstar(false)
		setfivestar(false)
		setstarsum(0)
		updatecommnet.current.value = ""
	}

	const starhandler = (event) => {
		if (event === "one") {
			setonestar(true)
			settwostar(false)
			setthreestar(false)
			setfourstar(false)
			setfivestar(false)
			setstarsum(1)
		}
		else if (event === "two") {
			setonestar(true)
			settwostar(true)
			setthreestar(false)
			setfourstar(false)
			setfivestar(false)
			setstarsum(2)

		}
		else if (event === "three") {
			setonestar(true)
			settwostar(true)
			setthreestar(true)
			setfourstar(false)
			setfivestar(false)
			setstarsum(3)

		}
		else if (event === "four") {
			setonestar(true)
			settwostar(true)
			setthreestar(true)
			setfourstar(true)
			setfivestar(false)
			setstarsum(4)
		}
		else if (event === "five") {
			setonestar(true)
			settwostar(true)
			setthreestar(true)
			setfourstar(true)
			setfivestar(true)
			setstarsum(5)
		}
	}

	const wishListhandler = (event) => {
		event.preventDefault()
		if (!wish) {
			fetch(`http://localhost:4000/wishlist/${id}`, { method: "POST", headers: { "Content-Type": "application/json", "Authorization": "Bearer " + sessionStorage.getItem("accessToken"), "refreshtoken": sessionStorage.getItem("refreshToken") } })
				.then(res => res.json())
				.catch(err => console.log(err))
		}
		else if (wish) {
			fetch(`http://localhost:4000/wishlist/${id}`, { method: "DELETE", headers: { "Content-Type": "application/json", "Authorization": "Bearer " + sessionStorage.getItem("accessToken"), "refreshtoken": sessionStorage.getItem("refreshToken") } })
				.then(res => res.json())
				.catch(err => console.log(err))
		}

	}

	const AllReviews = (event) => {
		event.preventDefault()
		setReview(false)

	}
	const MyReviews = (event) => {
		event.preventDefault()
		setReview(true)


	}
	return (

		<div className="bg-gray-100 py-10" >
			<div className="container mx-auto px-4">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					<div className="col-span-1 md:col-span-2">
						<h1 className="text-3xl font-bold" >[한정판매] JavaScript 알고리즘 자료구조 마스터클래스</h1>
						<p className="mt-4 text-lg" >
							정렬, 리스트, 트리, 스택을 포함한 12개의 알고리즘과 10개 이상 자료구조를 학습으로 기초를 다진 후 알고리즘
							대비!
						</p>
						<div className="mt-4 flex items-center space-x-2">
							<p>6,591명의 수강생</p>
							<p>(825개의 평가)</p>
							<div className="inline-flex items-center rounded-full whitespace-nowrap border px-2.5 py-0.5 w-fit text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
								4.7
							</div>
						</div>
						<p className="mt-2 text-sm text-gray-600">발행자: Colt Steele, 엘리스 AI 트랙</p>
						<p className="text-sm text-gray-600" >마지막 업데이트: 2023. 8.</p>
						<p className="text-sm text-gray-600" >언어: 한국어</p>
						<div className="mt-8" id="cga77rp3m8w">
							<h2 className="text-xl font-semibold" >배울 내용</h2>
							<ul className="mt-4 space-y-2  grid-cols-1 md:grid-cols-2" >

								<li>*Big O 표기법을 포함한 알고리즘을 평가하는 방법을 학습</li>
								<li>*정렬 알고리즘(버블, 선택, 삽입, 병합, 퀵소트, 래딕스 등)</li>
								<li>*자료구조(스택, 큐, 리스트, 트리, 트라이, 그래프 등)</li>
								<li>*알고리즘에서 10개 이상의 자료구조를 작성</li>
								<li>*재귀(Recursion)</li>
								<li>*다이나믹 프로그래밍, 그리디 알고리즘 등</li>
								<li>*프로그래밍 기초를 강화하는 동시에 문제해결 능력 향상</li>
							</ul>
						</div>
					</div>
					<div className="col-span-1 md:col-span-1">
						<div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full" data-v0-t="card">
							<div className="flex justify-center p-4">
								<img
									alt="Course Preview"
									className="rounded-lg"
									height="200"
									src={logo}
									width="200"
									style={{ aspectratio: 200 / 200, objectfit: "cover" }}
								/>
							</div>
						</div>
						<div className="mt-8 bg-white p-4 rounded-lg shadow">
							<div className="flex justify-between items-center">
								<div>
									<p className="text-2xl font-semibold">₩15,000</p>
									<p className="text-sm text-gray-500 line-through">₩99,000</p>
									<p className="text-sm text-red-500">85% 할인</p>
								</div>
								<div className="flex items-center space-x-4">
									<button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2">										<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill={wish ? "red" : "white"}
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

							<div className="mt-4">
								<button onClick={() => navigate(`../../payment?id=${id}`)} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full">
									지금 구매
								</button>
							</div>
							<div className="mt-8">
								<h3 className="text-lg font-semibold">이 강의는 다음을 포함합니다</h3>
								<ul className="mt-4 space-y-2 text-sm">
									<li>215시간 수업을 통한</li>
									<li>84개의 글과 동영상</li>
									<li>2개의 글과 함께</li>
									<li>80개의 다운로드 가능 리소스</li>
									<li>평생 접근 권한 및 업데이트</li>
									<li>공유 가능한 인증서</li>
									<li>수료증</li>
									<li>모바일 및 TV 접근</li>
									<li>한국어 지원</li>
								</ul>
							</div>
						</div>
					</div>


					<div className="col-span-1 md:col-span-3">
						<div className="mt-8 bg-white p-4 rounded-lg shadow">
							<div style={{ display: "flex" }}>
								<h3 className="text-lg font-semibold" onClick={AllReviews}>모든 리뷰&nbsp;&nbsp;/ </h3>
								<h3 className="text-lg font-semibold" onClick={MyReviews}>&nbsp;&nbsp;내 리뷰</h3>
							</div>
							{!Review && <div>
								{commentList && commentList.map(comment => (
									<div key={comment.id} className="flex items-center space-x-4 mt-10">
										<div className="inline-flex items-center rounded-full whitespace-nowrap border px-2.5 py-0.5 w-fit text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
											{comment.rating}
										</div>
										<span className="relative flex shrink-0 overflow-hidden rounded-full w-10 h-10 border">
											<img className="aspect-square h-full w-full" alt="profile" src={comment.user.profile_image} />
										</span>

										<div className="grid gap-1.5">
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
								<div className="mt-4 flex items-center space-x-4">
									<div className="inline-flex items-center rounded-full whitespace-nowrap border px-2.5 py-0.5 w-fit text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
										{MyReview.rating}
									</div>
									<span class="relative flex shrink-0 overflow-hidden rounded-full w-10 h-10 border">
										<img src= {MyReview.user.profile_image} className="flex h-full w-full items-center justify-center rounded-full bg-muted"/>
									</span> 
									<div className="grid gap-1.5">
										<div className="flex items-center gap-2">
											<div className="font-semibold">{MyReview.user.nickname}</div>
											<div className="text-gray-500 text-xs dark:text-gray-400">{MyReview.createdAt}</div>
										</div>
										<div>{MyReview.body}</div>
									</div>
								</div>
								<form onSubmit={updatecommenthandler}>
								<div className="mt-4">
									<textarea
										className="flex min-h-[80px] border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full h-24 p-2 border rounded-md"
										placeholder="Modify your review here..."
										ref={updatecommnet}
									></textarea>
								</div>
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
										<button  type ="submit" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
											Update Review
										</button>
										
									</div>
								</div>
								</form>
							</div>}
						</div>
					</div>
				</div>
			</div >
		</div >
	)

}
