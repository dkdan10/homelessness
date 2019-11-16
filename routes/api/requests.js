const express = require("express")
const router = express.Router()

const handleCreateRequest = require("./requests/createRequest")

const passport = require('passport');

router.post('/create', passport.authenticate('jwt', { session: false }), handleCreateRequest)

module.exports = router;
