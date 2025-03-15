import React, { useState, useEffect } from "react";
import { IonContent, IonButton, IonCard, IonCardHeader, IonCardTitle, IonRadioGroup, IonLabel, IonRadio, IonItem } from "@ionic/react";
import { useHistory, useParams } from "react-router";
import { fetchQuiz, QuizData } from '../services/quizService'; 
import { QuizResultsState } from "../services/quizService";
import './QuizPage.css';


const QuizPage = () => {
  const { sectionId, subTopicId } = useParams<{ sectionId: string; subTopicId: string }>();
  const [quizData, setQuizData] = useState<QuizData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>(new Array(quizData?.length || 0).fill(''));
  const [markedForReview, setMarkedReview] = useState<boolean[]>(new Array(quizData?.length || 0).fill(false));
  const [timePerQuestion, setTimePerQuestion] = useState<number[]>(new Array(quizData?.length || 0).fill(0));
  const [startTime , setStartTime] = useState<number[]>([]);

  const history = useHistory();

  // Fetching the quiz data from the backend
  useEffect(() => {
    const loadQuizData = async () => {
      try {
        const data = await fetchQuiz(sectionId, subTopicId);
        setQuizData(data);
        setLoading(false);

        const initailAnswers = new Array(data.length).fill('');
        const initialMarkedForReview = new Array(data.length).fill(false);
        const initailTimePerQuestion = new Array(data.length).fill(0);
        const initialStartTimes = new Array(data.length).fill(Date.now());

        setAnswers(initailAnswers);
        setMarkedReview(initialMarkedForReview);
        setTimePerQuestion(initailTimePerQuestion);
        setStartTime(initialStartTimes);
      } catch (error) {
        console.error('Failed to load quiz:', error);
      }
    };

    loadQuizData();
  }, [sectionId, subTopicId]);

  if (loading) return <div>Loading...</div>;

  const currentQuestion = quizData![currentQuestionIndex]; // Since quizData is not null here

  const handleNext = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleSave = (answer: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = answer;
    setAnswers(updatedAnswers);

    setTimePerQuestion((prev) => {
      const timeTaken = (Date.now() - startTime[currentQuestionIndex]) / 1000;
      const updatedTime = [...prev];
      updatedTime[currentQuestionIndex] = timeTaken;
      return updatedTime;
    });

    handleNext();
  };

  const handleAnswerChange = (value: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = value;
    setAnswers(updatedAnswers);
  };

  const handleMarkForReview = () => {
    const updatedMarkedForReview = [...markedForReview];
    updatedMarkedForReview[currentQuestionIndex] = !updatedMarkedForReview[currentQuestionIndex];
    setMarkedReview(updatedMarkedForReview);
  };

  const handleSkip = () => {
    handleNext();
  };

  const handleFinishQuiz = () => {
    const quizResultState: QuizResultsState = {
      answers,
      timePerQuestion,
      questions: quizData!,
    };
    history.push(`/results/${sectionId}/${subTopicId}`, { quizResults: quizResultState });
  };

  return (
    <IonContent className="quiz-container">
      <IonCard className="quiz-card">
        <IonCardHeader className="quiz-card-header">
          <IonCardTitle>
            {currentQuestionIndex + 1}. {currentQuestion.question}
          </IonCardTitle>
        </IonCardHeader>

        <IonRadioGroup
          className="quiz-options"
          value={answers[currentQuestionIndex]}
          onIonChange={(e) => handleAnswerChange(e.detail.value)}
        >
          {currentQuestion.options.map((option, index) => (
            <IonItem key={index} lines="none">
              <IonLabel>{option}</IonLabel>
              <IonRadio slot="start" value={option} />
            </IonItem>
          ))}
        </IonRadioGroup>

        <div className="actions">
          <IonButton onClick={handleSkip}>Skip</IonButton>
          <IonButton onClick={handleMarkForReview}>
            {markedForReview[currentQuestionIndex] ? "Unmark For Review" : "Mark For Review"}
          </IonButton>
          <IonButton onClick={() => handleSave(answers[currentQuestionIndex])}>Save and Next</IonButton>
        </div>
      </IonCard>

      {currentQuestionIndex === quizData!.length - 1 && (
        <IonButton className="finish-button" expand="block" onClick={handleFinishQuiz}>
          Finish Quiz
        </IonButton>
      )}
    </IonContent>
  );
};

export default QuizPage;
