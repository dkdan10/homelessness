const Request = require('../../../models/Request');
// const keys = require('../../../config/keys');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

const validateRequestInput = require('../../../validation/request');

module.exports = function (req, res) {
    console.log("hit request post backend")
    // VALIDATIONS HERE
    const newRequest = new Request({
        item: req.body.item,
        description: req.body.description,
        userId: req.user.id
    })

    newRequest.save().then(request => {
        // console.log("Saved request: ", request)
        res.json({
            request: {
                _id: request._id,
                item: request.item,
                description: request.description,
                userId: request.userId
            }
        })
    })
    .catch(err => console.log("Err saving Request: ", err));
}