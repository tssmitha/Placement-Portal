const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    questions : String,
    options : [String],
    answer : String,
});

const QuizSchema = new mongoose.Schema({
    sectionId : String,
    subTopicId : String,
    questions : [QuestionSchema],
});

module.exports = mongoose.model('Quiz' , QuizSchema);