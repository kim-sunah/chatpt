
import React, {useRef, useState} from "react"
import { useNavigate } from "react-router-dom";
import "./Signup.css";
const Signup = () =>{
    const emailref = useRef()
    const passwordref = useRef()
    const Confirmpassword = useRef()
    const Emailauthentication = useRef()
    const Phone = useRef()
    const [Gender , setGender]  = useState("")
    const [errorCode , seterrorCode] = useState()
    const navigate = useNavigate()
    

    const Singupsubmithanlder = (events) =>{
        events.preventDefault()
        console.log(Phone.current.value , Gender)
        fetch("http://localhost:4000/auth/signup", {method :"POST" , headers : {"Content-Type" : "application/json"} , body : JSON.stringify({Email : emailref.current.value, Password : passwordref.current.value ,ConfirmPassword : Confirmpassword.current.value, phone : Phone.current.value, Gender  : Gender , Emailauthentication : Emailauthentication.current.value})})
        .then(res => res.json())
        .then(resData => {if(resData.statusCode !== 201){
            seterrorCode(resData.message)
        }
    else if(resData.statusCode === 201){
        navigate("/Login")
    }})
        .catch(err =>{
            console.log(err)
            // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {status: 500,});
        })

    }

    const emailsubmit = (events) =>{
        events.preventDefault()
        fetch("http://localhost:4000/auth/Email_authentication", {method :"POST" , headers : {"Content-Type" : "application/json"} , body : JSON.stringify({Email : emailref.current.value})})
        .then(res => res.json())
        .then(resData => {console.log(resData)})
        .catch(err =>{
            console.log(err)
            // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {status: 500,});
        })


    }
    return(
        <div className="www-musinsa-com-by">
        <div className="div">
            <div className="main-section">
                <form onSubmit={Singupsubmithanlder}>
                    <div className="form" style={{display:"flex"}}>
                        <input type="email" className="input" placeholder="Email" ref={emailref}/>
                        <button type="button" className="email-button" onClick={emailsubmit} >이메일 인증</button>
                    </div>
                    <div className="form-2">
                        <input className="input" placeholder="인증번호" ref={Emailauthentication}/>
                    </div>
                    <div className="form-3">
                        <input className="input" type="password" placeholder="Password" ref={passwordref}/>
                    </div>
                    <div className="form-4">
                        <input className="input" type="password" placeholder="ConfirmPassword" ref={Confirmpassword}/>
                    </div>
                    <div className="form-5">
                        <input className="input" type="text" placeholder="Phone" ref={Phone}/>
                    </div>
                    <div className="Gender">
                    <button type="button" className={Gender === "Male" ? "color-button"  : "Gender-button"} onClick={() => setGender("Male")}>
                       남성
                    </button>
                    <button type="button" className={Gender === "Female" ? "color-button1"  : "Gender-button1"} onClick={() => setGender("Female")}>
                        여성
                       </button>
                    </div>
                    <button className="form-button" type="submit">
                        <div className={errorCode ?  "error" : "text-wrapper-3"}> {errorCode ?   errorCode : "회원가입"}</div>
                    </button>
                    
                </form>
               
                <div className="nav">
                    <div className="link-2">
                        <div className="before-2" />
                        <div className="text-wrapper-8">회원 가입</div>
                        
                    </div>
                    
                </div>
                {errorCode && <h5 className="error"> {errorCode}</h5>}
            </div>
            {errorCode && <h5 className="error"> {errorCode}</h5>}
        </div>
    </div>
    )

}
export default Signup