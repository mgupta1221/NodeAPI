const express = require('express');
const bcrypt = require('bcrypt');
const config = require('config');
const { User } = require('../models/user');
const auth = require('../middlewares/auth');

const router = express.Router();


// this route is protected with auth middleware
router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
});

// Registering a user route
// This route will register a new user basis unique email. If already present than will 
router.post('/', async (req, res) => {

    try {
        //Checking if user already exists, notice we use 'await'
        var existingUser = await User.findOne({ email: req.body.email });

        if (existingUser) {
            return res.status(400).send('User already registered');
        }
        //Generating salt
        const salt = await bcrypt.genSalt(10);
        //Generating hashed password using salt with bcrypt npm package'
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });
        // Storing user object in DB
        let u = await user.save();

        //Generate JWT Token and return it in header
        const token = user.generateAuthToken();
        // All custom header should be prefixed with x
        return res.header('x-auth-token', token).status(200).send(u);
    }
    catch (err) {
        console.log(err);
    }

});

module.exports = router;