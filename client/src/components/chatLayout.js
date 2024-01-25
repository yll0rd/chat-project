import React, {useEffect, useState} from 'react';
import '../assets/css/main.css';
import Contacts from "./contacts";
import {useAuth} from "../hooks/userContext";
import MessagesContent from "./content";
import {BASE_WS_URL, checkLogin} from "../fetcher";

const ChatLayout = () => {
    const { logOutAction, user, contactClicked, generalWebSocket, setGeneralWebSocket, contacts, setContacts } = useAuth()
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        checkLogin({ method: 'GET', credentials: 'include' })
            .then((res) => {
                if (!res.OK)
                    logOutAction();
                else
                    setIsLoggedIn(true)
            })
    }, [logOutAction])

    useEffect(() => {
        if (isLoggedIn) {
            const ws = new WebSocket(BASE_WS_URL)
            ws.onopen = function (e) {
                console.log('General socket opened successfully ', e)
            }

            ws.onclose = function (e) {
                console.log("General socket closed unexpectedly", e)
            }

            setGeneralWebSocket(ws)

            return () => {
                ws.close();
            };
        }
    }, [isLoggedIn, setGeneralWebSocket]);

    useEffect(() => {
        if (generalWebSocket) {
            generalWebSocket.onmessage = function (e) {
                const data = JSON.parse(e.data);
                let content = data['message']
                let sender = data['sender_username']
                let timestamp = data['timestamp']
                let roomId = data['room_id']
                let i = 0;
                let resultContacts = []
                for (const contact of contacts) {
                    let prev = [...contacts]
                    if (contact.room_id === roomId) {
                        let con = prev.splice(i, 1);
                        con[0]['last_message'] = content;
                        con[0]['last_message_sender'] = sender;
                        con[0]['timestamp'] = timestamp;
                        resultContacts = [...con, ...prev]
                        break;
                    }
                    i += 1;
                }
                setContacts(resultContacts)
            }
        }
    }, [contacts, generalWebSocket, setContacts])

    return (isLoggedIn &&
        <>
            <div id="frame">
                <div id="sidepanel">
                    <div id="profile">
                        <div className="wrap">
                            <img id="profile-img" src="http://emilcarlsson.se/assets/mikeross.png" className="online" alt="" />
                            <p>{ user.name }</p>
                        </div>
                    </div>
                    <div id="search">
                        <label htmlFor=""><i className="fa fa-search" aria-hidden="true"></i></label>
                        <input type="text" placeholder="Search contacts..." />
                    </div>
                    <Contacts />
                    <div id="bottom-bar">
                        <button id="logout" onClick={logOutAction}><span>Log Out</span></button>
                        <button id="settings"><i className="fa fa-cog fa-fw" aria-hidden="true"></i> <span>Settings</span></button>
                    </div>
                </div>
                {contactClicked.isContactClicked && <MessagesContent/> }
            </div>
        </>
    );
};

export default ChatLayout;
