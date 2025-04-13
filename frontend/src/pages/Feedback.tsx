// import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/react';
// import { useHistory, useLocation } from 'react-router-dom';

// const Feedback: React.FC = () => {
//   const location = useLocation<{ feedback: { question: string, userAnswer: string, correctAnswer: string, feedback: string }[] }>();
//   const feedback = location.state?.feedback || [];
//   const history = useHistory();

//   return (
//     <IonPage>
//       <IonHeader>
//         <IonToolbar>
//           <IonTitle>Feedback</IonTitle>
//         </IonToolbar>
//       </IonHeader>
//       <IonContent className="ion-padding">
//         {feedback.map((f, index) => (
//           <div key={index}>
//             <h3>{f.question}</h3>
//             <p><strong>Your Answer:</strong> {f.userAnswer}</p>
//             <p><strong>Correct Answer:</strong> {f.correctAnswer}</p>
//             <p><strong>Feedback:</strong> {f.feedback}</p>
//           </div>
//         ))}
//         <IonButton expand="full" onClick={() => history.push('/')}>Finish</IonButton>
//       </IonContent>
//     </IonPage>
//   );
// };

// export default Feedback;
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/react';
import { useHistory, useLocation } from 'react-router-dom';
import "./Feedback.css";

const Feedback: React.FC = () => {
  const location = useLocation<{ feedback: { question: string, userAnswer: string, correctAnswer: string, feedback: string }[] }>();
  const feedback = location.state?.feedback || [];
  const history = useHistory();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Feedback</IonTitle>
        </IonToolbar>
      </IonHeader>
      <br></br>
      <br></br>
      <IonContent className="ion-padding">
  {feedback.length > 0 ? (
    feedback.map((f, index) => (
      <div key={index} className="feedback-card">
        <h3>{f.question}</h3>
        <p><strong>Your Answer:</strong> {f.userAnswer}</p>
        <p><strong>Correct Answer:</strong> {f.correctAnswer}</p>
        <p><strong>Feedback:</strong> {f.feedback}</p>
      </div>
    ))
  ) : (
    <p>No feedback available.</p>
  )}

  <IonButton expand="full" className="finish-btn" onClick={() => history.push('/')}>
    Finish
  </IonButton>
</IonContent>

    </IonPage>
  );
};

export default Feedback;
