const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const JWT_SECRET = "sm$clg@va";

//Create a User using: POST "/api/auth/". No login Required
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'password must be at least 8 characters').isLength({ min: 8 })
], async (req, res) => {
    try {
        //If there are errors return Bad request and return the errors 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        //check whether the user with this email already exists.
        let user = await User.findOne({ email: req.body.email });
        if (user != null) {
            return res.status(400).json({ error: 'email already taken!' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashPassword
        })

        const data = {
            user: {
                id: user.id
            }
        }
        var authToken = jwt.sign(data, JWT_SECRET);
        return res.status(200).json({ "authToken": authToken });
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).send("some error occured!");
    }
})

module.exports = router;