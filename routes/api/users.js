const express = require("express");
const router = express.Router();

const handleRegister = require("./users/register")
const handleLogin = require("./users/login")
const getCurrentUser = require("./users/current")

router.get("/test", (req, res) => res.json({ msg: "This is the users route" }));

router.post('/register', handleRegister)

router.post('/login', handleLogin)

router.get('/current', ...getCurrentUser)


module.exports = router;
