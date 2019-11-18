const Request = require('../../../models/Request');
// const keys = require('../../../config/keys');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');


module.exports = function (req, res) {
    console.log("hit request get all backend")
    Request.find({}, function(err, requests) {
        const requestsResponse = { requests: {} };

        requests.forEach(function (request) {
            requestsResponse["requests"][request._id] = {
                _id: request._id,
                item: request.item,
                description: request.description,
                userId: request.userId
            }
            // requestsResponse[request._id] = request;
        });

        res.send(requestsResponse);
    })
}