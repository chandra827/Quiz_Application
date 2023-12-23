const User = require('../models/user');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports.create = async (req, res) => {
    try {
        const { email, password } = req.body;
        //console.log(req.body.email);
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
    
        let user = await User.findOne({email: email}); // if user exists in the database
    
        if (user) {
            return res.status(400).json({error: "This user already exists"});
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
    
        await User.create({email: email, password: hashedPassword}); // creating the user

        return res.status(201).json({
            message: "Successfully created",
        });
    } catch (err) {
        return res.status(400).json({message: err.message});
    }
}

module.exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await User.findOne({email});
        if (!user) {
            return res.status(401).json({error: "Invalid credentials"}); // if user doesn't exist
        }
        
        let isMatch = await bcrypt.compare(password, user.password); // matching the password with user's password saved in database
        
        if (!isMatch) {
            return res.status(401).json({error: "Invalid credentials"}); // if password doesn't match
        }

        // creating a token and send this token to user in future use
        const token = await jwt.sign({
            email
        }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: 60*60
        });

        return res.status(200).json({token});
    } catch (err) {
        return res.status(400).json({message: err.message});
    }
}