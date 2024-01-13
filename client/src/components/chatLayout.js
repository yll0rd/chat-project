import React, {useEffect, useState} from 'react';
import '../assets/css/main.css';
import Contacts from "./contacts";
import {useAuth} from "../hooks/userContext";
import MessagesContent from "./content";
import {checkLogin} from "../fetcher";

const ChatLayout = () => {
    const auth = useAuth()
    const { logOutAction, user, contactClicked } = auth
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        checkLogin({ method: 'GET', credentials: 'include' })
            .then((res) => {
                console.log(res)
                if (!res.OK)
                    logOutAction();
                else
                    setIsLoggedIn(true)
            })
        console.log(user)
    }, [logOutAction, user])

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
