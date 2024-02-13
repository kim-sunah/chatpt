import logo from "../../img/Designer.jpeg"
import "./Mypage.css"
import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

const Userupdate = (props) => {
    const navigate = useNavigate()
    const [Email, setemail] = useState(() => props.info.email || '')
  
    const [image, setImage] = useState(null);
    const Password = useRef()
    const ConfirmPassword = useRef()


    const Authentication_number = useRef()

    const [passworderror, setpassworderror] = useState()
    const [Confirmerror, setConfirmerror] = useState()
    const [Authenticationerror, setAuthenticationerror] = useState()


    const onUpload = (e) => {
        const formData = new FormData();
        const selectedFile = e.target.files[0];
        formData.append("image", selectedFile)
        fetch("http://localhost:4000/users/update", { method: "POST", headers: { "Authorization": "Bearer " + sessionStorage.getItem("accessToken"), "refreshtoken": sessionStorage.getItem("refreshToken") }, body: formData })
            .then(res => res.json())
            .then(resData => { })
            .catch(err => console.log(err))
    }

    const updateinfo = (event) => {
        event.preventDefault(); // 폼 제출 방지
        fetch("http://localhost:4000/users/MypageUpdate", { method: "POST", headers: { "Content-Type": "application/json", "Authorization": "Bearer " + sessionStorage.getItem("accessToken"), "refreshtoken": sessionStorage.getItem("refreshToken") }, body: JSON.stringify({ Email: props.info.email, Password: Password.current.value, ConfirmPassword: ConfirmPassword.current.value, Authentication_number : Authentication_number.current.value}) })
            .then(res => res.json())
            .then(resData => {
                console.log(resData)
                if (resData.statusCode === 400) {
                    setpassworderror(resData.message.some(str => str.includes('password')))
                    setConfirmerror(resData.message.some(str => str.includes('Confirm')))
                    setAuthenticationerror(resData.message.some(str => str.includes('Authentication')))
                }
                if (resData.statusCode === 200) {
                    navigate("/")
                }
            })
            .catch(err => console.log(err))

    }

    const emailsubmit = (events) => {
        events.preventDefault()
        fetch("http://localhost:4000/auth/Email_authentication", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ Email: props.info.email }) })
            .then(res => res.json())
            .then(resData => { console.log(resData) })
            .catch(err => {
                console.log(err)
                // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {status: 500,});
            })
    }

    return (
        <div className="max-w-md mx-auto">
            <div className="flex flex-col gap-4" style={{ textAlign: "center" }}>

                <div className="mt-8">
                    <h2 className="text-lg font-semibold mb-4">내 정보 수정</h2>
                    <div className="flex flex-col gap-4" >
                        <div className="flex-shrink-0" style={{ display: "flex", width: "100%", justifyContent: "center" }}>
                            <img src={props.info.imgurl} className="h-32 w-32 rounded-full bg-gray-300"></img>
                        </div>
                        <label for="file">
                            <div class="btn-upload">파일 업로드하기</div>
                        </label>
                        <input type="file" name="file" id="file" onChange={onUpload}></input>
                     
                        <form className="flex flex-col gap-4" onSubmit={updateinfo}>
                            <input
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="email"
                                type="email"
                                onChange={(e) => setemail(e.target.value)}
                                value={props.info.email}
                            />
                            
                            <div className="flex justify-between" >
                                <input
                                    className="flex h-10 w-full rounded-md border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    id="authNumber"
                                    placeholder="인증번호를 입력하세요"
                                    required=""
                                    style={{ border: Authenticationerror === true ? "1px solid red" : "1px solid gray" }}
                                    ref={Authentication_number}
                                />
                                <button onClick={emailsubmit} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 ml-2">
                                    인증번호 발송
                                </button>
                            </div>


                            <input
                                className="flex h-10 w-full rounded-md  border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="새로운 패스워드"
                                type="password"
                                ref={Password}
                                style={{ border: passworderror === true ? "1px solid red" : "1px solid gray" }}
                            />
                            <input
                                className="flex h-10 w-full rounded-md  border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="패스워드 확인"
                                type="password"
                                style={{ border: Confirmerror === true ? "1px solid red" : "1px solid gray" }}
                                ref={ConfirmPassword}
                            />

                            <button type="submit" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                                수정 완료
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default Userupdate