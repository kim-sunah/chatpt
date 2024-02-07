import { useEffect, useState } from "react"
import Userupdate from "./Userupdate"
const Userinfo = () => {
    const [info, setinfo] = useState()
    const [update ,setupdate] = useState(false)
    useEffect(() => {


        fetch("http://localhost:4000/users/Mypage", { method: "GET", headers: { "Content-Type": "application/json", "Authorization": "Bearer " + sessionStorage.getItem("accessToken"), "refreshtoken": sessionStorage.getItem("refreshToken") } }).then(res => res.json()).then(resData => setinfo(resData.user)).catch(err => console.log(err))


    }, [])
    const updatehalder = () =>{
        setupdate(!update)
    }


    return (
        <div>
        {!update &&
        <div className="max-w-2xl mx-auto bg-white p-6">
            {info &&  <div className="flex mt-0">
                    <img src={info.profile_image} className="h-32 w-32 rounded-full bg-gray-300 mt-10 mr-10" />
            
                <div className="ml-4 flex-1 ml-10">
                    <h1 className="text-xl font-bold">내 정보 <button onClick ={updatehalder} style={{fontSize:"10px", color : "blue"}}> 내 정보 수정</button></h1>
                   
                    <div className="mt-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">profile name</span>
                            <span className="text-sm text-gray-600">{info.nickname}</span>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                            <span className="text-sm font-medium text-gray-700">email</span>
                            <span className="text-sm text-gray-600">{info.email}</span>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                            <span className="text-sm font-medium text-gray-700">phone</span>
                            <span className="text-sm text-gray-600">{info.phone}</span>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                            <span className="text-sm font-medium text-gray-700">point</span>
                            <span className="text-sm text-gray-600">{info.mileage}</span>
                        </div>
                    
                    </div>
                </div>
            </div>}
            <div style={{marginTop:"30%"}}>
                <h3 className="text-lg font-bold">수강 완료한 강의 목록</h3>
                <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="bg-gray-200 p-4 rounded-lg">
                        <div className="h-20 bg-gray-300 rounded-md"></div>
                        <h5 className="mt-2 text-sm font-medium">상품명</h5>
                        <p className="text-sm text-gray-600">상품설명</p>
                    </div>
                    <div className="bg-gray-200 p-4 rounded-lg">
                        <div className="h-20 bg-gray-300 rounded-md"></div>
                        <h5 className="mt-2 text-sm font-medium">상품명</h5>
                        <p className="text-sm text-gray-600">상품설명</p>
                    </div>
                </div>
            </div>
        </div>}
        {update && <Userupdate info = {{email : info.email , phone : info.phone }}></Userupdate>}
        </div>
    )

}
export default Userinfo