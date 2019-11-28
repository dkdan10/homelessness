import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import './donate.scss'

function Donate(props) {
    const { requests, getAllRequests, setChatWithUser, currentUser } = props
    // getAllRequests();

    // Maybe import this from the overlayying container. 
    useEffect(() => {
        getAllRequests();
    }, [getAllRequests])

    const requestLis = createRequestLis(requests, setChatWithUser, currentUser)
    
    return (
        <div className="donate-container">
            <ul className="donate-list">
                {requestLis}
            </ul>
        </div>
    )
}

function createRequestLis(requests, setChatWithUser, currentUser) {

    function createLiButton(request) {
        if (currentUser.id === request.userId) {
            return <button disabled onClick={(e) => e.preventDefault()} className="convo-btn">Your Own Request</button>
        } else {
            return <button onClick={setChatWithUser(request.userId)} className="convo-btn">Start a Convo</button>
        }
    }

    return requests.map(request => {
        return (
            <li className="donate-list-item" key={request._id}>
                <h1 className="donate-item">Item: {request.item}</h1>
                <h1 className="donate-description">Description: {request.description}</h1>
                <h1 className="donate-user">UserId: {request.userId}</h1>
                {createLiButton(request)}
            </li>
        )
    })
}

export default withRouter(Donate)