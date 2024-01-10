import React, {useContext, useEffect, useState} from 'react';
import '../assets/css/main.css';
import Contacts from "./contacts";
import {useNavigate} from "react-router-dom";
import {UserContext} from "../contexts/userContext";
import {logOut} from "../fetcher";
import MessagesContent from "./content";

const ChatLayout = () => {
    const navigate = useNavigate()
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { user } = useContext(UserContext)

    const handleLogOut = async () => {
        const response = await logOut({method: 'GET', credentials: 'include'});
        if (response.OK) {
            delete localStorage.clear()
            navigate('/signin')
        }
    }

    return (
        <>
            <div id="frame">
                <div id="sidepanel">
                    <div id="profile">
                        <div className="wrap">
                            <img id="profile-img" src="http://emilcarlsson.se/assets/mikeross.png" className="online" alt="" />
                            <p>{ user }</p>
                        </div>
                    </div>
                    <div id="search">
                        <label htmlFor=""><i className="fa fa-search" aria-hidden="true"></i></label>
                        <input type="text" placeholder="Search contacts..." />
                    </div>
                    <Contacts />
                    <div id="bottom-bar">
                        <button id="logout" onClick={handleLogOut}><span>Log Out</span></button>
                        <button id="settings"><i className="fa fa-cog fa-fw" aria-hidden="true"></i> <span>Settings</span></button>
                    </div>
                </div>
                <MessagesContent />
            </div>
        </>
    );
};

export default ChatLayout;
