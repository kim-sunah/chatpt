import { useEffect, useState } from "react"
import openSocket from 'socket.io-client';
const TackList = () => {

    // socket.on('events', (data) => {
    //     if (data === "userban") {
    //         fetch("http://localhost:4000/admin/userlist",
    //             {
    //                 method: "POST",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                     "Authorization": "Bearer " + sessionStorage.getItem("accessToken"),
    //                     "refreshtoken": sessionStorage.getItem("refreshToken")
    //                 },
    //                 body: JSON.stringify({ pages: pages })
    //             }).
    //             then(res => res.json())
    //             .then(resData => {
    //                 setusercount(resData.userCount);
    //                 setuserList(resData.users)
    //             })
    //             .catch(err => console.log(err))
    //     }
    // });

    const [messageList, setMessageList] = useState();
    useEffect(() => {
        fetch("http://localhost:4000/message", { method: "GET", headers: { "Content-Type": "application/json", "Authorization": "Bearer " + sessionStorage.getItem("accessToken"), "refreshtoken": sessionStorage.getItem("refreshToken") } })
            .then(res => res.json())
            .then(resData => {
                setMessageList(resData)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
    return (
        <ul class="space-y-4">
            {messageList && messageList.map(list => (
                <li class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                        <span class="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                            <span class="flex h-full w-full items-center justify-center rounded-full bg-muted">
                                <img src={list.gest.profile_image} />
                            </span>
                        </span>
                        <div>
                            <div class="font-semibold">{list.gest.nickname}</div>
                            <div class="text-sm text-gray-500">{list.gest.updatedAt.substr(0, 10)}</div>
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
            ))}

        </ul>
    )
}

export default TackList