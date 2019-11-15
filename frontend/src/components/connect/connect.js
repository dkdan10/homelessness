import React from 'react'
import ConnectTabBar from './tabBar/connect_tab_bar'

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
        this.state = {
            currentTab: DONATE
        }
        this.setCurrentTab = this.setCurrentTab.bind(this)
    }

    setCurrentTab(option) {
        return e => {
            e.preventDefault()
            this.setState({currentTab: option})
        }
    }

    render() {
        const { currentTab} = this.state
        return (
            <div className="connect-component-container">
                <ConnectTabBar currentTab={currentTab} setCurrentTab={this.setCurrentTab} tabBarOptions={Object.values(tabBarOptions)}/>
                {currentTab}
            </div>
        )
    }
}

export default ConnectComponent