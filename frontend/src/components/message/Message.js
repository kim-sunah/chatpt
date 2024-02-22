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
    const [user_id, setinfo] = useState()
    const socket = openSocket('http://localhost:4000', { transports: ['websocket'] });

    const handleMessage = (data) => {
        data = JSON.parse(data)
        if (data.send_user === user_id) {
            const newMessageElement = document.createElement('div');
            newMessageElement.className = "flex items-start space-x-2 p-1";
            const innerDiv = document.createElement('div');
            innerDiv.className = "bg-blue-500 text-white p-3 rounded-lg";
            innerDiv.innerText = data.message;
            newMessageElement.appendChild(innerDiv);
            messageTextRef.current.appendChild(newMessageElement);
        } else {
            const newMessageElement = document.createElement('div');
            newMessageElement.className = "flex items-end justify-end space-x-2 p-1";
            const innerDiv = document.createElement('div');
            innerDiv.className = "bg-blue-500 text-white p-3 rounded-lg";
            innerDiv.innerText = data.message;
            newMessageElement.appendChild(innerDiv);
            messageTextRef.current.appendChild(newMessageElement);
        }
    };


    useEffect(() => {
        // 유저 정보 가져오기
        fetchUserInfo();
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
        // Socket 이벤트 핸들링
        socket.on(id, handleMessage);

        // 컴포넌트 언마운트 시 Socket 이벤트 리스너 제거
        return () => {
            socket.off(id, handleMessage);
        };
    }, []);

    // 유저 정보 가져오는 함수
    const fetchUserInfo = () => {
        fetch("http://localhost:4000/users/Mypage", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + sessionStorage.getItem("accessToken"),
                "refreshtoken": sessionStorage.getItem("refreshToken")
            }
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error("Failed to fetch user info");
                }
                return res.json();
            })
            .then(resData => {
                setinfo(resData.user.id);
            })
            .catch(err => console.log(err));
    };

    const send = (event) => {
        event.preventDefault();
        fetch(`http://localhost:4000/message/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + sessionStorage.getItem("accessToken"),
                "refreshtoken": sessionStorage.getItem("refreshToken")
            },
            body: JSON.stringify({ message: sendMessage.current.value })
        })
            .then(() => {
                sendMessage.current.value = "";
            })
            .catch(err => {
                console.log(err);
            });
    };
    const MessageComponent = ({ message, isOwnMessage }) => {
        const className = isOwnMessage ? "flex items-end justify-end space-x-2 p-1" : "flex items-start space-x-2 p-1";
        return (
            <div className={className}>
                <div className="bg-blue-500 text-white p-3 rounded-lg">
                    {message}
                </div>
            </div>
        );
    };

    const renderMessages = (messages) => {
        return messages.map((message, index) => (
            <MessageComponent
                key={index}
                message={message.message}
                isOwnMessage={message.send_user === user_id}
            />
        ));
    };
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