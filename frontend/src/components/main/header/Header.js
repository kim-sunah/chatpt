
import React, { useEffect, useState, useRef } from 'react';
import sport from "../../../img/logo.jpeg"
import { BiLogIn } from "react-icons/bi";

import { Link ,useNavigate} from 'react-router-dom';
import SearchForm from '../../search/Search-form'
import {useDispatch} from "react-redux"
import { searchActions } from '../../store/search.action';

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
    window.location.reload()
  }

  const searchhandler = (events) => {
    events.preventDefault()
    dispatch(searchActions.search(searchref.current.value))
    navigate("/search")
  }


  return (
    // <div className="bg-white min-h-screen px-40 mx-5">
    <header className="flex items-center justify-between p-4 border-b px-20 mx-40">
      <span className="text-2xl font-bold">logo</span>
      <div className="flex items-center space-x-4">
        <form onSubmit={searchhandler}>
          <input
            type="text"
            className="flex h-10 w-full rounded-md border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border p-2"
            placeholder="검색"
            ref={searchref}
          />
        </form>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="2.5 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <circle cx="8" cy="21" r="1"></circle>
          <circle cx="19" cy="21" r="1"></circle>
          <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
        </svg>
        <Link to ="mypage"><svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
          style={{ color: "black" }}
          
        >
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>

        </svg></Link>
        <Link to="Login" style={{ color: "black" }}><BiLogIn size="24" /></Link>
      </div>
    </header>
    
  
  );

}
export default Header