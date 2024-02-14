import openSocket from 'socket.io-client';
import React, { useMemo, useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
const SendTalk = () => {
    const { id } = useParams()
    const socket = openSocket('http://localhost:4000', { transports: ['websocket'] });
    socket.on('events', (id, message) => {
        fetch(`http://localhost:4000/message/${id}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + sessionStorage.getItem("accessToken"),
                    "refreshtoken": sessionStorage.getItem("refreshToken")
                },
            }).
            then(res => res.json())
            .then(resData => {
                console.log(resData)
            })
            .catch(err => console.log(err))
    });
    // io.on('connection', message => {
    //     message.on('message', (message, sender, color, time) => {
    //         connectMessage(roomId, JSON.stringify({
    //             message, sender, color, time
    //         }))
    //     })
    // })
    return (
        <>
            <div class="flex-1 overflow-y-auto">
                <div class="flex items-end justify-end space-x-2 p-1">
                    <div class="bg-blue-500 text-white p-3 rounded-lg">Let’s start messaging with your nodes!</div>
                </div>
                <div class="flex items-start space-x-2 p-1">
                    <div class="bg-blue-500 text-white p-3 rounded-lg">Let’s start messagi</div>
                </div>
            </div>
        </>
    )
}
export default SendTalk