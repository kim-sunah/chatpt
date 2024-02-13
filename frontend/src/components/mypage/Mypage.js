import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Mypage.css"
import Allproduct from "./Allproduct"
import Likeproduct from "./Likeproduct"
import Userinfo from "./Userinfo"
import PaymentMy from '../payment/Payment-my'

const Mypage = () => {
    const navigate = useNavigate()
    const [productlist, setproductlist] = useState(true)
    const [like, setlike] = useState(false)
    const [paymentlist, setPayment] = useState(false)
    const [info, setinfo] = useState(false);



    const productlisthanlder = () => {
        setproductlist(true)
        setlike(false)
        setPayment(false)
        setinfo(false)

    }
    const likehandler = () => {
        setproductlist(false)
        setlike(true)
        setPayment(false)
        setinfo(false)

    }
    const Paymentlisthandler = () => {
        setproductlist(false)
        setlike(false)
        setPayment(true)
        setinfo(false)

    }

    const infohandler = () => {
        setproductlist(false)
        setlike(false)
        setPayment(false)
        setinfo(true)


    }
    return (
        <div class="bg-gray-900 text-white">
            <div class="max-w-screen-xl mx-auto py-8 px-4">
                <header class="flex justify-between items-center py-4">
                    <h1 class="text-2xl font-bold">내 학습</h1>
                  
                </header>
                <nav class="flex flex-col space-y-4  border-white">
                    <div className="flex space-x-4 pb-2">
                        <button onClick={productlisthanlder} className="hover:border-b-2 border-transparent hover:border-white">
                            구매한  강의
                        </button>
                        <button onClick={likehandler} className="hover: border-b-2 border-transparent hover:border-white">
                            찜하기
                        </button>
                        <button onClick={Paymentlisthandler} className="hover:border-b-2 border-transparent hover:border-white">
                            결제 목록
                        </button>
                        <button onClick={infohandler} className="hover:border-b-2 border-transparent hover:border-white">
                            내 정보
                        </button>

                    </div>
                </nav>
            </div>
            <main class="bg-white text-black pt-8">
                <div class="max-w-screen-xl mx-auto px-4">
                    {productlist && <Allproduct></Allproduct>}
                    {like && <Likeproduct></Likeproduct>}
                    {info && <Userinfo></Userinfo>}
                    {paymentlist && <PaymentMy />}
                </div>
            </main>
        </div>
    )
}
export default Mypage


