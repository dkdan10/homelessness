import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import './talk.scss'

// To save text from diffrent chats I could pass down a typed messages object from the connect component. Or create that here. 
function Talk(props) {
    const { chatUserId, setChatUserId, socket, currentUser } = props
    const [ messageText, setMessageText ] = useState('')
    const [ messages, setMessages ] = useState([])


    function handleSendMessage(e) {
        e.preventDefault();
        socket.emit('SEND_MESSAGE', {
            message: messageText,
            recipientUserId: chatUserId,
            senderId: currentUser.id
        });
        setMessageText('');
    }

    useEffect(() => {
        subscribeToSocketConnections(socket, setMessages)
    }, [socket])

    return (
        <div className="talk-container">
            <span>Chat With: {chatUserId}</span>
            <div onClick={setChatUserId("DANIEL")}>SET CHAT WITH DANIEL</div>
            <div onClick={setChatUserId("ALEX")}>SET CHAT WITH ALEX</div>
            <div onClick={setChatUserId("ANNA")}>SET CHAT WITH ANNA</div>
            <div onClick={setChatUserId("SPENCE")}>SET CHAT WITH SPENCE</div>
            <ul>
                {
                    messages.map((message, idx) => {
                        return (
                            <li key={`message-idx-${idx}`}>
                                Message: {message}
                            </li>
                        )
                    })
                }
            </ul>
            <input type="text" onChange={(e) => setMessageText(e.target.value)} value={messageText}></input>
            <button onClick={handleSendMessage}>Send</button>
        </div>
    )
}

function subscribeToSocketConnections(socket, setMessages) {
    socket.on('RECEIVE_MESSAGE', (messageData) => {
        setMessages((prevMessages) => [...prevMessages, messageData.message])
    })
}

export default withRouter(Talk)