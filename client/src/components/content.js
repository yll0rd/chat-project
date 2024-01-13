import React, {useContext, useEffect, useState} from 'react';
import {UserContext} from "../hooks/userContext";
import {getMessages} from "../fetcher";
import MessageComponent from "./message";

const MessagesContent = () => {
    const { contactClicked } = useContext(UserContext)
    const [messages, setMessages] = useState({})

    useEffect(() => {
        const fetchMessages = async () => {
            return await getMessages(contactClicked.roomId, {method: 'GET', credentials: 'include'});
        }
        fetchMessages().then((res) => setMessages(res.data))
    }, [contactClicked.roomId])


    const renderMessages = () => {
        if (messages.data)
            return messages.data.map((m, i) => {
                return <MessageComponent key={i} msg={m}/>;
            })
    }


    return (
        <>
            <div className="content">
                <div className="contact-profile">
                    <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
                    <p>{contactClicked.secondUser}</p>
                </div>
                <div className="messages">
                    <ul>
                        {renderMessages()}
                    </ul>
                </div>
                <div className="message-input">
                    <div className="wrap">
                        <input type="text" placeholder="Write your message..." />
                        <i className="fa fa-paperclip attachment" aria-hidden="true"></i>
                        <button className="submit"><i className="fa fa-paper-plane" aria-hidden="true"></i></button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MessagesContent;
