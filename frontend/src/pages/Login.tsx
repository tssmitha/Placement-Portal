import React, { useState } from "react";
import { IonContent, IonPage, IonInput, IonButton, IonItem, IonLabel, InputChangeEventDetail, IonHeader, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory } from "react-router";
import axios from "axios";
import './Login.css';
import Logo from './images.png';


// Define the custom event interface
interface IonInputCustomEvent extends CustomEvent {
  detail: InputChangeEventDetail;
}

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error , setError] = useState('');
  const history = useHistory();

  const handleEmailChange = (e: IonInputCustomEvent) => {
    setEmail(e.detail.value ?? '');
  };

  const handlePasswordChange = (e: IonInputCustomEvent) => {
    setPassword(e.detail.value ?? '');
  };

  const handleLogin = async() => {
    //console.log('Logging in with', email, password);
    setError('');

    if(!email ||!password){
      setError("Both email and password are required!");
      return;
    }

    try{
      const response  = await axios.post('http://localhost:5000/api/auth/login',{email , password});

      localStorage.setItem('token', response.data.token);

      history.push('/');
    }catch(err : any){
      setError('Invalid credentials, please try again.');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>College Placement Portal</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="login-page">

        <div className="logo-container">
          <img src={Logo} alt="college logo" className="college-logo" />
          <h2>THE NATIONAL INSTITUTE OF ENGINEERING</h2>
        </div>

        <div className="login-container">
          <h2>Login to your account</h2>
          <IonItem>
            <IonLabel position="floating">Email</IonLabel>
            <IonInput type="email" value={email} onIonChange={handleEmailChange} />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Password</IonLabel>
            <IonInput type="password" value={password} onIonChange={handlePasswordChange} />
          </IonItem>
          <IonButton expand="block" onClick={handleLogin}>
            Log In
          </IonButton>
          <div className="error-message">{error && <p>{error}</p>}</div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
