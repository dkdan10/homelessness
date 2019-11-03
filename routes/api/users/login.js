const User = require('../../../models/User');
const keys = require('../../../config/keys');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const validateLoginInput = require('../../../validation/login');

module.exports = function (req, res) {
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email })
        .then(user => {
            if (!user) {
                errors.email = 'User not found'
                return res.status(404).json(errors);
            }

            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        const payload = { id: user.id, name: user.name };

                        jwt.sign(
                            payload,
                            keys.secretOrKey,
                            // Tell the key to expire in one hour
                            { expiresIn: 3600 },
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: 'Bearer ' + token
                                });
                            });
                    } else {
                        return res.status(400).json({ password: 'Incorrect password' });
                    }
                })
        })
}