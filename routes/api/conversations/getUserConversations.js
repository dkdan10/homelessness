const Conversation = require('../../../models/Conversation');
const User = require('../../../models/User');
// const keys = require('../../../config/keys');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');


module.exports = function (req, res) {
    console.log("hit getUserConversations backend")
    Conversation.find({ participants: req.user.id } , function (err, conversations) {
        if (err) {
            return res.status(400).json(err)
        }
        const conversationsResponse = { conversations: {}, users: {} };

        let allConversationUsersIds = []
        
        conversations.forEach(function (conversation) {
            conversationsResponse["conversations"][conversation._id] = {
                _id: conversation._id,
                participants: conversation.participants
            }
            allConversationUsersIds = allConversationUsersIds.concat(conversation.participants)
        });

        User.find({ _id: allConversationUsersIds }).then((users) => {
            users.forEach(user => {
                conversationsResponse["users"][user._id] = {
                    _id: user._id,
                    username: user.username,
                }
            })
            res.send(conversationsResponse);
        })

    })
}