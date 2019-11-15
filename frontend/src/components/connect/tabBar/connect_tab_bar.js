import React from 'react'
import './connect_tab_bar.scss'

function ConnectTabBar(props) {
    // const [currentTab, setCurrentTab] = useState(props.currentTab)

    return (
        <div className="connect-tab-bar">
            {generateTabBarOptions(props.tabBarOptions, props.currentTab, props.setCurrentTab)}
        </div>
    )
}

function generateTabBarOptions(options, currentTab, setCurrentTab) {
    return options.map((option, idx) => (
        <span key={`connect-tab-bar-${option}-${idx}`} onClick={setCurrentTab(option)} className={`tab-option ${option === currentTab ? "selected" : ""}`}>{option}</span>
    ))
}

export default ConnectTabBar