const mongoose = require('mongoose');

const UserResponseSchema = new mongoose.Schema({
    questionId : String,
    selectedAnswer : String,
    timeTaken : Number,
    markedForReview : Boolean,
});

const UserQuizSchema = new mongoose.Schema({
    userId : String,
    sectionId : String,
    subTopicId : String,
    responses : [UserResponseSchema],
    completed : Boolean,
    completionTime : Date,
});

module.exports = mongoose.model('UserQuiz', UserQuizSchema);