import React, { useState } from "react";
import { IonContent, IonPage, IonInput, IonButton, IonItem, IonLabel } from '@ionic/react';

// Define the custom event interface
interface IonInputCustomEvent extends CustomEvent {
  detail: {
    value: string | undefined; // Adjust this if you want a stricter type
  };
}

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e: IonInputCustomEvent) => {
    setEmail(e.detail.value ?? '');
  };

  const handlePasswordChange = (e: IonInputCustomEvent) => {
    setPassword(e.detail.value ?? '');
  };

  const handleLogin = () => {
    console.log('Logging in with', email, password);
    // Here you would typically handle the login logic
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
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
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
