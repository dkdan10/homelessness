import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import './talk.scss'

// To save text from diffrent chats I could pass down a typed messages object from the connect component. Or create that here. 
function Talk(props) {
    const { currentConversationId, 
            setChatUserId, 
            socket, 
            currentUser, 
            userConversations, 
            receiveMessage
        } = props
    const [ messageText, setMessageText ] = useState('')
    // const [ messages, setMessages ] = useState([])


    function handleSendMessage(e) {
        e.preventDefault()
        const recipientUserId = userConversations[currentConversationId].otherUserId
        const message = {
            message: messageText,
            senderId: currentUser.id,
            conversationId: currentConversationId
        }
        props.createMessage(message).then(({ message }) => {
            if (message) {
                socket.emit('SEND_MESSAGE', {
                    message,
                    recipientUserId
                })
            }
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
        const currentMessages = userConversations[currentConversationId] ? userConversations[currentConversationId].messages : []
        return currentMessages.map((messageData, idx) => {
            return (
                <li key={`message-${idx}`}>
                    Message: {messageData.message}
                </li>
            )
        })
    }

    // REFACTOR HOW CONVERSATIONS HAPPEN

    useEffect(() => {
        subscribeToSocketConnections(socket, receiveMessage)
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

function subscribeToSocketConnections(socket, receiveMessage) {
    socket.on('RECEIVE_MESSAGE', (messageData) => {
        receiveMessage(messageData)
    })
}

function unsubscribeToSocketConnections(socket) {
    socket.removeListener('RECEIVE_MESSAGE')
}

export default withRouter(Talk)