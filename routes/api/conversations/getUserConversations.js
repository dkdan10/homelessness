const Conversation = require('../../../models/Conversation');
const User = require('../../../models/User');
const Message = require('../../../models/Message');
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
        let allConversationIds = []
        
        conversations.forEach(function (conversation) {
            conversationsResponse["conversations"][conversation._id] = {
                _id: conversation._id,
                participants: conversation.participants,
                messages: []
            }
            allConversationUsersIds = allConversationUsersIds.concat(conversation.participants)
            allConversationIds = allConversationIds.concat([conversation._id])
        });

        User.find({ _id: allConversationUsersIds }).then((users) => {
            users.forEach(user => {
                conversationsResponse["users"][user._id] = {
                    _id: user._id,
                    username: user.username,
                }
            })
            Message.find({ conversationId: allConversationIds }).then(messages => {
                messages.forEach(message => {
                    conversationsResponse["conversations"][message.conversationId].messages.push({
                        senderId: message.senderId,
                        message: message.message,
                        conversationId: message.conversationId,
                        timestamp: message.timestamp
                    })
                })
                res.send(conversationsResponse);
            })
        })

    })
}