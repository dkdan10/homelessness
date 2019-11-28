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

        this.state = {
            currentTab,
            currentConversationId: null,
            socket: this.createSocketConnection(),
        }        

        this.setCurrentTab = this.setCurrentTab.bind(this)
        this.setChatWithUser = this.setChatWithUser.bind(this)
    }

    componentDidMount() {
        if (this.props.loggedIn) this.props.getConversations()
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
            this.setState({ currentTab: TALK, currentConversationId: this.props.userConversations[this.props.userIdToConversationId[userId]].conversationId })
        })
    }

    setChatWithUser(userId) {
        return e => {
            e.preventDefault()
            if (!this.props.loggedIn) {
                this.props.history.push('/login')
            } else if (this.props.userIdToConversationId[userId]) {
                this.setState({ currentTab: TALK, currentConversationId: this.props.userConversations[this.props.userIdToConversationId[userId]].conversationId })
            } else {
                this.newChatWithUser(userId)
            }
        }
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
                            socket={this.state.socket}
                            currentUser={this.props.currentUser}
                            currentConversationId={this.state.currentConversationId} 
                            setChatUserId={this.setChatWithUser}
                            userConversations={this.props.userConversations}
                            createMessage={this.props.createMessage}
                            receiveMessage={this.props.receiveMessage}
                            users={this.props.users}
                        />
            default:
                return this.state.currentTab
        }
    }

    
    render() {
        const { currentTab} = this.state
        return (
            <div className="connect-component-container">
                <ConnectTabBar 
                    currentTab={currentTab} 
                    setCurrentTab={this.setCurrentTab} 
                    tabBarOptions={Object.values(tabBarOptions)}
                />
                {this.loadSelectedComponent()}
            </div>
        )
    }
}

export default ConnectComponent