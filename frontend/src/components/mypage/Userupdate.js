import logo from "../../img/Designer.jpeg"
import "./Mypage.css"
import { useRef, useState } from "react"

const Userupdate = (props) => {
    
    const [Email, setemail] = useState(() => props.info.email || '')
    const [phone, setphone] = useState(() => props.info.phone || '')
    const [image, setImage] = useState(null);
    const Password = useRef()
    const ConfirmPassword = useRef()
    const description = useRef();

    const onUpload = (e) => {
        const selectedFile = e.target.files[0];
        setImage(selectedFile);
    }

    const updateuserinfo = (event) => {
        event.preventDefault(); // 폼 제출 방지
        const formData = new FormData();
        console.log(image)
        formData.append("image", image)
        // fetch("http://localhost:4000/users/MypageUpdate", { method: "PUT", headers: { "Content-Type": "application/json", "Authorization": "Bearer " + sessionStorage.getItem("accessToken"), "refreshtoken": sessionStorage.getItem("refreshToken") } , body :{Email: Email, phone: phone ,Password : Password.current.value , ConfirmPassword : ConfirmPassword.current.value }}).then(res => res.json()).then(resData =>{}).catch(err => console.log(err))
            fetch("http://localhost:4000/users/update", { method: "POST", headers: {"Authorization": "Bearer " + sessionStorage.getItem("accessToken"), "refreshtoken": sessionStorage.getItem("refreshToken")} , body : formData})
            .then(res => res.json())
            .then(resData =>{})
            .catch(err => console.log(err))

    }

    return (
        <div className="max-w-md mx-auto">
            <div className="flex flex-col gap-4">

                <div className="mt-8">
                    <h2 className="text-lg font-semibold mb-4">내 정보 수정</h2>
                    <form className="flex flex-col gap-4" onSubmit={updateuserinfo}>
                        <div className="flex-shrink-0" style={{ display: "flex", width: "100%", justifyContent: "center" }}>
                            <div className="h-32 w-32 rounded-full bg-gray-300"></div>
                        </div>
                        <div className="filebox" >
                                <label for="file">이미지 업로드</label>
                                <input type="file" id="file" onChange={onUpload}/>
                            </div>
                            
                                <input
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="email"
                                    type="email"
                                    onChange={(e) => setemail(e.target.value)}
                                    defaultValue={props.info.email}
                                />

                                <input
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="phone number"
                                    type="text"
                                    onChange={(e) => setphone(e.target.value)}
                                    defaultValue={props.info.phone}
                                />
                                <input
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="새로운 패스워드"
                                    type="password"
                                    ref={Password}
                                />
                                <input
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="패스워드 확인"
                                    type="password"
                                    ref={ConfirmPassword}
                                />
                            
                                <button type="submit" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                                    수정 완료
                                </button>

                            </form>

                        </div>
                </div>
            </div>
            )

}
            export default Userupdate