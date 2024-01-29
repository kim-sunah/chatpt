
import React, { useRef, useEffect } from "react";

import "./Login.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import KakaoLogin from "react-kakao-login";
import naverButton from "../../img/naverbutton.png"
import kak from "../../img/ss.png"
import naver from "../../img/btnD_아이콘원형.png"


const kakaoClientId = process.env.REACT_APP_API_KEY
const Login = () => {
    const emailref = useRef()
    const passwordref = useRef()
    const navigate = useNavigate()
    const Loginsubmithanlder = (events) => {
        events.preventDefault()

        fetch("http://localhost:4000/auth/sign-in", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ Email: emailref.current.value, Password: passwordref.current.value }) })
            .then(res => res.json())
            .then(resData => {
                console.log(resData); if (resData.statusCode === 200) {
                    if (resData.limit === true) {
                        return alert("이용이 제한된 이용자입니다.")
                    }
                    navigate("/")
                    sessionStorage.setItem("authority", resData.authority)
                    sessionStorage.setItem("accessToken", resData.accessToken)
                    sessionStorage.setItem("refreshToken", resData.refreshToken)
                }
            })
            .catch(err => {
                console.log(err)
                // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {status: 500,});
            })
    }
    const kakaoOnSuccess = async (data) => {
        console.log(data.profile.kakao_account.profile.nickname)
        fetch("http://localhost:4000/auth/kakaosingup", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ Email: data.profile.kakao_account.email, Nickname: data.profile.kakao_account.profile.nickname }) })
            .then(res => res.json())
            .then(resData => {
                if (resData.statusCode === 200) {
                    fetch("http://localhost:4000/auth/kakaosingin", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ Email: data.profile.kakao_account.email, Nickname: data.profile.kakao_account.profile.nickname }) })
                        .then(res => res.json())
                        .then(resData => {
                            console.log(resData)
                            if (resData.limit === true) {
                                return alert("이용이 제한된 이용자입니다.")
                            }
                            sessionStorage.setItem("authority", resData.authority)
                            sessionStorage.setItem("accessToken", resData.accessToken)
                            sessionStorage.setItem("refreshToken", resData.refreshToken)
                        })
                        .catch(err => console.log(err))
                }
            })
            .catch(err => console.log(err))
        navigate("/")

    }
    const kakaoOnFailure = (error) => {
        console.log(error);
    };
    const NAVER_CLIENT_ID = process.env.REACT_APP_NAVER_CLIENT_ID; // 발급받은 클라이언트 아이디
    const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI; // Callback URL
    const STATE = "false";

    const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${STATE}&redirect_uri=${REDIRECT_URI}`;
    const NaverLogin = () => {
        window.location.href = NAVER_AUTH_URL;
    };
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
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                id="Email"
                                placeholder="m@example.com"
                                required=""
                                ref={emailref}
                            />
                        </div>
                        <div className="space-y-2">
                            <label
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                htmlFor="password"
                            >
                                Password
                            </label>
                            <input
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                id="password"
                                required=""
                                type="password"
                                ref={passwordref}
                            />
                        </div>
                        
                        <button
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
                            type="submit"
                            style={{ marginTop: "5%" }}
                        >
                            Login
                        </button>
                        </form>
                        <KakaoLogin  style={{ width: "100%", border: "1px solid black", padding: "2%", right: "3%" , backgroundColor :"yellow"}}
                            token={kakaoClientId}
                            onSuccess={kakaoOnSuccess}
                            onFail={kakaoOnFailure} />
                        
                        <img src={naver} style={{width:"15%", marginLeft:"42.5%"}}  onClick={NaverLogin}></img>
                    </div>
                    <div className="mt-4 text-center text-sm">
                        Don't have an account?
                        <Link to="/signup">
                            Sign up
                        </Link>
                    </div>
                    <div className="items-center p-6 flex justify-center">
                        <Link  to = "/" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full max-w-xs">
                            Back
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Login