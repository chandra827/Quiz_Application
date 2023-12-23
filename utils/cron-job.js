const cron = require('node-cron');
const Quiz = require('../models/quizzes');

cron.schedule('* * * * *', updateQuizStatus); // to update the question in every minute of every month of every week

function updateQuizStatus() {
    const currentDate = new Date();

    // updating quiz's status
    Quiz.find({})
    .then(quizzes => {
        quizzes.forEach((quiz)=> {
            if (quiz.startDate > currentDate) {
                quiz.status = 'inactive';
            } else if (quiz.endDate < currentDate) {
                quiz.status = 'finished';
            } else {
                quiz.status = 'active';
            }

            quiz.save();
        });
    })
    .catch(err=> console.error(err));
}