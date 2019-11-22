import React from 'react'
import { withRouter } from 'react-router-dom'

import ConnectTabBar from './tabBar/connect_tab_bar'
import RequestForm from './request/request_form_container'
import Donate from './donate/donate_container'

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
        // debugger
        if (this.props.match.params.chatUserId) {
            currentTab = TALK
        }
        this.state = {
            currentTab
        }
        this.setCurrentTab = this.setCurrentTab.bind(this)
    }

    setCurrentTab(option) {
        return e => {
            e.preventDefault()
            if (option !== TALK) {
                this.props.history.push("/connect")
            }
            this.setState({currentTab: option})
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.chatUserId 
            && this.props.match.params.chatUserId !== prevProps.match.params.chatUserId) {
                this.setState({ currentTab: TALK })
        }
    }

    loadSelectedComponent() {
        switch(this.state.currentTab) {
            case REQUEST:
                return <RequestForm/>
            case DONATE:
                return <Donate/>
            case TALK:
                return `Talking with ${this.props.match.params.chatUserId}`
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