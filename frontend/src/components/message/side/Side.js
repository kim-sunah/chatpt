import React, { useRef, useMemo, useState, useEffect } from 'react';
import openSocket from 'socket.io-client';
import { Link } from "react-router-dom";
const Side = () => {
    // const socket = openSocket('https://iamchatpt.com:4430', { transports: ['websocket'] });
    const [info, setinfo] = useState()
    const [messageList, setMessageList] = useState()
    useEffect(() => {
        fetch("https://iamchatpt.com:4430/users/Mypage", { method: "GET", headers: { "Content-Type": "application/json", "Authorization": "Bearer " + sessionStorage.getItem("accessToken"), "refreshtoken": sessionStorage.getItem("refreshToken") } })
            .then(res => res.json())
            .then(resData => { setinfo(resData.user); })
            .catch(err => console.log(err))

        fetch(`https://iamchatpt.com:4430/message`,
            {
                method: "GET", headers: { "Content-Type": "application/json", "Authorization": "Bearer " + sessionStorage.getItem("accessToken"), "refreshtoken": sessionStorage.getItem("refreshToken") },
            })
            .then(res => res.json())
            .then(resData => {
                setMessageList(resData.messages);
            })
            .catch(err => console.log("err", err))

    }, [])

    return (<aside className="w-80 bg-white p-6">
        <div className="flex items-center justify-between pb-6">
            <h1 className="text-xl font-semibold">Message</h1>
        </div>
        <ul class="space-y-4">
            {messageList && messageList.map(list => (
                <Link to={`/message/${list.queue}`} >
                    <li class="flex items-center justify-between">
                        <div class="flex items-center space-x-3">
                            <span class="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                                <span class="flex h-full w-full items-center justify-center rounded-full bg-muted">
                                    {info.id == list.host_id ? <img src={list.gest_profile_image} /> :
                                        <img src={list.host_profile_image} />}

                                </span>
                            </span>
                            <div>
                                {info.id == list.host_id ? <div class="font-semibold">{list.gest_nickname}</div> : <div class="font-semibold">{list.host_nickname}</div>}
                                <div class="text-sm text-gray-500">{list.created_at.substr(0, 10)}</div>
                            </div>
                        </div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="text-gray-400"
                        >
                        </svg>
                    </li>
                </Link>
            ))
            }
        </ul >
    </aside>)
}

export default Side