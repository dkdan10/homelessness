import React from 'react'

import ConnectTabBar from './tabBar/connect_tab_bar'
import RequestForm from './request/request_form_container'
import Donate from './donate/donate_container'
import Talk from './talk/talk'

import io from "socket.io-client"

const DONATE = "Donate"
const REQUEST = "Request"
const TALK = "Talk"

const tabBarOptions = {
    DONATE,
    REQUEST,
    TALK
}

class ConnectComponent extends React.Component {
    constructor(props) {
        super(props)
        let currentTab = DONATE

        const conversationMessages = {}
        Object.keys(this.props.userConversations).forEach(conversationId => conversationMessages[conversationId] = [])
        this.state = {
            currentTab,
            currentConversationId: null,
            socket: this.createSocketConnection(),
            conversationMessages
        }        

        this.setCurrentTab = this.setCurrentTab.bind(this)
        this.setChatWithUser = this.setChatWithUser.bind(this)
        this.addMessageToConversation = this.addMessageToConversation.bind(this)
    }

    componentDidMount() {
        this.props.getConversations()
    }

    componentDidUpdate(prevProps) {
        if (Object.keys(this.props.userConversations).length !== Object.keys(prevProps.userConversations).length) {
            const conversationMessages = {}
            Object.keys(this.props.userConversations).forEach(conversationId => conversationMessages[conversationId] = [])
            this.setState({
                conversationMessages
            })
        }
    }

    createSocketConnection() {
        // Put logic here for prod vs dev
        const socket = io('localhost:5000')
        socket.on('connect', () => {
            if (this.props.loggedIn) {
                socket.emit("ASSIGN_USER_TO_SOCKET", {
                    userId: this.props.currentUser.id,
                    socketId: socket.id
                })
            }
        })
        return socket
    }

    componentWillUnmount () {
        this.state.socket.disconnect()
    }

    setCurrentTab(option) {
        return e => {
            e.preventDefault()
            this.setState({currentTab: option})
        }
    }

    newChatWithUser(userId) {
        this.props.createConversation({
            participants: [this.props.currentUser.id, userId]
        }).then(() => {
            // Broadcast conversation either here or on first message
            this.setState({ currentTab: TALK, currentConversationId: this.props.userConversations[this.props.userToConversationId[userId]].conversationId })
        })
    }

    setChatWithUser(userId) {
        return e => {
            e.preventDefault()
            if (this.props.userToConversationId[userId]) {
                this.setState({ currentTab: TALK, currentConversationId: this.props.userConversations[this.props.userToConversationId[userId]].conversationId })
            } else {
                this.newChatWithUser(userId)
            }
        }
    }

    addMessageToConversation(message, conversationId) {
        this.setState({
            conversationMessages: Object.assign(this.state.conversationMessages, { [conversationId]: this.state.conversationMessages[conversationId].concat([message])}) 
        })
    }

    loadSelectedComponent() {
        switch(this.state.currentTab) {
            case REQUEST:
                return <RequestForm/>
            case DONATE:
                return <Donate 
                            setChatWithUser={this.setChatWithUser}
                        />
            case TALK:
                return <Talk 
                            currentConversationId={this.state.currentConversationId} 
                            setChatUserId={this.setChatWithUser}
                            socket={this.state.socket}
                            currentUser={this.props.currentUser}
                            userConversations={this.props.userConversations}
                            conversationMessages={this.state.conversationMessages}
                            addMessageToConversation={this.addMessageToConversation}
                        />
            default:
                return this.state.currentTab
        }
    }

    
    render() {
        const { currentTab} = this.state
        return (
            <div className="connect-component-container">
                <ConnectTabBar currentTab={currentTab} setCurrentTab={this.setCurrentTab} tabBarOptions={Object.values(tabBarOptions)}/>
                {this.loadSelectedComponent()}
            </div>
        )
    }
}

export default ConnectComponent