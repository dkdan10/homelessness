const express = require("express")
const router = express.Router()

const handleCreateRequest = require("./requests/createRequest")
const handleGetAllRequests = require("./requests/allRequests")

const passport = require('passport');

router.post('/create', passport.authenticate('jwt', { session: false }), handleCreateRequest)

router.get('/all', handleGetAllRequests)

module.exports = router;
