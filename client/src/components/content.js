import React, {useContext} from 'react';
import {UserContext} from "../contexts/userContext";

const MessagesContent = () => {
    const {contactClicked, secondUser} = useContext(UserContext)
    return (
        <div className="content">
            {contactClicked &&
                <>
                    <div className="contact-profile">
                        <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
                        <p>{secondUser}</p>
                    </div>
                    <div className="messages">
                        <ul>
                        </ul>
                    </div>
                    <div className="message-input">
                        <div className="wrap">
                            <input type="text" placeholder="Write your message..." />
                            <i className="fa fa-paperclip attachment" aria-hidden="true"></i>
                            <button className="submit"><i className="fa fa-paper-plane" aria-hidden="true"></i></button>
                        </div>
                    </div>
                </>
                }
        </div>
    );
};

export default MessagesContent;
