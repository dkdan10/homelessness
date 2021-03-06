const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RequestsSchema = new Schema({
    item: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
})

module.exports = Request = mongoose.model('requests', RequestsSchema);
