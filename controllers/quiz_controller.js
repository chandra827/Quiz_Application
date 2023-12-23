const Quiz = require('../models/quizzes');

module.exports.home = (req, res) => {
    res.send('Server is live now!');
}

module.exports.create = async (req, res) => {
    try {
        let quiz = req.body;
        let startDate = new Date(quiz.startDate);
        let endDate = new Date(quiz.endDate);

        // if start or date is not specified according to ISO format then it will throw an error
        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            return res.status(400).json({error: 'Start or end date is invalid'});
        }

        // start and end date can't be same
        if (startDate === endDate) {
            return res.status(400).json({error: 'Start and end date can\'t be same'});
        }

        // end date can't be smaller or equals to current date
        if (endDate <= new Date()) {
            return res.status(400).json({error: "End date must be bigger than local date and time"});
        }
        
        // if start date is bigger than end date
        if (startDate > endDate) {
            return res.status(400).json({error: "End date must be bigger than start date"});
        }
        
        // if right answer index is not into the options array
        if (quiz.rightAnswer >= quiz.options.length) {
            return res.status(400).json({error: "right answer should be between options index"});
        }

        let quizExists = await Quiz.findOne({title: quiz.title}); // if the same quiz exists in database
        
        if (quizExists) {
            return res.status(400).json({error: "This quiz already exists"});
        }
        let validatedQuiz = new Quiz(quiz);
        await validatedQuiz.save(); // saving the new quiz in the database
        return res.status(201).json({message: "Quiz created successfully"});
    } catch (err) {
        return res.status(400).json({message: err.message});
    }
}

module.exports.getAciveQuizzes = async (req, res) => {
    try {
        // finding all active quizzes 
        let activeQuizzes = await Quiz.find({
            status: 'active'
        });
        return res.status(200).json(activeQuizzes);
    } catch (err) {
        return res.status(500).json({error: err.message});
    }
}

module.exports.getAllQuizzes = async (req, res) => {
    try {
        let allQuizzes = await Quiz.find({}); // finding all quizzes
        return res.status(200).json(allQuizzes);
    } catch (err) {
        return res.status(500).json({error: err.message});
    }
}

module.exports.getResult = async (req, res) => {
    try {
        let quiz = await Quiz.findById({_id: req.params.id});
        let currentDate = new Date();
        //console.log(quiz.title);
        if (quiz.endDate > currentDate) {
            return res.status(400).json({error: "Quiz has not ended it"});
        }
        if (currentDate - quiz.endDate < (5*60*1000)) { // one has to wait for 5 min
            return res.status(400).json({error: `Wait for ${(currentDate-quiz.endDate)/(60*1000)}`});
        }
        return res.status(200).json({answer: quiz.options[quiz.rightAnswer]});
    } catch (err) {
        return res.status(500).json({error: err.message});
    }
}