const Conversation = require('../../../models/Conversation');
// const keys = require('../../../config/keys');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

const validateConversationInput = require('../../../validation/conversation');

module.exports = function (req, res) {
    console.log("hit conversation post backend")
    // VALIDATIONS HERE
    const newConversation = new Conversation({
        participants: req.body.participants,
    })

    newConversation.save().then(conversation => {
        console.log("Saved conversation: ", conversation)
        res.json({
            conversation: {
                _id: conversation._id,
                participants: conversation.participants,
            }
        })
    })
        .catch(err => console.log("Err saving Conversation: ", err));
}