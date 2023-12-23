const router = require('express').Router();
const userController = require('../controllers/user_controller');
const { check } = require('express-validator');

router.post('/signup',[
    check("email","Please provide a valid email address").isEmail(),
    check("password","Password should be a minimum of 6 characters").isLength({
        min: 6
    })
] ,userController.create); // creating the user

router.post('/signin', userController.signin); // signing the user

module.exports = router;