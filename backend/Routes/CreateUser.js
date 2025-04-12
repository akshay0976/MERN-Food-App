const express = require('express');

const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
// const { useLoaderData } = require('react-router-dom');
// const { trusted } = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const jwtSecret = "MynameisEndtoEndYouTubeChannel$#";

router.post("/createuser", [
    body('email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password', 'Incorrect Password').isLength({ min: 5 })],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password, salt)
        try {
            await User.create({
                name: req.body.name,
                password: secPassword,
                email: req.body.email,
                location: req.body.location
            })
            res.json({ success: true })
        } catch (err) {
            // res.status(400).json({ message: err.message })
            console.error(err)
            res.json({ success: false })
        }
    })

router.post("/loginuser", [
    body('email').isEmail(),
    body('password', 'Incorrect Password').isLength({ min: 5 })], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let email = req.body.email;

        try {
            let userData = await User.findOne({ email });
            if (!userData) {
                return res.status(400).json({ errors: "User Not Found!" });
            }
            const pwdCompare = await bcrypt.compare(req.body.password, userData.password)
            if (!pwdCompare) {
                return res.status(400).json({ errors: "Try logging with correct credentials" });
            }
            const data = {
                user: {
                    id: userData._id
                }
            }
            const authToken = jwt.sign(data, jwtSecret);
            return res.json({ success: true, authToken });

        } catch (err) {
            // res.status(400).json({ message: err.message })
            console.error(err)
            res.json({ success: false })
        }
    })

module.exports = router;