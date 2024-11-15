import React from "react";
import { IonContent , IonCard , IonCardHeader , IonCardTitle, IonCardSubtitle , IonIcon , IonButton} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import sections from "../data/sections";
import './Dashboard.css';

const Dashboard = () => {
    const history = useHistory();

    const navigateToQuiz = (sectionId: any) => {
        history.push(`/quiz/${sectionId}`);
    };

    return(
        <IonContent>
            <h1 className="dashboard-header">Quiz Dashboard</h1>
            <div className="dashboard-container">
                {sections.map((section)=>(
                    <IonCard key={section.id} className="dashboard-card">
                        <IonCardHeader>
                            <IonIcon icon={section.icon} className="dashboard-card-icon" />
                            <IonCardTitle>{section.name}</IonCardTitle>
                            <IonCardSubtitle>{section.description}</IonCardSubtitle>
                        </IonCardHeader>
                        <IonButton expand="block" className="dashboard-card-button" onClick={() => navigateToQuiz(section.id)}>
                            Start 
                        </IonButton>
                    </IonCard>
                ))}
            </div>
        </IonContent>
    );
};

export default Dashboard;