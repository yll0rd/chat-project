import React, {useEffect, useState} from 'react';
import '../assets/css/main.css'
import {getContacts} from "../fetcher";
import Contact from "./contact";

const Contacts = () => {
    const [contacts, setContacts] = useState({})
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
        getData().then(res => {
            if (res.OK)
                setContacts(res.data);
        })
    }, [])

    const renderContacts = () => {
        if (contacts['contacts'])
            return contacts['contacts'].map(c => {
                let params = {
                    contactName: c['contact_name'],
                    lastMessage: c['last_message'],
                    timestamp: c.timestamp,
                    id: c.room_id
                }
                return <Contact {...params} key={c['room_id']}/>
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
