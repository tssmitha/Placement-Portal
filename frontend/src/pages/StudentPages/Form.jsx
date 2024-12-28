import React, { useState, useEffect } from 'react';
import {
  IonPage,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonSpinner,
} from '@ionic/react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const StudentForms = () => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  // Fetch forms on component load
  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/release-forms'); // Backend endpoint for forms
        setForms(response.data); // Ensure backend sends correct form data
      } catch (err) {
        console.error('Error fetching forms:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchForms();
  }, []);

  const handleFormClick = (formId) => {
    // Navigate to the specific form's page using formId
    console.log(formId);
    history.push(`/student-form/${formId}`);
  };

  return (
    <IonPage>
      <IonContent>
        <h1>Available Forms</h1>
        {loading ? (
          <IonSpinner />
        ) : forms.length > 0 ? (
          <IonList>
            {forms.map((form) => (
              <IonItem
                key={form._id}
                button
                onClick={() => handleFormClick(form._id)}
              >
                <IonLabel>
                  <h2>Form ID: {form._id}</h2>
                  <p>Released At: {new Date(form.submittedAt).toLocaleString()}</p>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        ) : (
          <p>No forms available.</p>
        )}
      </IonContent>
    </IonPage>
  );
};

export default StudentForms;
