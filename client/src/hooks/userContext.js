import React, {createContext, useContext, useState} from 'react';
import {logOut, postSignIn} from "../fetcher";
import {useNavigate} from "react-router-dom";
import {store} from "../utils";


export const UserContext = createContext(undefined);
const nameOfUser = localStorage.getItem('name');
const usernameOfUser = localStorage.getItem('username');
const initialUserState = nameOfUser && usernameOfUser ? {'name': nameOfUser, 'username': usernameOfUser} : {}

const UserContextProvider = ({children}) => {
    const [user, setUser] = useState(initialUserState)
    const [token, setToken] = useState(localStorage.getItem("jwt"));
    const [contacts, setContacts] = useState([])
    const navigate = useNavigate();
    const contactClickedInitialState = {
        isContactClicked: false,
        roomId: '',
        name: '',
        username: ''
    }
    const [contactClicked, setContactClicked] = useState(contactClickedInitialState)

    const loginAction = async (data) => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',  // to send cookies associated with the domain in the request.
            body: JSON.stringify(data)
        }
        const res = await postSignIn(options)
        if (res.OK) {
            console.log(res.data.user)
            setUser(res.data.user);
            setToken(res.data.token);
            store("jwt", res.data.token);
            store('name', res.data.user.name)
            store('username', res.data.user.username)
            navigate("/");
            return true;
        }
        return res.message;
    };

    const logOutAction = async () => {
        const res = await logOut({method: 'GET', credentials: 'include'});
        if (res.OK) {
            setUser(null);
            setToken("");
            setContactClicked(contactClickedInitialState);
            localStorage.clear();
            navigate("/")
        }
        else
            throw new Error(res.message)
    };

    const contextValues = {
        user,
        token,
        contactClicked,
        setContactClicked,
        contacts,
        setContacts,
        loginAction,
        logOutAction
    }

    return (
        <UserContext.Provider value={contextValues}>
            {children}
        </UserContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(UserContext);
};

export default UserContextProvider;
