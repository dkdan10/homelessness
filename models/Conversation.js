const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConversationSchema = new Schema({
    participants: {
        type: Array,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
})

module.exports = Conversation = mongoose.model('conversation', ConversationSchema);
