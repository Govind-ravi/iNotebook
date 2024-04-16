const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { query, body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')

const secreteKey = "iNotebookUser"

router.post('/createuser', [
    body('name', 'Entre a valid name of minimum 3 characters').isLength({ min: 3 }),
    body('userName', 'Choose a unique UserName of minimum 5 characters').isLength({ min: 5 }),
    body('password', 'Password must be minimum 5 characters').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {

        let user = await User.findOne({ userName: req.body.userName })
        if (user) {
            return res.status(400).json({ "error": "Username already exits" })
        }
        const salt = bcrypt.genSaltSync(10);
        const secretePassword = bcrypt.hashSync(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            userName: req.body.userName,
            password: secretePassword,
        });
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, secreteKey)
        res.json({ authToken })
    } catch (error) {
        res.status(500).send(error.message)
    }
})
router.post('/userlogin', [
    body('userName', 'Choose a unique UserName of minimum 5 characters').isLength({ min: 5 }),
    body('password', 'Password must be minimum 5 characters').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { userName, password } = req.body;
    try {

        let user = await User.findOne({ userName: userName })
        if (!user) {
            return res.status(400).json({ "error": "Incorrect credentials" })
        }
        const passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            return res.status(400).json({ "error": "Incorrect credentials" })
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, secreteKey)
        res.json({ authToken })
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.post('/getuser',fetchuser, async (req, res)=>{
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

module.exports = router;