
import React, { useEffect, useState ,useRef} from 'react';
import sport from "../../../img/logo.jpeg"
import { BiLogIn } from "react-icons/bi";

import { Link } from 'react-router-dom';
import SearchForm from '../../search/Search-form'

const Header = () => {
    const searchref = useRef()
    const [Token , setToken] = useState(false)
    useEffect(()=>{
        if(sessionStorage.getItem("accessToken")){
            setToken(true)
        }
    })
    const Logouthanlder = () =>{
        sessionStorage.removeItem("accessToken")
        sessionStorage.removeItem("refreshToken")
        sessionStorage.removeItem("authority")
        window.location.reload()
    }

    const searchhandler = (events) =>{
        events.preventDefault()
        fetch("http://localhost:4000/product/search", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",  // 이 부분을 확인하고 수정
              },
            body: JSON.stringify({ name: searchref.current.value})
          })
          .then(res => res.json())
          .then(resData => console.log(resData))
          .catch(err => console.log(err));   
        
    }
  

    return (
        <header className="flex items-center justify-between p-4 border-b">
        <span className="text-xl font-bold"><img src={sport} style={{width:"100px" ,height:"80px"}}></img></span>
        <div className="flex space-x-4">
          <div className="border rounded-full flex items-center px-3">
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
              className="w-6 h-6"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
            <form onSubmit={searchhandler}>
                <input  type="text" placeholder="Search" className="ml-2 outline-none"  ref= {searchref}/>
            </form>
            
          </div>
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
            className="w-6 h-6"
          >
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
          </svg>
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
            className="w-6 h-6"
          >
            
            <circle cx="8" cy="21" r="1"></circle>
            <circle cx="19" cy="21" r="1"></circle>
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
          </svg>
          <Link to="Login" style={{color:"black"}}><BiLogIn size="27.5"/></Link>
        </div>
      </header>
        // <header>
        //     <div className="div-header">
        //         <div className="navbar">
        //             {!Token && <Link to="Login" className="list-item-link-LOGIN">LOGIN</Link>}
        //             {Token && <Link to="" className="list-item-link-LOGIN" onClick={Logouthanlder}>LOGOUT</Link>}
                  
        //             <div className="list-item-link-CART">CART</div>
        //             <div className="list-item-link">
        //                 <div className="div">0</div>
        //             </div>
        //             <div className="list-item-link-ORDER">ORDER</div>
        //             <Link to="mypage" className="list-item-link-MY">MY PAGE</Link>
        //             <div className="list-item-2" />
        //             <div className="list-item-link-2">BOOKMARK</div>
        //             <div className="list-item-3" />
        //             {sessionStorage.getItem("authority") === "User" && <Link to="http://localhost:3002/horizon-ui-chakra#/admin/default" className="list-item-link-3">관리자</Link>}
        //             <div className="list-item-link-EVENT">EVENT</div>
        //             <div className="list-item-link-FAQ">FAQ</div>
        //             <Link to='inquiry/general' className="list-item-link-4">상품문의</Link>
        //             <div className="list-item-link-5">교환/반품/취소</div>
        //             <div className="list-item-link-6">REVIEW</div>

        //         </div>
        //         <div className="heading-link" />
		// 		<div className="form-fieldset">
        //             <SearchForm />
        //         </div>
        //         <div className="navbar-2">
        //             <div className="div-df-allmenu-btn">
        //                 <div className="span-df-allmenu-btn" />
        //                 <div className="span-df-allmenu-btn-2" />
        //                 <div className="span-df-allmenu-btn-3" />
        //             </div>
        //             <div className="list-item-link-BEST">BEST 10%</div>
        //             <div className="list-item-link-NEW">NEW 10%</div>
        //             <div className="list-item-link-OUTER">OUTER</div>
        //             <div className="list-item-link-TOP">TOP</div>
        //             <div className="list-item-link-KNIT">KNIT</div>
        //             <div className="list-item-link-PANTS">PANTS</div>
        //             <div className="list-item-link-SKIRT">SKIRT</div>
        //             <div className="list-item-link-DRESS">DRESS</div>
        //             <div className="list-item-link-ACC">ACC</div>
        //             <div className="list-item-link-SHOES">SHOES&amp;BAG</div>
        //             <div className="list-item-link-7">SEASON OFF</div>
        //             <div className="list-item-link-ONLY">ONLY YOU</div>
                 
        //         </div>
        //     </div>
        // </header>
    );

}
export default Header