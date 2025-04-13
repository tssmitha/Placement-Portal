import React, { useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonCard,
  IonCardContent,
  IonLoading,
} from "@ionic/react";
import axios from "axios";
import "./atsScore.css";

const ATSScore: React.FC = () => {
  const [resume, setResume] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState<string>("");
  const [score, setScore] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false); // Handle file selection

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResume(e.target.files[0]);
    }
  }; // Handle API upload

  const handleUpload = async () => {
    if (!resume || !jobDescription) {
      setError("Please upload a resume and enter a job description.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("job_description", jobDescription);

    setIsLoading(true); // Start loading

    try {
      const response = await axios.post(
        "http://localhost:5000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.score) {
        setScore(response.data.score);
        setError(null);
      } else if (response.data.error) {
        setError(response.data.error);
      }
    } catch (err) {
      setError("Error uploading file. Please try again.");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <IonPage>
      {" "}
      <IonHeader>
       {" "}
        <IonToolbar>
          <IonTitle>ATS Resume Score Finder</IonTitle>   {" "}
        </IonToolbar>
          {" "}
      </IonHeader>
        {" "}
        <br></br>
        <br></br>
        <br></br>
      <IonContent className="ion-padding">
           {" "}
        <div className="ats-container">
         {" "}
          <IonItem>
            {" "}
            <IonLabel position="stacked">Upload Resume (PDF)</IonLabel>
            {" "}
            <input type="file" accept=".pdf" onChange={handleResumeUpload} /> 
              {" "}
          </IonItem>
         {" "}
          <IonItem>
             <IonLabel position="stacked">Job Description</IonLabel>
            {" "}
            <IonInput
              placeholder="Enter job description here..."
              value={jobDescription}
              onIonChange={(e) => setJobDescription(e.detail.value!)}
            />
           {" "}
          </IonItem>
         {" "}
          <IonButton
            expand="block"
            onClick={handleUpload}
            disabled={!resume || !jobDescription || isLoading}
          >
             {isLoading ? "Loading..." : "Get ATS Score"}    {" "}
          </IonButton>
          {error && <p className="error">{error}</p>}    {" "}
          {score !== null && (
            <IonCard>
               {" "}
              <IonCardContent>
                   <h2>Your Resume Score: {score}%</h2>
                 {" "}
                {score >= 80 ? (
                  <p className="success">
                    Your resume is a great match for the job!
                  </p>
                ) : (
                  <p className="improve">
                    Consider improving your resume for better results.
                  </p>
                )}
                 {" "}
              </IonCardContent>
              {" "}
            </IonCard>
          )}
             {" "}
        </div>
            <IonLoading isOpen={isLoading} message={"Please wait..."} /> 
        {" "}
      </IonContent>
       {" "}
    </IonPage>
  );
};

export default ATSScore;
