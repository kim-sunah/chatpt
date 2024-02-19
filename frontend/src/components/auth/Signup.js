
import React, { useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";
const Signup = () => {
  const emailref = useRef()
  const passwordref = useRef()
  const Confirmpassword = useRef()
  const Emailauthentication = useRef()
  const Phone = useRef()
  const nickname = useRef()
  const [Gender, setGender] = useState("")
  const [phoneerrormessage, setphoneerrormessage] = useState()
  const [emailerrormessage, setemailerrormessage] = useState()
  const [nicknameerrormessage, setnicknameerrormessage] = useState()
  const [passworderrormessage, setpassworderrormessage] = useState()
  const [Confirmerrormessage, setConfirmerrormessage] = useState()
  const [Authenticationerromessage, setAuthenticationerrormessage] = useState()
  const navigate = useNavigate()

  const Singupsubmithanlder = (events) => {
    events.preventDefault()
    fetch("iamchatpiamchatpt.com:4430gnup", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ Email: emailref.current.value, Password: passwordref.current.value, ConfirmPassword: Confirmpassword.current.value, phone: Phone.current.value, Gender: Gender, Emailauthentication: Emailauthentication.current.value, nickname: nickname.current.value }) })
      .then(res => res.json())
      .then(resData => {
        if (resData.statusCode !== 201) {
          if (resData.message.findIndex(message => message.includes('Email')) !== -1) {
            setemailerrormessage(resData.message[resData.message.findIndex(message => message.includes('Email'))])
          }
          if (resData.message.findIndex(message => message.includes('Email')) === -1) {
            setemailerrormessage()
          }
          if (resData.message.findIndex(message => message.includes('nickname')) !== -1) {
            setnicknameerrormessage(resData.message[resData.message.findIndex(message => message.includes('nickname'))])
          }
          if (resData.message.findIndex(message => message.includes('nickname')) === -1) {
            setnicknameerrormessage()
          }
          if (resData.message.findIndex(message => message.includes('phone')) !== -1) {
            setphoneerrormessage(resData.message[resData.message.findIndex(message => message.includes('phone'))])

          }
          if (resData.message.findIndex(message => message.includes('phone')) === -1) {
            setphoneerrormessage()
          }
          if (resData.message.findIndex(message => message.includes('password')) !== -1) {
            setpassworderrormessage(resData.message[resData.message.findIndex(message => message.includes('password'))])
          }
          if (resData.message.findIndex(message => message.includes('password')) === -1) {
            setpassworderrormessage()
          }
          if (resData.message.findIndex(message => message.includes('Confirm')) !== -1) {
            setConfirmerrormessage(resData.message[resData.message.findIndex(message => message.includes('Confirm'))])

          }
          if (resData.message.findIndex(message => message.includes('Confirm')) === -1) {
            setConfirmerrormessage()
          }
          if (resData.message.findIndex(message => message.includes('Authentication')) !== -1) {
            setAuthenticationerrormessage(resData.message[resData.message.findIndex(message => message.includes('Authentication'))])
          }
          if (resData.message.findIndex(message => message.includes('Authentication')) === -1) {
            setAuthenticationerrormessage()

          }

        }

        else if (resData.statusCode === 201) {
          navigate("/Login")
        }
      })
      .catch(err => {
        console.log(err)
      })
  }


  const emailsubmit = (events) => {
    events.preventDefault()
    fetch("iamchatpiamchatpt.com:4430ail_authentication", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ Email: emailref.current.value }) })
      .then(res => res.json())
      .then(resData => { console.log(resData) })
      .catch(err => {
        console.log(err)
        // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {status: 500,});
      })
  }

  return (

    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="rounded-lg border bg-card text-card-foreground shadow-lg" data-v0-t="card">
        <div className="flex flex-col p-6 space-y-1">
          <h3 className="whitespace-nowrap tracking-tight text-2xl font-bold">회원가입</h3>
          <p className="text-sm text-muted-foreground">계정을 생성하기 위해 아래의 정보를 입력해주세요</p>
        </div>

        <div className="p-6">

          <form className="space-y-4" onSubmit={Singupsubmithanlder}>
            <div className="space-y-2">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="username"
              >
                Email
              </label>
              <input
                className="flex h-10 w-full rounded-md border-red-500 bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="username"
                placeholder="m@example.com"
                required=""
                style={{ border: emailerrormessage ? "1px solid red" : "1px solid gray" }}
                ref={emailref}
              />
              {emailerrormessage && <p style={{ color: "red", marginTop: "5%" }}>*{emailerrormessage}</p>}

            </div>
            <div className="space-y-2">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="authNumber"
              >
                이메일 인증번호
              </label>
              <div className="flex justify-between">
                <input
                  className="flex h-10 w-full rounded-md  border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="authNumber"
                  placeholder="인증번호를 입력하세요"
                  required=""
                  style={{ border: Authenticationerromessage ? "1px solid red" : "1px solid gray" }}
                  ref={Emailauthentication}
                />
                <button onClick={emailsubmit} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 ml-2">
                  인증번호 발송
                </button>
              </div>
              {Authenticationerromessage && <p style={{ color: "red", marginTop: "5%" }}>* {Authenticationerromessage} </p>}
            </div>
            <div className="space-y-2">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="password"
              >
                비밀번호
              </label>
              <input
                type="password"
                className="flex h-10 w-full rounded-md  border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="password"
                style={{ border: passworderrormessage ? "1px solid red" : "1px solid gray" }}
                ref={passwordref}
              />
            </div>
            {passworderrormessage && <p style={{ color: "red", marginTop: "5%" }}> *{passworderrormessage}</p>}
            <div className="space-y-2">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="confirmPassword"
              >
                비밀번호 확인
              </label>
              <input
                type="password"
                className="flex h-10 w-full rounded-md  border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="confirmPassword"
                style={{ border: Confirmerrormessage ? "1px solid red" : "1px solid gray" }}
                ref={Confirmpassword}
              />
            </div>
            {Confirmerrormessage && <p style={{ color: "red", marginTop: "5%" }}>*{Confirmerrormessage}</p>}
            <div className="space-y-2">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="nickname"
              >
                닉네임
              </label>
              <input
                className="flex h-10 w-full rounded-md  border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="phoneNumber"
                placeholder="nickname"
                style={{ border: nicknameerrormessage ? "1px solid red" : "1px solid gray" }}
                ref={nickname}
              />
            </div>
            {nicknameerrormessage && <p style={{ color: "red", marginTop: "5%" }}>*{nicknameerrormessage}</p>}
            <div className="space-y-2">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="phoneNumber"
              >
                폰 번호
              </label>
              <input
                className="flex h-10 w-full rounded-md  border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="phoneNumber"
                placeholder="폰 번호를 입력하세요"
                type="text"
                style={{ border: phoneerrormessage ? "1px solid red" : "1px solid gray" }}
                ref={Phone}
              />
            </div>
            {phoneerrormessage && <p style={{ color: "red", marginTop: "5%" }}> *{phoneerrormessage}</p>}

            <div className="space-y-2">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="gender">
                성별
              </label>
              <div className="flex justify-between">
                <button type="button" onClick={() => setGender("Male")} style={{ backgroundColor: Gender === "Male" ? "black" : " ", color: Gender === "Male" ? "white" : " " }} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-1/2 mr-2">
                  남성
                </button>
                <button type="button" onClick={() => setGender("Female")} style={{ backgroundColor: Gender === "Female" ? "black" : " ", color: Gender === "Female" ? "white" : " " }} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-1/2 ml-2">
                  여성
                </button>
              </div>
            </div>


            <div class="flex flex-col space-y-4">
              <button type="submit" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-green-500 text-white">
                회원가입
              </button>

            </div>
          </form>



          <div className="mt-4 text-center text-sm">
            이미 계정이 있으신가요?
            <Link className="underline" to="/Login">
              로그인
            </Link>
          </div>
        </div>
      </div>
    </div>
  )

}
export default Signup