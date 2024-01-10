import React, {useContext} from 'react';
import {UserContext} from "../contexts/userContext";

const MessageComponent = ({msg}) => {
    const { user } = useContext(UserContext)
    const isSender = msg.sender !== user.usernameOfUser;
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
