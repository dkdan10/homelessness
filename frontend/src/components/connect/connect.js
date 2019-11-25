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
            chatUserId: null,
            socket: this.createSocketConnection()
        }        

        this.setCurrentTab = this.setCurrentTab.bind(this)
        this.chatWithUser = this.chatWithUser.bind(this)
    }

    componentDidMount() {
        this.props.getConversations()
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

    chatWithUser(userId) {
        return e => {
            e.preventDefault()
            this.props.createConversation({
                participants: [this.props.currentUser.id, userId]
            }).then(() => {
                // Broadcast conversation either here or on first message
                this.setState({currentTab: TALK, chatUserId: userId})
            })
        }
    }

    loadSelectedComponent() {
        switch(this.state.currentTab) {
            case REQUEST:
                return <RequestForm/>
            case DONATE:
                return <Donate 
                            chatWithUser={this.chatWithUser}
                        />
            case TALK:
                return <Talk 
                            chatUserId={this.state.chatUserId} 
                            setChatUserId={this.chatWithUser}
                            socket={this.state.socket}
                            currentUser={this.props.currentUser}
                            chats={this.state.chats}
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