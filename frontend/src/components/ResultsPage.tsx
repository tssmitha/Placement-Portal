import React from "react";
import { IonContent, IonCard , IonCardHeader, IonCardTitle, IonButton, IonItem ,IonLabel} from "@ionic/react";
import { useLocation } from "react-router";
import { QuizResultsState } from "../services/quizService";
import './ResultsPage.css';

interface Question { 
    id : string,
    question : string;
    options : string[];
    answer : string;
}

const ResultPage = () => {
    const location = useLocation();
    const state =  location.state as QuizResultsState;

    if(!state){
        return <div>No results found.</div>
    }

    const { answers , timePerQuestion , questions} = state;

    const calculateScore = () => {
        let score = 0;
        answers.forEach((answer,index) => {
            if (answer === questions[index].answer) score++;
        });
        return score;
    };

    const calculateAvgTime = () =>{
        const totalTime = timePerQuestion.reduce((acc, time) => acc + time , 0);
        return totalTime / timePerQuestion.length;
    };

    const score = calculateScore();
    const avgTime = calculateAvgTime();

    return(
        <IonContent>
            <IonCard>
                <IonCardHeader>
                    <IonCardTitle>QUiz Results</IonCardTitle>
                </IonCardHeader>
                <div className="result-summary">
                    <p><strong>Score : </strong>{score}/{questions.length}</p>
                    <p><strong>Average Time Per Question : </strong>{avgTime.toFixed(2)} seconds</p>
                </div>
                <div className="questions-breakdown">
                    {questions.map((question, index) => {
                        const userAnswer = answers[index];
                        const isCorrect = userAnswer === question.answer;
                        const timeTaken = timePerQuestion[index];

                        return(
                            <IonItem key={question.id} lines="full">
                                <IonLabel>
                                    <h3>{index + 1}.{question.question}</h3>
                                    <p><strong>Your Answer : </strong>{userAnswer}</p>
                                    <p><strong>Status : </strong>{isCorrect ? "Correct" : "Incorrect"}</p>
                                    <p><strong>Time Taken : </strong>{timeTaken.toFixed(2)}</p>
                                </IonLabel>
                            </IonItem>
                        );
                    })}
                </div>

                <div className="actions">
                    <IonButton onClick={() => window.location.reload()}>Retake Quiz</IonButton>
                </div>
            </IonCard>
        </IonContent>
    );
};

export default ResultPage;