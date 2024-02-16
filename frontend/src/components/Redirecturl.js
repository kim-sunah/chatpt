import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Redirecturl = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const code = searchParams.get('code');

  const naverLogin = async () => {
    try {
      const response = await fetch("https://iamchatpt.com:444/auth/naversignup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code })
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const resData = await response.json();
      if (resData.limit === true) {
        navigate("/")
        alert("사용이 제한된 사용자입니다.")
      }
      else if (resData.statusCode === 200) {
        navigate("/")
        sessionStorage.setItem("authority", resData.authority)
        sessionStorage.setItem("accessToken", resData.accessToken)
        sessionStorage.setItem("refreshToken", resData.refreshToken)

      }
      else {
        navigate("/Login")
        alert(resData.message)
      }

      // if (responseData.statusCode === 200) {
      //   const userData = await fetch("https://iamchatpt.com:444/auth/naversignin", {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify({ email: responseData.naveruser.email })
      //   });
      //   if (!userData.ok) {
      //     throw new Error(`HTTP error! Status: ${userData.status}`);
      //   }
      //   const JWTTOKEN = await userData.json();

      //   if(JWTTOKEN.statusCode === 200){
      //     if(JWTTOKEN.limit === true){
      //       return alert("이용이 제한된 이용자입니다.")
      //   }
      //     sessionStorage.setItem("authority" , JWTTOKEN.authority)
      //     sessionStorage.setItem("accessToken", JWTTOKEN.accessToken)
      //     sessionStorage.setItem("refreshToken", JWTTOKEN.refreshToken)
      //     navigate("/")
      //   }
      // }
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    naverLogin();
  }, []);

  return (
    <div className="grid-naver" id='naverIdLogin'></div>
  );
};

export default Redirecturl;
