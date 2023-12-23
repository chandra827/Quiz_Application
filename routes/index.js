const express = require('express');
const router = express.Router();
const checkAuth = require('../config/authMiddleware');
const quizController = require('../controllers/quiz_controller');

router.get('/', quizController.home);
router.use('/auth', require('./auth')); // authenticating the user

// using checkAuth middleware to validate a user's access
router.post('/quizzes', checkAuth , quizController.create); // creating a quiz
router.get('/quizzes/active', checkAuth, quizController.getAciveQuizzes); // getting active quizzes
router.get('/quizzes/all', checkAuth, quizController.getAllQuizzes); // getting all quizzes
router.get('/quizzes/:id/result', checkAuth, quizController.getResult); // getting results

module.exports = router;