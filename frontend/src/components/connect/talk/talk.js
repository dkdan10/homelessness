import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import './talk.scss'

function Talk(props) {
    // const { chatUserId } = props
    const { chatUserId, setChatUserId, socket } = props
    const [ messageText, setMessageText ] = useState('')
    

    function handleSendMessage(e) {
        e.preventDefault();
        socket.emit('SEND_MESSAGE', {
            message: messageText,
            recipientUserId: chatUserId
        });
        setMessageText('');
    }

    return (
        <div className="tak-container">
            <span>Chat With: {chatUserId}</span>
            <div onClick={setChatUserId("DANIEL")}>SET CHAT WITH DANIEL</div>
            <div onClick={setChatUserId("ALEX")}>SET CHAT WITH ALEX</div>
            <div onClick={setChatUserId("ANNA")}>SET CHAT WITH ANNA</div>
            <div onClick={setChatUserId("SPENCE")}>SET CHAT WITH SPENCE</div>
            <input type="text" onChange={(e) => setMessageText(e.target.value)} value={messageText}></input>
            <button onClick={handleSendMessage}>Send</button>
        </div>
    )
}


export default withRouter(Talk)