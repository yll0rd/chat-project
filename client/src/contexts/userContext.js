import React, {createContext, useState} from 'react';


export const UserContext = createContext(undefined);
const nameOfUser = localStorage.getItem('nameOfUser');
const initialState = nameOfUser ? nameOfUser : ''
const UserContextProvider = ({children}) => {
    const [user, setUser] = useState(initialState)
    const contextValues = {
        user,
        setUser
    }
    return (
        <UserContext.Provider value={contextValues}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
