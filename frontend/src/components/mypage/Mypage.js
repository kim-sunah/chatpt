import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../main/header/Header"
import logo from "../../img/Designer.jpeg"
import Allproduct from "./Allproduct"



const Mypage = () => {
    const navigate = useNavigate()
    const [productlist , setproductlist] = useState(true)
    const [like ,setliek] = useState(false)
    const [Paymentlist , sePayment] = useState(false)
    const [info , setinfo] = useState(false);

    // useEffect(() => {
    //     if(!sessionStorage.getItem("refreshToken") && !sessionStorage.getItem("acessToken")){
    //         navigate("/Login")
    //     }
    //     else{
    //         fetch("http://localhost:4000/users/Mypage", {method : "GET" , headers:{"Content-Type" : "application/json", "Authorization" : "Bearer " + sessionStorage.getItem("accessToken"), "refreshtoken" : sessionStorage.getItem("refreshToken")} }).then(res=>res.json()).then(resData=> console.log(resData)).catch(err=>console.log(err))
    //     }

    // }, [])
    return (
        <div>
            <Header></Header>
            <div class="bg-gray-900 text-white mx-40">
                <div class="max-w-screen-xl mx-auto py-8 px-4">
                    <header class="flex justify-between items-center py-4">
                        <h1 class="text-2xl font-bold">내 학습</h1>
                        <div class="relative">
                            <input
                                class="flex h-10 w-full rounded-md border border-input px-5 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-gray-800 border-none pl-10"
                                placeholder="내 강의 검색"
                                type="search"
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
                                class="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6"
                            >
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.3-4.3"></path>
                            </svg>
                        </div>
                    </header>

                    <div class="flex space-x-4 pb-2">
                        <button href="#" class="hover:border-b-2 border-transparent hover:border-white">
                            모든 강의
                        </button>
                       
                        <button href="#" class="hover: border-b-2 border-transparent hover:border-white">
                            찜하기
                        </button>
                        <button href="#" class="hover:border-b-2 border-transparent hover:border-white">
                            결제 목록
                        </button>
                        <button href="#" class="hover:border-b-2 border-transparent hover:border-white">
                            내 정보
                        </button>
                       
                    </div>

                </div>
                <main class="bg-white text-black pt-10">
                    <div class="max-w-screen-xl mx-auto px-4">
                       
                            {productlist && <Allproduct></Allproduct>}
                            {/* <div class="rounded-lg overflow-hidden">
                                <img
                                    src={logo}
                                    alt="Course thumbnail"
                                    class="w-full h-48 object-cover"
                                    width="300"
                                    height="200"
                                    style={{ aspectratio: 300 / 200, objectfit: "cover" }}
                                />
                                <div class="p-4">
                                    <h3 class="text-lg font-semibold mb-2">React 완벽 가이드 with Redux, Next.js...</h3>
                                    <p class="text-sm mb-4">Academind by Maximilian Schwarzmüller</p>
                                    <div class="flex items-center justify-between mb-2">
                                        <div class="flex items-center">
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
                                                class="text-yellow-400 w-4 h-4"
                                            >
                                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                            </svg>
                                            <span class="text-xs font-semibold ml-1">4.5</span>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                      
                    
                    </div>
                </main>
            </div>

        </div>

    )
}
export default Mypage


