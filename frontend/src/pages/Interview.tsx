// import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonTextarea } from '@ionic/react';
// import { useState } from 'react';
// import { useHistory, useLocation } from 'react-router-dom';
// import axios from 'axios';

// const Interview: React.FC = () => {
//   const location = useLocation<{ questions: { question: string }[] }>();
//   const questions = location.state?.questions || [];
//   const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill(""));
//   const history = useHistory();

//   const handleSubmit = async () => {
//     try {
//       const response = await axios.post("http://localhost:5000/validate", {
//         userAnswers: answers.map((answer, index) => ({ answer })),
//       });
//       history.push('/feedback', { feedback: response.data.feedback });
//     } catch (error) {
//       console.error("Error submitting answers:", error);
//     }
//   };

//   return (
//     <IonPage>
//       <IonHeader>
//         <IonToolbar>
//           <IonTitle>Interview</IonTitle>
//         </IonToolbar>
//       </IonHeader>
//       <br></br>
//       <br></br>
//       <IonContent className="ion-padding">
//         {questions.map((q, index) => (
//           <div key={index}>
//             <h3>{q.question}</h3>
//             <IonTextarea value={answers[index]} onIonChange={(e) => {
//               const newAnswers = [...answers];
//               newAnswers[index] = e.detail.value!;
//               setAnswers(newAnswers);
//             }} />
//           </div>
//         ))}
//         <IonButton expand="full" onClick={handleSubmit}>Submit Answers</IonButton>
//       </IonContent>
//     </IonPage>
//   );
// };

// export default Interview;
// import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonTextarea } from '@ionic/react';
// import { useState } from 'react';
// import { useLocation, useHistory } from 'react-router-dom';
// import axios from 'axios';

// const InterviewPage: React.FC = () => {
//   const location = useLocation<{ questions: { question: string }[], jobRole: string, experience: string, techStack: string }>();
//   const { questions, jobRole, experience, techStack } = location.state || { questions: [], jobRole: '', experience: '', techStack: '' };
//   const history = useHistory();
  
//   const [answers, setAnswers] = useState<string[]>(new Array(questions.length).fill(''));

//   const handleAnswerChange = (index: number, value: string) => {
//     const updatedAnswers = [...answers];
//     updatedAnswers[index] = value;
//     setAnswers(updatedAnswers);
//   };

//   const submitAnswers = async () => {
//     const userAnswers = questions.map((q, index) => ({
//       question: q.question,
//       answer: answers[index]
//     }));

//     try {
//       const response = await axios.post("http://localhost:5000/validate", {
//         jobRole, 
//         experience, 
//         techStack,
//         userAnswers
//       });

//       history.push('/feedback', { feedback: response.data.feedback });
//     } catch (error) {
//       console.error("Error submitting answers:", error);
//     }
//   };

//   return (
//     <IonPage>
//       <IonHeader>
//         <IonToolbar>
//           <IonTitle>Interview Questions</IonTitle>
//         </IonToolbar>
//       </IonHeader>
//       <br></br>
//       <br></br>
//       <IonContent className="ion-padding">
//         {questions.map((q, index) => (
//           <div key={index}>
//             <h3>{q.question}</h3>
//             <IonTextarea
//               value={answers[index]}
//               onIonChange={(e) => handleAnswerChange(index, e.detail.value!)}
//               placeholder="Type your answer here..."
//             />
//           </div>
//         ))}
//         <IonButton expand="full" onClick={submitAnswers}>Submit Answers</IonButton>
//       </IonContent>
//     </IonPage>
//   );
// };

// export default InterviewPage;
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonTextarea, IonLoading } from '@ionic/react';
import { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';
import './Interview.css';
const InterviewPage: React.FC = () => {
  const location = useLocation<{ questions?: { question: string }[], jobRole?: string, experience?: string, techStack?: string }>();
  
  // Ensure safe access with default values
  const questions = location.state?.questions || [];
  const jobRole = location.state?.jobRole || '';
  const experience = location.state?.experience || '';
  const techStack = location.state?.techStack || '';

  const history = useHistory();
  
  // Ensure answers array is initialized properly
  const [answers, setAnswers] = useState<string[]>(new Array(questions.length).fill(''));
  const [loading, setLoading] = useState(false);

  const handleAnswerChange = (index: number, value: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);
  };

  const submitAnswers = async () => {
    setLoading(true); // Show loading spinner

    const userAnswers = questions.map((q, index) => ({
      question: q.question,
      answer: answers[index] || ''
    }));

    try {
      const response = await axios.post("http://localhost:5000/validate", {
        jobRole, 
        experience, 
        techStack,
        userAnswers
      });

      history.push('/feedback', { feedback: response.data.feedback });
    } catch (error) {
      console.error("Error submitting answers:", error);
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Interview Questions</IonTitle>
        </IonToolbar>
      </IonHeader>
      <br></br>
      <br></br>
      <IonContent className="ion-padding">
  {questions.length > 0 ? (
    questions.map((q, index) => (
      <div key={index} className="question-card">
        <h3>{q.question}</h3>
        <IonTextarea
          className="ion-textarea"
          value={answers[index]}
          onIonChange={(e) => handleAnswerChange(index, e.detail.value!)}
          placeholder="Type your answer here..."
        />
      </div>
    ))
  ) : (
    <p>No questions available.</p>
  )}

  <IonButton expand="full" className="submit-btn" onClick={submitAnswers} disabled={questions.length === 0}>
    Submit Answers
  </IonButton>

  <IonLoading isOpen={loading} message={'Submitting answers...'} />
</IonContent>


    </IonPage>
  );
};

export default InterviewPage;
