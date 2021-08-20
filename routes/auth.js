const express = require('express');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const { User } = require('../models/user');
const router = express.Router();

//User Login
router.post('/', async (req, res) => {

    try {

        //validating schema via 'Joi'
        const { error } = validate(req.body);
        if (error) { return res.status(400).send(error.details[0].message); }

        //Checking if user already exists, notice we use 'await'
        let user = await User.findOne({ email: req.body.email });
        if (!user) { return res.status(400).send('Invalid Email or password'); }

        // Comparing Request Password with Hashed password stored in database
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).send('Invalid passwrd');

        //fetching Private Key from json config file using 'config' npm package
        const configPrivateKey = config.get('jwtPrivateKey'); 
        console.log(configPrivateKey);  //'mySecretkey'

       
        // If password and email passed in request are valid, Generate JWT Token and return it, 
        // encapsulated method
        const token = user.generateAuthToken();
        res.send(token);
    }
    catch (err) {
        console.log(err);
    }

});

function validate(req) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    });

    return schema.validate(req);
}

module.exports = router;