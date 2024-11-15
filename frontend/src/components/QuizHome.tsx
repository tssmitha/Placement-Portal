import React from "react";
import { IonContent , IonCard , IonCardHeader , IonCardTitle , IonButton} from '@ionic/react';
import { useHistory , useParams} from 'react-router-dom';
import sections from "../data/sections";
import './QuizHome.css';

const QuizHome = () =>{
    const history = useHistory();
    const { sectionId } = useParams<{ sectionId : string }>();

    const section = sections.find(sec => sec.id === sectionId);

    if(!section){
        return <IonContent><h2>Section not found</h2></IonContent>;
    }

    const navigateToQuiz = (subTopicId : string) => {
        history.push(`/quiz/${sectionId}/${subTopicId}`);
    };

    return(
        <IonContent>
            <h1 style={{textAlign : "center" , margin : "20px 0"}}>Quiz : {section.name}</h1>

            <div className="quiz-container">
                {section.subTopics?.map((subTopic) =>(
                    <IonCard key={subTopic.id} className="quiz-card-header">
                        <IonCardHeader className="quiz-card-header">
                            <IonCardTitle className="quiz-card-title">{subTopic.name}</IonCardTitle>
                        </IonCardHeader>
                        <IonButton className="quiz-button" expand="block" onClick = {() => navigateToQuiz(subTopic.id)}>
                            Start {subTopic.name} Quiz
                        </IonButton>
                    </IonCard>
                ))}
            </div>
        </IonContent>
    );
};

export default QuizHome;