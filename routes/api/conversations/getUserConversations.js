const Conversation = require('../../../models/Conversation');
// const keys = require('../../../config/keys');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');


module.exports = function (req, res) {
    console.log("hit getUserConversations backend")
    Conversation.find({ participants: req.user.id } , function (err, conversations) {
        if (err) {
            return res.status(400).json(err)
        }
        const conversationsResponse = { conversations: {} };
        
        conversations.forEach(function (conversation) {
            conversationsResponse["conversations"][conversation._id] = {
                _id: conversation._id,
                participants: conversation.participants
            }
        });

        res.send(conversationsResponse);
    })
}