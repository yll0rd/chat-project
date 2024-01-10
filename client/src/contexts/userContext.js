import React, {createContext, useState} from 'react';


export const UserContext = createContext(undefined);
const nameOfUser = localStorage.getItem('nameOfUser');
const s_User = localStorage.getItem('secondUser');
const initialUserState = nameOfUser ? nameOfUser : ''
const loggedInState = localStorage.getItem('isLoggedIn')

const UserContextProvider = ({children}) => {
    const [user, setUser] = useState(initialUserState)
    const [secondUser, setSecondUser] = useState(s_User ? s_User : '')
    const [contactClicked, setContactClicked] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(loggedInState ? loggedInState : false);
    const contextValues = {
        user,
        setUser,
        secondUser,
        setSecondUser,
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
