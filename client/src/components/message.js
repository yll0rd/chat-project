import React, {useContext} from 'react';
import {UserContext} from "../hooks/userContext";

const MessageComponent = ({msg}) => {
    const { user } = useContext(UserContext)
    const isSender = msg.sender !== user.username;
    const messageClass = isSender ? 'sent' : 'replies';
    return (
        <>
            <li className={messageClass}>
                <img src="http://emilcarlsson.se/assets/mikeross.png" alt="" />
                <p>{msg.content}</p>
            </li>
        </>
    );
};

export default MessageComponent;
