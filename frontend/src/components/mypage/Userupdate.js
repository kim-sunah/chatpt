import logo from "../../img/Designer.jpeg"
import "./Mypage.css"
import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

const Userupdate = (props) => {
    const navigate = useNavigate()
    const Password = useRef()
    const ConfirmPassword = useRef()
    const [passworderror, setpassworderror] = useState()
    const [Confirmerror, setConfirmerror] = useState()
    const [image, setImage] = useState({})

    const onUpload = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) setImage(selectedFile)
    }
    const updateinfo = (event) => {
        event.preventDefault(); // 폼 제출 방지
        const formData = new FormData();
        formData.append("image", image)
        fetch("iamchatpt.com/users/update", { method: "POST", headers: { "Authorization": "Bearer " + sessionStorage.getItem("accessToken"), "refreshtoken": sessionStorage.getItem("refreshToken") }, body: formData })
            .then(res => res.json())
            .then(resData => { })
            .catch(err => console.log(err))
        fetch("iamchatpt.com/users/MypageUpdate", { method: "POST", headers: { "Content-Type": "application/json", "Authorization": "Bearer " + sessionStorage.getItem("accessToken"), "refreshtoken": sessionStorage.getItem("refreshToken") }, body: JSON.stringify({ Email: props.info.email, Password: Password.current.value, ConfirmPassword: ConfirmPassword.current.value }) })
            .then(res => res.json())
            .then(resData => {
                if (resData.statusCode === 400) {
                    setpassworderror(resData.message.some(str => str.includes('password')))
                    setConfirmerror(resData.message.some(str => str.includes('Confirm')))
                }
                if (resData.statusCode === 200) {
                    navigate("/")
                }
            })
            .catch(err => console.log(err))
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
                        <label htmlFor="file">
                            <div class="btn-upload">파일 업로드하기</div>
                        </label>
                        <input type="file" name="file" id="file" onChange={onUpload}></input>

                        <form className="flex flex-col gap-4" onSubmit={updateinfo}>
                            <input
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="email"
                                type="email"

                                value={props.info.email}
                            />
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