import React, { useRef, useMemo, useState, useEffect } from 'react';
import openSocket from 'socket.io-client';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
// import SendTalk from "./SendTalk";
import Side from "./side/Side";

const Message = () => {

    const { id } = useParams();
    const sendMessage = useRef();
    const messageTextRef = useRef();
    // // const socket = openSocket('http://localhost:4000', { transports: ['websocket'] });
    // const [messageList, setMessageList] = useState([]);

    const send = (events) => {
        events.preventDefault();

        console.log(sendMessage.current.value)
        fetch(`http://localhost:4000/message/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + sessionStorage.getItem("accessToken"),
                "refreshtoken": sessionStorage.getItem("refreshToken")
            },
            body: JSON.stringify({ message: sendMessage.current.value })
        })
            .catch(err => {
                console.log(err);
            });
    };
    useEffect(() => {
        const socket = openSocket('http://localhost:4000', { transports: ['websocket'] });
        messageTextRef.current.innerHTML = '';
        fetch(`http://localhost:4000/message/${id}`, {
            method: "GET", headers: { "Content-Type": "application/json", "Authorization": "Bearer " + sessionStorage.getItem("accessToken"), "refreshtoken": sessionStorage.getItem("refreshToken") },
        }).then(res => (res.json())
            .then(resData => {
                resData.message.map((message) => {
                    if (message.send_user !== resData.userId) {
                        const newMessageElement = document.createElement('div');
                        newMessageElement.className = "flex items-start space-x-2 p-1";
                        const innerDiv = document.createElement('div');
                        innerDiv.className = "bg-blue-500 text-white p-3 rounded-lg";
                        innerDiv.innerText = message.message;
                        newMessageElement.appendChild(innerDiv);
                        messageTextRef.current.appendChild(newMessageElement);
                        sendMessage.current.value = "";
                    } else {
                        const newMessageElement = document.createElement('div');
                        newMessageElement.className = "flex items-end justify-end space-x-2 p-1";
                        const innerDiv = document.createElement('div');
                        innerDiv.className = "bg-blue-500 text-white p-3 rounded-lg";
                        innerDiv.innerText = message.message;
                        newMessageElement.appendChild(innerDiv);
                        messageTextRef.current.appendChild(newMessageElement);
                    }
                })
            }))
        socket.on('events', (data) => {
            if ('createMessage')
                fetch(`http://localhost:4000/comment/product/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + sessionStorage.getItem('accessToken'),
                        refreshtoken: sessionStorage.getItem('refreshToken'),
                    },
                })
                    .then((res) => res.json())
                    .then((resData) => {
                        console.log(resData)
                    })
                    .catch((err) => console.log(err));
        });
    })

    // useEffect(() => {
    //     fetch("http://localhost:4000/message", {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": "Bearer " + sessionStorage.getItem("accessToken"),
    //             "refreshtoken": sessionStorage.getItem("refreshToken")
    //         }
    //     })
    //         .then(res => res.json())
    //         .then(resData => {
    //             console.log(resData);
    //             setMessageList(resData.list);
    //             setUserId(resData.userId)
    //         })
    //         .catch(err => {
    //             console.log(err)
    //         });

    //     fetch(`http://localhost:4000/message/${id}`, {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": "Bearer " + sessionStorage.getItem("accessToken"),
    //             "refreshtoken": sessionStorage.getItem("refreshToken")
    //         }
    //     })
    //         .then(res => res.json())
    //         .then(resData => {
    //             // Handle response data if needed
    //         })
    //         .catch(err => {
    //             console.log(err)
    //         });

    //     const handleMessage = (data) => {
    //         if (data === "sendMessage") {
    //             fetch(`http://localhost:4000/message/${id}`,
    //                 {
    //                     method: "GET", headers: { "Content-Type": "application/json", "Authorization": "Bearer " + sessionStorage.getItem("accessToken"), "refreshtoken": sessionStorage.getItem("refreshToken") },
    //                 })
    //                 .then(res => res.json())
    //                 .then(resData => {
    //                     if (resData.message.id === id) {
    //                         if (resData.userId.id === userId) {
    //                             const newMessageElement = document.createElement('div');
    //                             newMessageElement.className = "flex items-start space-x-2 p-1";
    //                             const innerDiv = document.createElement('div');
    //                             innerDiv.className = "bg-blue-500 text-white p-3 rounded-lg";
    //                             innerDiv.innerText = resData.message.last_message;
    //                             newMessageElement.appendChild(innerDiv);
    //                             messageTextRef.current.appendChild(newMessageElement);
    //                             sendMessage.current.value = "";
    //                         } else {
    //                             const newMessageElement = document.createElement('div');
    //                             newMessageElement.className = "flex items-end justify-end space-x-2 p-1";
    //                             const innerDiv = document.createElement('div');
    //                             innerDiv.className = "bg-blue-500 text-white p-3 rounded-lg";
    //                             innerDiv.innerText = resData.message.last_message;
    //                             newMessageElement.appendChild(innerDiv);
    //                             messageTextRef.current.appendChild(newMessageElement);
    //                             sendMessage.current.value = "";
    //                         }

    //                         socket.off('message', handleMessage);
    //                     }
    //                 })
    //                 .catch(err => console.log("err", err))
    //         }
    //     };
    //     socket.on('message', handleMessage);
    // }, [id]);

    return (
        <div className="flex h-screen bg-gray-100 max-w-screen-xl mx-auto">
            <Side />
            <main className="w-3/4 bg-white p-6 border border-gray-200">
                <div className="flex flex-col h-full">
                    <div ref={messageTextRef} className="flex-1 overflow-y-auto">

                    </div>
                    <form onSubmit={send} className="mt-6 flex items-center space-x-3">
                        <input
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1"
                            placeholder="Please enter a message"
                            ref={sendMessage}
                        />
                        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-blue-500 text-white">
                            SEND
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
}

export default Message;
