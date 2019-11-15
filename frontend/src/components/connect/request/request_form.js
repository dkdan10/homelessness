import React, { useState } from 'react'

function RequestForm(props) {
    const [item, setItem] = useState("")
    const [description, setDescription] = useState("")

    function handleSubmit(e) {
        e.preventDefault()
        console.log("Item: ", item, "Description: ", description)
    }

    return (
        <div className="request-form-container">
            <form onSubmit={handleSubmit}>
                <h1>Make a New Item Request</h1>
                <div className="request-form-fields">
                    <div className="request-input">
                        <label>Item</label>
                        <input  type="text"
                                value={item}
                                onChange={(e)=>setItem(e.target.value)}
                                placeholder="Item Field"
                        />
                    </div>
                    <div className="request-input">
                        <label>description</label>
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