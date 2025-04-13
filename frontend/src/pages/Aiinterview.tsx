import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton, IonLoading } from '@ionic/react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './Aiinterview.css';

const Aiinterview: React.FC = () => {
  const [jobRole, setJobRole] = useState('');
  const [experience, setExperience] = useState('');
  const [techStack, setTechStack] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const history = useHistory();

  const startInterview = async () => {
    setLoading(true); // Show spinner
    try {
      const response = await axios.post("http://localhost:5000/generate-questions", { jobRole, experience, techStack });
      history.push('/interview', {
        questions: response.data.questions,
        jobRole, 
        experience, 
        techStack
      });
    } catch (error) {
      console.error("Error starting interview:", error);
    } finally {
      setLoading(false); // Hide spinner when done
    }
  };



  return (
    <IonPage>
       
      <IonHeader>
        <IonToolbar>
          <IonTitle>Interview Prep</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <br></br>
        <br></br>
        <br></br>
        <IonInput placeholder="Job Role" value={jobRole} onIonChange={(e) => setJobRole(e.detail.value!)} />
        <IonInput placeholder="Years of Experience" type="number" value={experience} onIonChange={(e) => setExperience(e.detail.value!)} />
        <IonInput placeholder="Tech Stack" value={techStack} onIonChange={(e) => setTechStack(e.detail.value!)} />
        <IonButton expand="full" onClick={startInterview}>Start Interview</IonButton>
        <IonLoading isOpen={loading} message="Generating questions..." />
     </IonContent>
    </IonPage>
  );
};

export default Aiinterview;
