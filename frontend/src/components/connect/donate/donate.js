import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import './donate.scss'

function Donate(props) {
    const { requests, getAllRequests } = props
    // getAllRequests();

    // Maybe import this from the overlayying container. 
    useEffect(() => {
        getAllRequests();
    }, [getAllRequests])

    const requestLis = createRequestLis(requests, props.history)
    
    return (
        <div className="donate-container">
            <ul className="donate-list">
                {requestLis}
            </ul>
        </div>
    )
}

function createRequestLis(requests, history) {
    return requests.map(request => {
        return(
            <li className="donate-list-item" key={request._id}>
                <h1 className="donate-item">Item: {request.item}</h1>
                <h1 className="donate-description">Description: {request.description}</h1>
                <h1 className="donate-user">UserId: {request.userId}</h1>
                <button onClick={handleStartConvo(history)(request.userId)} className="convo-btn">Start a Convo</button>
            </li>
        )
    })
}

function handleStartConvo(history) {
    return userId => {
        return e => {
            e.preventDefault()
            history.push(`/connect/chats/${userId}`)
        }
    }
}

export default withRouter(Donate)