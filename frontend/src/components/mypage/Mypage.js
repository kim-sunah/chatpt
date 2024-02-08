import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../main/header/Header"
import logo from "../../img/Designer.jpeg"
import Allproduct from "./Allproduct"
import Likeproduct from "./Likeproduct"
import Userinfo from "./Userinfo"

import PaymentMy from '../payment/Payment-my'

const Mypage = () => {
    const navigate = useNavigate()
    const [productlist , setproductlist] = useState(true)
    const [like ,setlike] = useState(false)
    const [paymentlist , setPayment] = useState(false)
    const [info , setinfo] = useState(false);

    useEffect(() => {
        if(!sessionStorage.getItem("refreshToken") && !sessionStorage.getItem("acessToken")){
            navigate("/Login")
        }
      
    }, [])

    const productlisthanlder = () =>{
        setproductlist(true)
        setlike(false)
        setPayment(false)
        setinfo(false)

    }
    const likehandler =() =>{
        setproductlist(false)
        setlike(true)
        setPayment(false)
        setinfo(false)

    }
    const Paymentlisthandler = () =>{
        setproductlist(false)
        setlike(false)
        setPayment(true)
        setinfo(false)

    }

    const infohandler = () =>{
        setproductlist(false)
        setlike(false)
        setPayment(false)
        setinfo(true)
        

    }
    return (
        <div className="p-6 min-h-screen px-40 mx-40">
        
            <div className="bg-gray-900 text-white mx-40">
                <div className="max-w-screen-xl mx-auto py-8 px-4">
                    <header className="flex justify-between items-center py-4">
                        <h1 className="text-2xl font-bold">내 학습</h1>
                        <div className="relative">
                            <input
                                className="flex h-10 w-full rounded-md border border-input px-5 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-gray-800 border-none pl-10"
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
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6"
                            >
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.3-4.3"></path>
                            </svg>
                        </div>
                    </header>

                    <div className="flex space-x-4 pb-2">
                        <button onClick ={productlisthanlder}className="hover:border-b-2 border-transparent hover:border-white">
                            모든 강의
                        </button>
                        <button onClick ={likehandler}className="hover: border-b-2 border-transparent hover:border-white">
                            찜하기
                        </button>
                        <button onClick ={Paymentlisthandler} className="hover:border-b-2 border-transparent hover:border-white">
                            결제 목록
                        </button>
                        <button  onClick ={infohandler} className="hover:border-b-2 border-transparent hover:border-white">
                            내 정보
                        </button>
                       
                    </div>

                </div>
                <main className="bg-white text-black pt-10">
                    <div className="max-w-screen-xl mx-auto px-4">
                            {productlist && <Allproduct></Allproduct>}
                            {like && <Likeproduct></Likeproduct>}
                            {info && <Userinfo></Userinfo>}
							{paymentlist && <PaymentMy />}
                    </div>
                   
                </main>
            </div>

        </div>

    )
}
export default Mypage


