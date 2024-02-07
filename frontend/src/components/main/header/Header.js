
import React, { useEffect, useState, useRef } from 'react';
import logo from "../../../img/chat_PT_logo.png"
import { BiLogIn } from "react-icons/bi";
import { BiLogOut } from "react-icons/bi";

import { Link ,useNavigate} from 'react-router-dom';
import SearchForm from '../../search/Search-form'
import {useDispatch} from "react-redux"
import { searchActions } from '../../store/search.action';
import { BiSolidCommentDetail } from "react-icons/bi";
import { BiSolidUser } from "react-icons/bi";

const Header = () => {
  const searchref = useRef()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [Token, setToken] = useState(false)
  useEffect(() => {
    if (sessionStorage.getItem("accessToken")) {
      setToken(true)
    }
  })
  const Logouthanlder = () => {
    sessionStorage.removeItem("accessToken")
    sessionStorage.removeItem("refreshToken")
    sessionStorage.removeItem("authority")
    navigate("/")
 
  }

  const searchhandler = (events) => {
    events.preventDefault()
    dispatch(searchActions.search(searchref.current.value))
    navigate("/search")
  }


  return (
    // <div className="bg-white min-h-screen px-40 mx-5">
    <header className="flex items-center justify-between p-4 border-b px-20 mx-40">
      <Link to ="/"><img src={logo} className="text-2xl font-bold" style={{width:"120px", height:"120px"}} ></img></Link>
      <div className="flex items-center space-x-4">
        <form onSubmit={searchhandler}>
          <input
            type="text"
            className="flex h-10 w-full rounded-md border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border p-2"
            placeholder="검색"
            ref={searchref}
          />
        </form>

        <BiSolidCommentDetail size="30"  style={{ color: "black"}}/>

        <Link to ="mypage"><BiSolidUser size="30" style={{ color: "black"  , marginLeft:"10%"}}/></Link>
       
        {sessionStorage.getItem("accessToken") ? <BiLogOut size="30" onClick={Logouthanlder} style={{ color: "black" }}/> :  <Link to="Login" style={{ color: "black" }}><BiLogIn size="30"/> </Link>}


      </div>
    </header>
    
  
  );

}
export default Header