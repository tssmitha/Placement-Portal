import React , {useState} from "react";
import { IonContent , IonPage , IonHeader , IonToolbar , IonTitle , IonInput , IonLabel , IonItem , IonButton , IonSelect , IonSelectOption } from "@ionic/react";
import axios from 'axios';

const ReleaseForm = () => {
    const [formData, setFormData] = useState({
        jobDescription: null,
    });

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleFileUpload = (e) => {
        const { name } = e.target;
        const file = e.target.files[0];
        setFormData({ ...formData, [name] : file});
      };
    
      const handleSubmit = async () => {
        // Validate and submit form data here
        console.log(formData);
        const formSubmissionData = new FormData();
        formSubmissionData.append("jdFile" , formData.jobDescription);

        try{
          const response = await axios.post('http://localhost:5000/api/admin/release' , formSubmissionData, {
            headers : {
              'Content-Type' : 'multipart/form-data',
            },
          });
          console.log(response.data);
        }catch(error){
          console.error('Error releasing form : ', error.response?.data || error.message );
        }
      };
    
      return (
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Release Form</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
              <IonItem>
                <IonLabel position="stacked">Job Description</IonLabel>
                <input
                type="file"
                name="jobDescription"
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
                required
                />
              </IonItem>
              
    
              <IonButton expand="block" type="submit">
                Release Form
              </IonButton>
            </form>
          </IonContent>
        </IonPage>
      );
    };

export default ReleaseForm;