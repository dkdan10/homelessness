import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import './talk.scss'

function Talk(props) {
    // const { chatUserId } = props
    const { chatUserId, setChatUserId } = props


    return (
        <div className="tak-container">
            <span>Chat With: {chatUserId}</span>
            <div onClick={setChatUserId("DANIEL")}>SET CHAT WITH DANIEL</div>
            <div onClick={setChatUserId("ALEX")}>SET CHAT WITH ALEX</div>
            <div onClick={setChatUserId("ANNA")}>SET CHAT WITH ANNA</div>
            <div onClick={setChatUserId("SPENCE")}>SET CHAT WITH SPENCE</div>
        </div>
    )
}

export default withRouter(Talk)