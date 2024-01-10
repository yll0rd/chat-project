import React, {createContext, useState} from 'react';


export const UserContext = createContext(undefined);
const nameOfUser = localStorage.getItem('nameOfUser');
const usernameOfUser = localStorage.getItem('usernameOfUser');
const initialUserState = nameOfUser && usernameOfUser ? {nameOfUser, usernameOfUser} : {}
const loggedInState = localStorage.getItem('isLoggedIn')

const UserContextProvider = ({children}) => {
    const [user, setUser] = useState(initialUserState)
    const [contactClicked, setContactClicked] = useState({
        isContactClicked: false,
        roomId: '',
        secondUser: ''
    })
    const [isLoggedIn, setIsLoggedIn] = useState(loggedInState ? loggedInState : false);
    const contextValues = {
        user,
        setUser,
        contactClicked,
        setContactClicked,
        isLoggedIn,
        setIsLoggedIn
    }
    return (
        <UserContext.Provider value={contextValues}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
