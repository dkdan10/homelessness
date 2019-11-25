const Conversation = require('../../../models/Conversation');
// const keys = require('../../../config/keys');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

const validateConversationInput = require('../../../validation/conversation');

module.exports = function (req, res) {
    console.log("hit conversation post backend")
    // VALIDATIONS HERE

    Conversation.findOne({ participants: { $all: req.body.participants } }).then((conversation) => {
        if (conversation) {
            sendConversation(res, conversation)
        } else {
            const newConversation = new Conversation({
                participants: req.body.participants,
            })

            newConversation.save().then(conversation => {
                console.log("Saved conversation: ", conversation)
                sendConversation(res, conversation)
            })
            .catch(err => console.log("Err saving Conversation: ", err));
        }
    })

}

function sendConversation(res, conversation) {
    res.json({
        conversation: {
            _id: conversation._id,
            participants: conversation.participants,
        }
    })
}