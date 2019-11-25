import React from 'react'
import './connect_tab_bar.scss'

function ConnectTabBar(props) {
    const { tabBarOptions, currentTab, setCurrentTab } = props

    function generateTabBarOptions() {
        return tabBarOptions.map((option, idx) => (
            <span key={`connect-tab-bar-${option}-${idx}`} onClick={setCurrentTab(option)} className={`tab-option ${option === currentTab ? "selected" : ""}`}>{option}</span>
        ))
    }

    return (
        <div className="connect-tab-bar">
            {generateTabBarOptions()}
        </div>
    )
}



export default ConnectTabBar