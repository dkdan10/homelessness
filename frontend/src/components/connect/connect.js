import React from 'react'

import ConnectTabBar from './tabBar/connect_tab_bar'
import RequestForm from './request/request_form_container'
import Donate from './donate/donate_container'
import Talk from './talk/talk_container'

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
            chatUserId: null
        }
        this.setCurrentTab = this.setCurrentTab.bind(this)
        this.chatWithUser = this.chatWithUser.bind(this)
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
            this.setState({currentTab: TALK, chatUserId: userId})
        }
    }

    loadSelectedComponent() {
        switch(this.state.currentTab) {
            case REQUEST:
                return <RequestForm/>
            case DONATE:
                return <Donate chatWithUser={this.chatWithUser}/>
            case TALK:
                return <Talk chatUserId={this.state.chatUserId} setChatUserId={this.chatWithUser}/>
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