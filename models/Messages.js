const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    senderId: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    conversaionId: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
})

module.exports = Message = mongoose.model('message', MessageSchema);
