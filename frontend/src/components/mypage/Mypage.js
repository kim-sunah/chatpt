import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Mypage = () => {
    const navigate = useNavigate()
    useEffect(() =>{
        if(!sessionStorage.getItem("refreshToken") && !sessionStorage.getItem("acessToken")){
            navigate("/Login")
        }
        else{
            fetch("http://localhost:4000/users/Mypage", {method : "GET" , headers:{"Content-Type" : "application/json", "Authorization" : "Bearer " + sessionStorage.getItem("accessToken"), "refreshtoken" : sessionStorage.getItem("refreshToken")} }).then(res=>res.json()).then(resData=> console.log(resData)).catch(err=>console.log(err))
        }

    },[])
    return(
        <h1> asds</h1>
    )
}
export default Mypage 