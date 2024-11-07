import React, { useState, useEffect } from "react";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonItem, IonLabel, IonButton, IonText } from '@ionic/react';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom'; // Use useHistory for React Router v5

const ResetPassword: React.FC = () => {
    const history = useHistory(); // Use useHistory here
    const location = useLocation();

    // Get the token from the URL query params
    const token = new URLSearchParams(location.search).get('token');

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (password.length < 8) {
            setError("Passwords must be at least 8 characters long");
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/auth/reset-password', {
                token,
                newPassword: password,
            });

            setSuccess(response.data.message);
            setError('');

            setTimeout(() => history.push('/login'), 2000); // Use history.push for navigation
        } catch (err: any) {
            setError(err.response?.data?.message || "An error occurred");
        }
    };

    useEffect(() => {
        if (!token) {
            setError('Invalid or expired token');
        }
    }, [token]);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Reset Password</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <h2>Reset Password</h2>

                {error && <IonText color="danger">{error}</IonText>}
                {success && <IonText color="success">{success}</IonText>}

                <form onSubmit={handleSubmit}>
                    <IonItem>
                        <IonLabel position="stacked">New Password</IonLabel>
                        <IonInput type="password" value={password} onIonChange={(e) => setPassword(e.detail.value ?? '')} required />
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked">Confirm New Password</IonLabel>
                        <IonInput type="password" value={confirmPassword} onIonChange={(e) => setConfirmPassword(e.detail.value ?? '')} required />
                    </IonItem>

                    <IonButton expand="block" type="submit" style={{ marginTop: '20px' }}>
                        Reset Password
                    </IonButton>
                </form>
            </IonContent>
        </IonPage>
    );
};

export default ResetPassword;
