import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import './talk.scss'

function Talk(props) {
    // const { chatUserId } = props
    const { chatUserId, setChatUserId, socket } = props
    const [ messageText, setMessageText ] = useState('')

    return (
        <div className="tak-container">
            <span>Chat With: {chatUserId}</span>
            <div onClick={setChatUserId("DANIEL")}>SET CHAT WITH DANIEL</div>
            <div onClick={setChatUserId("ALEX")}>SET CHAT WITH ALEX</div>
            <div onClick={setChatUserId("ANNA")}>SET CHAT WITH ANNA</div>
            <div onClick={setChatUserId("SPENCE")}>SET CHAT WITH SPENCE</div>
            <input type="text" onChange={(e) => setMessageText(e.target.value)} value={messageText}></input>
            <button onClick={sendMessage(socket, messageText, chatUserId, setMessageText)}>Send</button>
        </div>
    )
}

function sendMessage(socket, messageText, chatUserId, setMessageText) {
    return (e) => {
        e.preventDefault();
        socket.emit('SEND_MESSAGE', {
            message: messageText,
            recipientUserId: chatUserId
        });
        setMessageText('');
    }
}

export default withRouter(Talk)