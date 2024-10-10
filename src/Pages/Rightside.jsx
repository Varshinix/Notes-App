import React, { useState, useEffect } from 'react'
import "../Rightside.css"

export const Rightside = ({ activeNote }) => {
    const [messages, setMessages] = useState([]); 
    const [newMessage, setNewMessage] = useState('');


    // store data through localStorage 
    useEffect(() => {
        const storedMessages = localStorage.getItem('messages');
        if (storedMessages) {
          setMessages(JSON.parse(storedMessages));
        }
    }, []);


    //sending messages
    const handleSend = () => {
        if (newMessage.trim()) {
            const now = new Date();
            const formattedDate = `${now.getDate()} ${now.toLocaleString('default', { month: 'short' })} ${now.getFullYear()}`;
            const formattedTime = now.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

            const newMessages = [...messages, { text: newMessage, date: formattedDate, time: formattedTime }];
            setMessages(newMessages);

            // Save messages to localstorage
            localStorage.setItem('messages', JSON.stringify(newMessages));

            setNewMessage('');
        }
    };

    if (!activeNote) {
        return (
            <div className="rightside-container">

                <div className="rightside-content">
                    <img src="./Homeimg.png" alt="Home page image" className="home-image"/>
                    <h1>Pocket Notes</h1>
                    <p className="sub-message">
                        Send and receive messages without keeping your phone online. <br />
                        Use Pocket Notes on up to 4 linked devices and 1 mobile phone
                    </p>
                </div>

                <div className="bottom-message">
                    <p><img src="./lock.png" alt="encrypted lock" className="lock-png" />end-to-end encrypted</p>
                </div>
            </div>
        )
    }   

    // selected note
    return (
        <div className="rightside-container">

            <div className="note-header"> 
                <div className="note-group-circle-header" style={{ backgroundColor: activeNote.color }}>
                    {activeNote.name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2)}
                </div>
                <h2 className="note-title">{activeNote.name}</h2>
            </div>

            
            <div className="messages-container">
                {messages.map((msg, index) => (
                    <div key={index} className="message-item">
                        <div>{msg.text}</div>
                        <div className="message-timestamp">
                            {msg.date} . {msg.time}
                        </div> 
                    </div>
                ))}
            </div>

           
            <div className="message-input-container">
                <input
                    type="text"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="message-input"
                />
                <button onClick={handleSend} className="send-button"> 
                    <img src="./Send.png" alt="Send image" className="send-btn-img" />
                </button>
            </div>
        </div>
    );
};
