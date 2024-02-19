
import React, { useRef, useEffect, useState } from "react";

import "./Login.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import KakaoLogin from "react-kakao-login";
import kakao from "../../img/free-icon-kakao-talk-3669973.png"
import kak from "../../img/ss.png"
import naver from "../../img/btnG_아이콘원형.png"
import Google from "../../img/web_light_rd_na@1x.png"
import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";



const kakaoClientId = process.env.REACT_APP_API_KEY
const Login = () => {
    const clientId = '1050893472397-hotgn026mmcjckjh77nfmv7tj47uh4nl.apps.googleusercontent.com'

    const emailref = useRef()
    const passwordref = useRef()
    const navigate = useNavigate()
    const [emailerrormessage, setemailerrormessage] = useState()
    const [passworderrormessage, setpassworderrormessage] = useState()
    const Loginsubmithanlder = (events) => {
        events.preventDefault()
        fetch("iamchatpiamchatpt.com:4430gn-in", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ Email: emailref.current.value, Password: passwordref.current.value }) })
            .then(res => res.json())
            .then(resData => {
                console.log(resData)
                if (resData.statusCode === 200) {
                    if (resData.limit === true) {
                        return alert("이용이 제한된 이용자입니다.")
                    }
                    navigate("/")
                    sessionStorage.setItem("authority", resData.authority)
                    sessionStorage.setItem("accessToken", resData.accessToken)
                    sessionStorage.setItem("refreshToken", resData.refreshToken)
                }
                if (resData.statusCode === 400) {

                    if (resData.message.findIndex(message => message.includes('Email')) !== -1) {
                        setemailerrormessage(resData.message[resData.message.findIndex(message => message.includes('Email'))])
                    }
                    if (resData.message.findIndex(message => message.includes('Email')) === -1) {
                        setemailerrormessage()
                    }
                    if (resData.message.findIndex(message => message.includes('password')) !== -1) {
                        setpassworderrormessage(resData.message[resData.message.findIndex(message => message.includes('password'))])
                    }
                    if (resData.message.findIndex(message => message.includes('password')) === -1) {
                        setpassworderrormessage()
                    }
                }
            })
            .catch(err => {
                console.log(err)
                // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {status: 500,});
            })
    }
    const NaverLogin = () => {
        const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.REACT_APP_NAVER_CLIENT_ID}&state=false&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`;
        window.location.href = NAVER_AUTH_URL;
    };

    const KakaoLogin = () => {
        const KAKAO_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_KAKAO_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}`
        window.location.href = KAKAO_URL
    }

    const GoogleLogin = () => {
        const Google_URL = "https://accounts.google.com/o/oauth2/v2/auth?client_id=1050893472397-hotgn026mmcjckjh77nfmv7tj47uh4nl.apps.googleusercontent.com&redirect_uri=http://3.36.1.132:3000/Login/google&response_type=code&scope=email profile"
        window.location.href = Google_URL
    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="rounded-lg border bg-card text-card-foreground shadow-lg" data-v0-t="card">
                <div className="flex flex-col p-6 space-y-1">
                    <h3 className="whitespace-nowrap tracking-tight text-2xl font-bold">Login</h3>
                    <p className="text-sm text-muted-foreground">Enter your Email and password to login to your account</p>
                </div>
                <div className="p-6">
                    <div className="space-y-4">
                        <form onSubmit={Loginsubmithanlder}>
                            <div className="space-y-2">
                                <label
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    htmlFor="Email"
                                >
                                    Email
                                </label>
                                <input
                                    className="flex h-10 w-full rounded-md  border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    id="Email"
                                    placeholder="m@example.com"
                                    required=""
                                    ref={emailref}
                                    style={{ border: emailerrormessage ? "1px solid red" : "1px solid gray" }}
                                />
                            </div>
                            {emailerrormessage && <p style={{ color: "red", marginTop: "5%" }}>*{emailerrormessage}</p>}
                            <div className="space-y-2">
                                <label
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    htmlFor="password"
                                >
                                    Password
                                </label>
                                <input
                                    className="flex h-10 w-full rounded-md  border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    id="password"
                                    required=""
                                    type="password"
                                    ref={passwordref}
                                    style={{ border: passworderrormessage ? "1px solid red" : "1px solid gray" }}
                                />
                            </div>
                            {passworderrormessage && <p style={{ color: "red", marginTop: "5%" }}> *{passworderrormessage}</p>}

                            <button
                                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-4 py-2 w-full"
                                type="submit"
                                style={{ marginTop: "5%" }}
                            >
                                일반 로그인
                            </button>
                        </form>
                        <div style={{ display: "flex", gap: "10%", justifyContent: "center" }}>
                            <img src={kakao} style={{ width: "50px", height: "50px", cursor: "pointer" }} onClick={KakaoLogin}></img>
                            {/* <img src={naver} style={{ width: "50px", height: "50px" }} onClick={NaverLogin}></img> */}
                            <img src={Google} style={{ width: "50px", height: "50px" }} onClick={GoogleLogin}></img>


                        </div>
                    </div>
                    <div className="mt-4 text-center text-sm">
                        Don't have an account?
                        <Link to="/signup">
                            Sign up
                        </Link>
                    </div>
                    <div className="items-center p-6 flex justify-center">
                        <Link to="/" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full max-w-xs">
                            Back
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Login