import React, {useContext, useEffect, useState} from 'react';
import '../assets/css/main.css'
import {getContacts} from "../fetcher";
import Contact from "./contact";
import {UserContext} from "../contexts/userContext";

const Contacts = () => {
    const [contacts, setContacts] = useState({})
    const { setContactClicked } = useContext(UserContext)
    useEffect(() => {
        const getData = async () => {
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',  // to send cookies associated with the domain in the request.
            }
            return await getContacts(options)
        }
        getData().then(res => setContacts(res.data))
    }, [])

    const renderContacts = () => {
        if (contacts['contacts'])
            return contacts['contacts'].map(c => {
                let params = {
                    contactName: c['contact_name'],
                    lastMessage: c['last_message'],
                    timestamp: c.timestamp
                }
                return <li id={c['room_id']} key={c['room_id']} className='contact' onClick={() => {
                    setContactClicked(prevState => ({
                        ...prevState,
                        isContactClicked: true,
                        roomId: c['room_id'],
                        secondUser: c['contact_name']
                    }))
                }}>
                    <Contact {...params}/>
                </li>
            })
    }
    return (
        <div id='contacts'>
            <ul>
                {renderContacts()}
            </ul>
        </div>
    );
};

export default Contacts;
