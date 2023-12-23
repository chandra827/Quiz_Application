const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; // retrieving the token
    
        if (!token) {
            return res.status(401).json({error: "No token found"}); // if no token was present
        }

        let user = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET); // verifying the user

        req.user = user.email;
        next();
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}