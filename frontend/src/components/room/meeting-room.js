import React, { useState, useEffect } from 'react';
import './style-room.css';
import io from 'socket.io-client';
import Peer from 'peerjs';
import { useParams } from 'react-router-dom';
const socket = io('/');

const Room = () => {
    return (
        <div class="container">
            <div id="form" class="glow">
                <div id="content">
                    <div class="left-content">

                        <div class="top-left">
                            <div class="header">
                                <div class="header-div">
                                    <span id="power" onclick="leaveMeeting()">
                                        <i class="material-icons">&#xe8ac;</i>
                                    </span>
                                </div>
                                <div class="header-div">
                                    <p style="margin: 0px; padding: 12px 0px 0px 10px; font-weight: bold;">강의제목</p>
                                    <p id="date" style="margin: 0px; padding: 0px 0px 0px 10px; font-size: 10pt;">Sunday, 1
                                        Jan
                                        2023</p>
                                </div>

                            </div>
                        </div>

                        <div class="middle-left">
                            <video id="main-video" title="Double click to display fullscreen." ondblclick="fullscreen()"
                                autoplay></video>
                            <div id="video-grid">

                            </div>
                        </div>
                        <div id="bot-left">
                            <div class="command-btn" id="audioControl" onclick="muteUnmute()">
                                <i class="material-icons">&#xe029;</i>
                                <p class="label">Mic</p>
                            </div>
                            <div class="command-btn" id="videoControl" onclick="playStop()">
                                <i class="material-icons">&#xe04b;</i>
                                <p class="label">Cam</p>
                            </div>
                            <div class="command-btn" id="shareControl" onclick="shareScreen()">
                                <i class="material-icons">&#xe0df;</i>
                                <p class="label" id="shareText">Share</p>
                            </div>
                            <div class="command-btn" id="recordControl" onclick="recordMeeting()">
                                <i class="material-icons">&#xe061;</i>
                                <p class="label">Record</p>
                            </div>
                        </div>
                    </div>
                    <div id="right-content">
                        <p id="participant"
                            style="margin: 15px; padding: 12px 0px 0px 10px; font-weight: bold; color: #202020;">Chat with
                            Friends : 4</p>
                        <div class="active"></div>
                        <div id="chatroom">

                        </div>
                        <div id="chatform">
                            <label>
                                <input type="file" id="file" style="display: none;" onchange="selectFile(this.value)" />
                                <i class="material-icons"
                                    style="font-size: 18px; color: #4f4f4f; float: left; margin-left: 10px; margin-top: 15px; transform: rotate(45deg); cursor: pointer;">&#xe226;</i>
                            </label>
                            <input id="textchat" type="text" placeholder="Type here ..." />
                            <button id="sendMessage"
                                style="background-color: #fd6f13; border: none; margin-left: 8px; padding: 4px 3px 2px 3px; margin-top: 8px; border-radius: 6px; cursor: pointer;">
                                <i class="material-icons"
                                    style="color: #ffffff; font-size: 25px; font-weight: bold;">&#xe315;</i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Room;
