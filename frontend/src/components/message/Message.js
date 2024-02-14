import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom'
import SendTalk from "./SendTalk";
import TackList from "./side/Talklist";
import openSocket from 'socket.io-client';

const Message = () => {
    const { id } = useParams()
    let sendMessage = useRef()
    // useEffect(() =>
    //     fetch(`http://localhost:4000/message/${id}`, { method: "PUT", headers: { "Content-Type": "application/json", "Authorization": "Bearer " + sessionStorage.getItem("accessToken"), "refreshtoken": sessionStorage.getItem("refreshToken") }, body: JSON.stringify({ message: sendMessage.current.value }) })
    //         .then(res => res.json())
    //         .then(resData => {
    //             console.log(resData);
    //             sendMessage.current.value = ""
    //         })
    //         .catch(err => {
    //             console.log(err)
    //         })
    // )
    const send = (events) => {
        events.preventDefault()
        fetch(`http://localhost:4000/message/${id}`, { method: "PUT", headers: { "Content-Type": "application/json", "Authorization": "Bearer " + sessionStorage.getItem("accessToken"), "refreshtoken": sessionStorage.getItem("refreshToken") }, body: JSON.stringify({ message: sendMessage.current.value }) })
            .then(res => res.json())
            .then(resData => {
                console.log(resData);
                sendMessage.current.value = ""
            })
            .catch(err => {
                console.log(err)
            })
    }
    let uploadState = 0;
    // const send = (events) => {
    //     events.preventDefault()
    //     var hour = new Date().getHours();
    //     hour = ("0" + hour).slice(-2);
    //     var minute = new Date().getMinutes();
    //     minute = ("0" + minute).slice(-2);
    //     var time = hour + "." + minute;
    //     socket.emit('message', sendMessage.current.value, time);
    //     sendMessage.current.value = ""

    //     if (uploadState == 0) {
    //         socket.emit('message', sendMessage.current.value, time);
    //         sendMessage.current.value = ""
    //     } else {
    //         // uploadFile();
    //         // const html = '<a href="uploaded-files/' + text.val() + '" target="_blank">' + text.val() + '</a>';
    //         // socket.emit('message', html, USERNAME, RANDOM_COLOR, time);
    //         // text.val('');
    //         console.log('파일 들어갈곳')
    //     }
    // }
    return (
        <div class="flex h-screen bg-gray-100 max-w-screen-xl mx-auto">
            <aside class="w-80 bg-white p-6">
                <div class="flex items-center justify-between pb-6">
                    <h1 class="text-xl font-semibold">Message</h1>
                </div>
                <TackList />
            </aside>
            <main class="w-3/4 bg-white p-6 border border-gray-200">
                <div class="flex flex-col h-full">
                    <div class="flex-1 overflow-y-auto">
                        <SendTalk />
                    </div >
                    <form onClick={send} class="mt-6 flex items-center space-x-3">
                        <input
                            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1"
                            placeholder="Please enter a message"
                            ref={sendMessage}
                        />
                        <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-blue-500 text-white">
                            SEND
                        </button>
                    </form>
                </div>
            </main >
        </div >
    )
}

export default Message;