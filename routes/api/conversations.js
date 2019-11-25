const express = require("express")
const router = express.Router()

const handleCreateConversation = require("./conversations/createConversation")
const handleGetAllConversations = require("./conversations/getUserConversations")

const passport = require('passport');

router.post('/create', passport.authenticate('jwt', { session: false }), handleCreateConversation)

router.get('/all', passport.authenticate('jwt', { session: false }), handleGetAllConversations)

module.exports = router;
