const Quiz = require('../Models/Quiz');
const UserQuiz = require('../Models/User');

exports.getQuiz = async(req,res) => {
    try{
        const { sectionID , subTopicId } = req.params;
        const quiz = await Quiz.findOne({ sectionId , subTopicId });

        if(!quiz) return res.status(404).json({ message : 'Quiz not found'});
        res.join(quiz);
    }catch(error){
        res.status(500).json({message : error.message});    
    }
};

exports.submitQuiz = async(req,res)=>{
    try{
        const {userId , sectionId, subTopicId , responses , completionTime} = req.body;

        const userQuiz = new UserQuiz({
            userId,
            sectionId,
            responses,
            completed : true,
            completionTime : new Date(completionTime),
        });

        await userQuiz.save();
        res.status(201).json({message : 'Quiz submitted successfully'});
    }catch(error){
        res.status(500).json({message : error.message});
    }
};