import React, { useState, useEffect } from 'react'
import './donate.scss'

function Donate(props) {
    const { requests, getAllRequests } = props
    // getAllRequests();

    useEffect(() => {
        getAllRequests();
    }, "Mount")

    const requestLis = createRequestLis(requests)
    
    return (
        <div className="donate-container">
            <ul className="donate-list">
                {requestLis}
            </ul>
        </div>
    )
}

function createRequestLis(requests) {
    return requests.map(request => {
        return(
            <li className="donate-list-item" key={request._id}>
                <h1>Item: {request.item}</h1>
                <h1>Description: {request.description}</h1>
                <h1>UserId: {request.userId}</h1>
            </li>
        )
    })
}

export default Donate