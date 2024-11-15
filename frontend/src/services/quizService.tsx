import axios from 'axios';

export interface QuizData{
    id :string,
    question : string;
    options :string[];
    answer : string;
}

export interface QuizResultsState { 
    answers : string[];
    timePerQuestion : number[];
    questions : QuizData[];
}

export const fetchQuiz = async( sectionId:string , subTopicId: string) => {
    try{
        const response = await axios.get(`api/quizzes/${sectionId}/${subTopicId}`);
        return response.data;
    }catch(error){
        console.log('error fetching quiz',error);
        throw error;
    }
};

