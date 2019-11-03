const User = require('../../../models/User');
const keys = require('../../../config/keys');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const validateRegisterInput = require('../../../validation/register');

module.exports = function (req, res) {
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    // Check to make sure nobody has already registered with a duplicate email
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                // Throw a 400 error if the email address already exists
                errors.email = 'Email already exists';
                return res.status(400).json(errors)
            } else {
                // Otherwise create a new user
                const newUser = new User({
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password
                })

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(user => {
                                const payload = { id: user.id, name: user.name };

                                jwt.sign(payload,
                                    keys.secretOrKey,
                                    { expiresIn: 3600 },
                                    (err, token) => {
                                        res.json({
                                            success: true,
                                            token: "Bearer " + token
                                        });
                                    });
                            })
                            .catch(err => console.log(err));
                    })
                })
            }
        })
}