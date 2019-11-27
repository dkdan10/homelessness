import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import './talk.scss'

// To save text from diffrent chats I could pass down a typed messages object from the connect component. Or create that here. 
function Talk(props) {
    const { currentConversationId, setChatUserId, socket, currentUser, userConversations, conversationMessages, addMessageToConversation } = props
    const [ messageText, setMessageText ] = useState('')
    // const [ messages, setMessages ] = useState([])


    function handleSendMessage(e) {
        e.preventDefault()
        socket.emit('SEND_MESSAGE', {
            message: messageText,
            recipientUserId: userConversations[currentConversationId].otherUserId,
            senderId: currentUser.id,
            conversationId: currentConversationId
        })
        setMessageText('')
    }

    function formConversationLis() {
        return Object.keys(userConversations).map(conversationId => {
            return (
                <li key={`chat-with-${conversationId}`}>
                    <div onClick={setChatUserId(userConversations[conversationId].otherUserId)}>
                        Chat User Id: {userConversations[conversationId].otherUserId}
                    </div>
                    <div>
                        Chat Username: {userConversations[conversationId].username}
                    </div>
                </li>
            )
        })
    }

    function selectedConvoMessages() {
        const currentMessages = conversationMessages[currentConversationId] ? conversationMessages[currentConversationId] : []
        return currentMessages.map((message, idx) => {
            return (
                <li key={`message-${idx}`}>
                    Message: {message}
                </li>
            )
        })
    }

    // REFACTOR HOW CONVERSATIONS HAPPEN

    useEffect(() => {
        subscribeToSocketConnections(socket, addMessageToConversation)
        return function cleanup () {
            unsubscribeToSocketConnections(socket)
        }
    }, [socket])

    return (
        <div className="talk-container">
            <span>Chat With: {userConversations[currentConversationId] ? userConversations[currentConversationId].otherUserId : "No Chat"}</span>
            <div>
                Chats:
                <ul>
                    {formConversationLis()}
                </ul>
            </div>
            <div>
                Messages:
                <ul>
                    {selectedConvoMessages()}
                </ul>
            </div>
            
            <input type="text" onChange={(e) => setMessageText(e.target.value)} value={messageText}></input>
            <button onClick={handleSendMessage}>Send</button>
        </div>
    )
}

function subscribeToSocketConnections(socket, addMessageToConversation) {
    socket.on('RECEIVE_MESSAGE', (messageData) => {
        addMessageToConversation(messageData.message, messageData.conversationId)
    })
}

function unsubscribeToSocketConnections(socket) {
    socket.removeListener('RECEIVE_MESSAGE')
}

export default withRouter(Talk)