const Message = require('../../../models/Message');
const User = require('../../../models/User');
// const keys = require('../../../config/keys');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

const validateMessageInput = require('../../../validation/message');

module.exports = function (req, res) {
    console.log("hit conversation post backend")
    // VALIDATIONS HERE

    const newMessage = new Message({
        message: req.body.message,
        senderId: req.body.senderId,
        conversationId: req.body.conversationId
    })

    newMessage.save().then(message => {
        res.json({
            message: {
                message: message.message,
                senderId: message.senderId,
                conversationId: message.conversationId
            }
        })
    })

}