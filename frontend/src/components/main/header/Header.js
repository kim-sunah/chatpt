
import React, { useEffect, useState } from 'react';
import { AiFillShopping } from "react-icons/ai";
import { AiFillShop } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import "./style.css";
import { Link } from 'react-router-dom';

const Header = () => {
    const [acessToken , setacessToken] = useState()
    useEffect(()=>{
        setacessToken(sessionStorage.getItem("accessToken"))
        
    },[])

    return (
        <header>
            <div className="div-header">
                <div className="navbar">
                    {!acessToken && <Link to = "Login" className="list-item-link-LOGIN">LOGIN</Link>}
                    {acessToken   && <Link to ="" className="list-item-link-LOGIN">LOGOUT</Link>}
                    <div className="overlap">
                        <div className="list-item-link-JOIN">JOIN US</div>
                    
                    </div>
                    <div className="list-item-link-CART">CART</div>
                    <div className="list-item-link">
                        <div className="div">0</div>
                    </div>
                    <div className="list-item-link-ORDER">ORDER</div>
                    <Link to ="mypage" className="list-item-link-MY">MY PAGE</Link>
                    <div className="list-item-2" />
                    <div className="list-item-link-2">BOOKMARK</div>
                    <div className="list-item-3" />
                    <div className="list-item-link-3">NOTICE</div>
                    <div className="list-item-link-EVENT">EVENT</div>
                    <div className="list-item-link-FAQ">FAQ</div>
                    <div className="list-item-link-4">상품문의</div>
                    <div className="list-item-link-5">교환/반품/취소</div>
                    <div className="list-item-link-6">REVIEW</div>
                 
                </div>
             
              

                
            </div>
        </header>
    );

}
export default Header