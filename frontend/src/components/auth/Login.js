
import React, { useRef, useEffect } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import KakaoLogin from "react-kakao-login";
import naverButton  from "../../img/naverbutton.png"


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
                    navigate("/")
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
        fetch("http://localhost:4000/auth/kakaosingup",{method : "POST", headers:{"Content-Type" : "application/json"}, body : JSON.stringify({Email : data.profile.kakao_account.email , Nickname : data.profile.kakao_account.profile.nickname})})
        .then(res =>res.json())
        .then(resData=> {
            if(resData.statusCode === 200){
                fetch("http://localhost:4000/auth/kakaosingin",{method : "POST", headers:{"Content-Type" : "application/json"}, body : JSON.stringify({Email : data.profile.kakao_account.email , Nickname : data.profile.kakao_account.profile.nickname})})
                .then(res=>res.json())
                .then(resData=> {
                    sessionStorage.setItem("accessToken", resData.accessToken)
                    sessionStorage.setItem("refreshToken", resData.refreshToken)
                })
                .catch(err=> console.log(err))
            }
        })
        .catch(err=>console.log(err))
        navigate("/")
    }
    const kakaoOnFailure = (error) => {
        console.log(error);
    };
    const NAVER_CLIENT_ID = "iH61UrUrFwmW9V8Qjd0c"; // 발급받은 클라이언트 아이디
    const REDIRECT_URI = "http://localhost:3000/Login/naver"; // Callback URL
    const STATE = "false";
    const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${STATE}&redirect_uri=${REDIRECT_URI}`;
    const NaverLogin = () => {
      window.location.href = NAVER_AUTH_URL;
    };
    return (
        <div className="www-musinsa-com-by">
            <div className="div">
                <div className="main-section">
                    <form onSubmit={Loginsubmithanlder}>
                        <div className="form">
                            <input type="email" className="input" placeholder="아이디" ref={emailref} />
                        </div>
                        <div className="form-2">
                            <input className="input" type="password" placeholder="비밀번호" ref={passwordref} />
                        </div>
                        <button className="form-button1" type="submit">
                            <div className="text-wrapper-3" >로그인</div>
                        </button>
                    </form>
                    <KakaoLogin className="link_button" style={{ width: "92%", border: "1px solid white", padding: "2.5%" }}
                        token={kakaoClientId}
                        onSuccess={kakaoOnSuccess}
                        onFail={kakaoOnFailure}
                    />
                    <img src={naverButton} style={{width:"350px", height: "10%", marginLeft:"3%", cursor :"pointer"}} onClick={NaverLogin}></img>
                

                    <Link to="/signup"><button className="overlap-wrapper">
                        <div className="overlap">
                            <div className="apple"> 회원가입</div>
                        </div>
                    </button></Link>

                    <div className="nav">
                        <div className="link-2">
                            <div className="before-2" />
                            <div className="text-wrapper-8">가입 회원</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Login