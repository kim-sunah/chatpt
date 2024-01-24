
import React, { useEffect, useState } from 'react';
import { AiFillShopping } from "react-icons/ai";
import { AiFillShop } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import "./style.css";
import { Link } from 'react-router-dom';

const Header = () => {
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
  

    return (
        <header>
            <div className="div-header">
                <div className="navbar">
                    {!Token && <Link to="Login" className="list-item-link-LOGIN">LOGIN</Link>}
                    {Token && <Link to="" className="list-item-link-LOGIN" onClick={Logouthanlder}>LOGOUT</Link>}
                  
                    <div className="list-item-link-CART">CART</div>
                    <div className="list-item-link">
                        <div className="div">0</div>
                    </div>
                    <div className="list-item-link-ORDER">ORDER</div>
                    <Link to="mypage" className="list-item-link-MY">MY PAGE</Link>
                    <div className="list-item-2" />
                    <div className="list-item-link-2">BOOKMARK</div>
                    <div className="list-item-3" />
                    {sessionStorage.getItem("authority") === "User" && <Link to="admin/1" className="list-item-link-3">관리자</Link>}
                    <div className="list-item-link-EVENT">EVENT</div>
                    <div className="list-item-link-FAQ">FAQ</div>
                    <div className="list-item-link-4">상품문의</div>
                    <div className="list-item-link-5">교환/반품/취소</div>
                    <div className="list-item-link-6">REVIEW</div>

                </div>
                <div className="heading-link" />
                <div className="form-fieldset">
                    <input></input>
                </div>
                <div className="navbar-2">
                    <div className="div-df-allmenu-btn">
                        <div className="span-df-allmenu-btn" />
                        <div className="span-df-allmenu-btn-2" />
                        <div className="span-df-allmenu-btn-3" />
                    </div>
                    <div className="list-item-link-BEST">BEST 10%</div>
                    <div className="list-item-link-NEW">NEW 10%</div>
                    <div className="list-item-link-OUTER">OUTER</div>
                    <div className="list-item-link-TOP">TOP</div>
                    <div className="list-item-link-KNIT">KNIT</div>
                    <div className="list-item-link-PANTS">PANTS</div>
                    <div className="list-item-link-SKIRT">SKIRT</div>
                    <div className="list-item-link-DRESS">DRESS</div>
                    <div className="list-item-link-ACC">ACC</div>
                    <div className="list-item-link-SHOES">SHOES&amp;BAG</div>
                    <div className="list-item-link-7">SEASON OFF</div>
                    <div className="list-item-link-ONLY">ONLY YOU</div>
                </div>
            </div>
        </header>
    );

}
export default Header