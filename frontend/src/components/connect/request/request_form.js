import React, { useState } from 'react'
import './request_form.scss'

function RequestForm(props) {
    const [item, setItem] = useState("")
    const [description, setDescription] = useState("")

    function handleSubmit(e) {
        e.preventDefault()
        props.createRequest({item, description})
    }

    return (
        <div className="request-form-container">
            <form className="request-form" onSubmit={handleSubmit}>
                <h1 className="request-form-header">Make a New Item Request</h1>
                <div className="request-form-fields">
                    <div className="request-input item">
                        <label>Item: </label>
                        <input  type="text"
                                value={item}
                                onChange={(e)=>setItem(e.target.value)}
                                placeholder="Item Field"
                        />
                    </div>
                    <div className="request-input">
                        <label>Description: </label>
                        <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Why do you need this item"
                        />
                    </div>
                    <div className="request-submit">
                        <input className="request-submit-btn" type="submit" value="Request Item" />
                    </div>
                </div>
            </form>

        </div>
    )
}

export default RequestForm