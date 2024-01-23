import React, { useEffect, useState } from "react";
import "./Main.css";

export const Main = () => {
    const [Client, setClient] = useState()
    const [User, setUser] = useState("")
    useEffect(() => {
        fetch("http://localhost:4000/users/Alluser", { method: "GET", headers: { "Content-Type": "application/json", "Authorization": "Bearer " + sessionStorage.getItem("accessToken"), "refreshtoken": sessionStorage.getItem("refreshToken") } }).then(res => res.json()).then(resData => { setClient(resData.user.userCount); setUser(resData.user.user) }).catch(err => console.log(err))

    }, [])
    return (
        <div className="main">
            <div className="div-container">
                <div className="div-grid">
                    <div className="div-flex-2">
                        <div className="div-2">
                            <div className="text-wrapper-3">Total clients</div>
                            <div className="text-wrapper-4">{Client}</div>
                        </div>
                    </div>
                    <div className="div-flex-3">

                        <div className="div-3">
                            <div className="text-wrapper-5">Total product</div>
                            <div className="text-wrapper-6">0</div>
                        </div>
                    </div>
                    <div className="div-flex-4">
                        <div className="div-4">
                            <div className="text-wrapper-7">New sales</div>
                            <div className="text-wrapper-8">0</div>
                        </div>
                    </div>
                </div>

                <table className="div-w-full">
                    <tr className="header-row">
                        <th scope="col">이름</th>
                        <th scope="col">성별</th>
                        <th scope="col">유저 접속 경로</th>
                        <th scope="col">유저 권한</th>
                        <th scope="col">사용 여부</th>
                    </tr>
                    {User && User.map(user => (
                            <tr key={user.id} className="userlist">
                                <td className="nicknameli">{user.nickname ? user.nickname : "null"}</td>
                                <td>{user.gender ? user.gender : "null"}</td>
                                <td >{user.phone ? user.phone : "null"}</td>
                                <td >{user.createdAt ? user.createdAt : "null"}</td>
                            </tr>
                        ))
                    }


                </table>


            </div>
        </div>
    );
};

export default Main;



