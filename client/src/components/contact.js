import React from 'react';
import '../assets/css/main.css'

const Contact = ({contactName, lastMessage, timestamp}) => {
    return (
        <>
            <div className="wrap">
                <span className="contact-status online"></span>
                <img src="http://emilcarlsson.se/assets/donnapaulsen.png" alt="" />
                <div className="meta">
                    <p className="name">{ contactName }</p>
                    <p className="preview"><span>{ lastMessage }<span id="timestamp" style={{marginRight: 45}}>{ timestamp }</span></span></p>
                </div>
            </div>
        </>
    );
};

export default Contact;
