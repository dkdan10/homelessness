import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import './talk.scss'

// To save text from diffrent chats I could pass down a typed messages object from the connect component. Or create that here. 
function Talk(props) {
    const { chatUserId, setChatUserId, socket, currentUser, userConversations } = props
    const [ messageText, setMessageText ] = useState('')
    const [ messages, setMessages ] = useState([])


    function handleSendMessage(e) {
        e.preventDefault()
        socket.emit('SEND_MESSAGE', {
            message: messageText,
            recipientUserId: chatUserId,
            senderId: currentUser.id
        })
        setMessageText('')
    }

    function formConversationLis() {
        return Object.keys(userConversations).map(otherChatUserId => {
            return (
                <li key={`chat-with-${otherChatUserId}`}>
                    <div onClick={setChatUserId(otherChatUserId)}>
                        Chat User Id: {otherChatUserId}
                    </div>
                    <div>
                        Chat Username: {userConversations[otherChatUserId].username}
                    </div>
                </li>
            )
        })
    }

    useEffect(() => {
        subscribeToSocketConnections(socket, setMessages)
        return function cleanup () {
            unsubscribeToSocketConnections(socket)
        }
    }, [socket])

    return (
        <div className="talk-container">
            <span>Chat With: {chatUserId}</span>
            <ul>
                {formConversationLis()}
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

function unsubscribeToSocketConnections(socket) {
    socket.removeListener('RECEIVE_MESSAGE')
}

export default withRouter(Talk)