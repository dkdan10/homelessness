import React, { useState, useEffect, useRef } from 'react'
import { withRouter } from 'react-router-dom'
import './talk.scss'

// To save text from diffrent chats I could pass down a typed messages object from the connect component. Or create that here. 
function Talk(props) {
    const {
        socket,
        currentUser,
        currentConversationId,
        setChatUserId,
        userConversations,
        createMessage,
        users
    } = props
    const [ messageText, setMessageText ] = useState('')
    // const [ messages, setMessages ] = useState([])
    const messageListEnd = useRef(null)

    const currentMessages = userConversations[currentConversationId] ? userConversations[currentConversationId].messages : []

    function handleSendMessage(e) {
        e.preventDefault()
        const recipientUserId = userConversations[currentConversationId].otherUserId
        const message = {
            message: messageText,
            senderId: currentUser.id,
            conversationId: currentConversationId
        }
        createMessage(message).then(({ message }) => {
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
                <li onClick={setChatUserId(userConversations[conversationId].otherUserId)} className={`conversation-list-item ${conversationId === currentConversationId ? "selected" : ""}`} key={`chat-with-${conversationId}`}>
                    <div className="info" >
                        Chat With: {users[userConversations[conversationId].otherUserId].username}
                    </div>
                </li>
            )
        })
    }

    function selectedConvoMessages() {
        const currentMessages = userConversations[currentConversationId] ? userConversations[currentConversationId].messages : []
        return currentMessages.map((messageData, idx) => {
            return (
                <li className="chat-message-list-item" key={`message-${idx}`}>
                    {users[messageData.senderId].username}: {messageData.message}
                </li>
            )
        })
    }

    // REFACTOR HOW CONVERSATIONS HAPPEN

    // useEffect(() => {
    //     subscribeToSocketConnections(socket, receiveMessage)
    //     return function cleanup () {
    //         unsubscribeToSocketConnections(socket)
    //     }
    // }, [socket, receiveMessage])

    useEffect(() => {
        messageListEnd.current.scrollIntoView({ behavior: "smooth" })
    }, [currentMessages])

    return (
        <div className="talk-container">
            {/* <span>Chat With: {userConversations[currentConversationId] ? userConversations[currentConversationId].otherUserId : "No Chat"}</span> */}
            <div className="conversations-container">
                <div className="conversations-header">
                    <span className="inbox">Conversations</span>
                </div>
                <ul className="conversations-list">
                    {formConversationLis()}
                </ul>
            </div>
            <div className="chat-container">
                <span className="chat-header">Chat With: {userConversations[currentConversationId] ? userConversations[currentConversationId].otherUserId : "No Chat"}</span>
                <div className="chat-message-index">
                    <ul className="chat-message-list">
                        {selectedConvoMessages()}
                        <div ref={messageListEnd}></div>
                    </ul>
                    <div className="chat-message-input-container">
                        <div className="chat-message-inputs">
                            <textarea className="message-input-field" type="text" onChange={(e) => setMessageText(e.target.value)} value={messageText}></textarea>
                            <button className="submit-message-btn" onClick={handleSendMessage}>Send</button>
                        </div>
                    </div>
                </div>
            </div>            
        </div>
    )
}

export default withRouter(Talk)