import React, { useState, useEffect } from 'react';
import { IonContent, IonPage, IonButton, IonLabel, IonItem, IonAlert, IonInput, IonSelect, IonSelectOption } from '@ionic/react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ReleaseFormPage = () => {
    const { formId } = useParams(); // Get formId from URL parameters

    const [formData, setFormData] = useState({
        name: '',
        usn: '',
        dateOfBirth: '',
        degree: '',
        yearOfPassing: '',
        phoneNumber: '',
        personalEmail: '',
        resumeLink: '',
        jdFile: '', // JD file URL
        cgpa: '', // BTech/MTech CGPA
        branch: '', // BTech/MTech branch
        education: {
            tenth: { passingYear: '', percentage: '' },
            twelfth: { passingYear: '', percentage: '' },
        },
    });

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    // Fetch form data when the component mounts
    useEffect(() => {
        console.log('Form ID from URL:', formId); 
        const fetchFormData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/admin/release-form/${formId}`);
                console.log(response.data);
                if (response.status === 200) {
                    setFormData(response.data); // Assuming response.data contains all fields, including jdFile
                }
            } catch (err) {
                console.error('Error fetching form data', err);
                setAlertMessage('Failed to load the form. Please try again');
                setShowAlert(true);
            }
        };

        fetchFormData();
    }, [formId]);

    // Handle JD file download
    const handleDownloadJD = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/admin/download-jd/${formId}`, {
                responseType: 'blob',
            });
            const file = new Blob([response.data], { type: 'application/pdf' });
            const fileURL = URL.createObjectURL(file);
            const link = document.createElement('a');
            link.href = fileURL;
            link.download = 'JobDescription.pdf';
            link.click();
        } catch (err) {
            console.error('Error downloading JD:', err);
            setAlertMessage("Failed to download the JD file. Please try again.");
            setShowAlert(true);
        }
    };

    const handleSubmitForm = async () => {
        if (!formData.name || !formData.usn || !formData.dateOfBirth || !formData.degree || !formData.yearOfPassing || !formData.phoneNumber || !formData.personalEmail || !formData.resumeLink || !formData.cgpa || !formData.branch || !formData.education.tenth.passingYear || !formData.education.tenth.percentage || !formData.education.twelfth.passingYear || !formData.education.twelfth.percentage) {
            setAlertMessage('Please fill in all the required fields.');
            setShowAlert(true);
            return;
        }

        try {
            const response = await axios.post(`http://localhost:5000/api/student/submit-form/${formId}`, formData);
            if (response.status === 200) {
                setAlertMessage('Form submitted successfully!');
                setShowAlert(true);
            }
        } catch (err) {
            console.error('Error submitting form:', err);
            setAlertMessage('Failed to submit the form. Please try again.');
            setShowAlert(true);
        }
    };

    return (
        <IonPage>
            <IonContent>
                <h1>Form Details</h1>
    
                {/* JD Section */}
                <IonItem>
                    <IonLabel position="stacked">Job Description</IonLabel>
                    <IonButton onClick={() => window.open(formData.jdFile, '_blank')}>View JD</IonButton>
                    <IonButton onClick={handleDownloadJD}>Download JD</IonButton>
                </IonItem>
    
                {/* Student Information */}
                <IonItem>
                    <IonLabel position="stacked">Name</IonLabel>
                    <IonInput
                        value={formData.name}
                        onIonChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter your name"
                    />
                </IonItem>
    
                <IonItem>
                    <IonLabel position="stacked">USN</IonLabel>
                    <IonInput
                        value={formData.usn}
                        onIonChange={(e) => setFormData({ ...formData, usn: e.target.value })}
                        placeholder="Enter your USN"
                    />
                </IonItem>
    
                <IonItem>
                    <IonLabel position="stacked">Date of Birth</IonLabel>
                    <IonInput
                        type="date"
                        value={formData.dateOfBirth}
                        onIonChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                    />
                </IonItem>
    
                <IonItem>
                    <IonLabel position="stacked">Degree</IonLabel>
                    <IonSelect
                        value={formData.degree}
                        onIonChange={(e) => setFormData({ ...formData, degree: e.detail.value })}
                    >
                        <IonSelectOption value="BTech">BTech</IonSelectOption>
                        <IonSelectOption value="MTech">MTech</IonSelectOption>
                    </IonSelect>
                </IonItem>
    
                <IonItem>
                    <IonLabel position="stacked">Year of Passing</IonLabel>
                    <IonInput
                        type="number"
                        value={formData.yearOfPassing}
                        onIonChange={(e) => setFormData({ ...formData, yearOfPassing: e.target.value })}
                        placeholder="Enter your year of passing"
                    />
                </IonItem>
    
                <IonItem>
                    <IonLabel position="stacked">Phone Number</IonLabel>
                    <IonInput
                        type="tel"
                        value={formData.phoneNumber}
                        onIonChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                        placeholder="Enter your phone number"
                    />
                </IonItem>
    
                <IonItem>
                    <IonLabel position="stacked">Personal Email</IonLabel>
                    <IonInput
                        type="email"
                        value={formData.personalEmail}
                        onIonChange={(e) => setFormData({ ...formData, personalEmail: e.target.value })}
                        placeholder="Enter your email"
                    />
                </IonItem>
    
                <IonItem>
                    <IonLabel position="stacked">Resume Link</IonLabel>
                    <IonInput
                        type="url"
                        value={formData.resumeLink}
                        onIonChange={(e) => setFormData({ ...formData, resumeLink: e.target.value })}
                        placeholder="Enter your resume link"
                    />
                </IonItem>
    
                {/* BTech/MTech Details */}
                {formData.degree === 'BTech' && (
                    <>
                        <IonItem>
                            <IonLabel position="stacked">BTech CGPA</IonLabel>
                            <IonInput
                                type="number"
                                step="0.1"
                                value={formData.cgpa}
                                onIonChange={(e) => setFormData({ ...formData, cgpa: e.target.value })}
                                placeholder="Enter your BTech CGPA"
                            />
                        </IonItem>
                        <IonItem>
                            <IonLabel position="stacked">BTech Branch</IonLabel>
                            <IonInput
                                value={formData.branch}
                                onIonChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                                placeholder="Enter your BTech branch"
                            />
                        </IonItem>
                    </>
                )}

                {formData.degree === 'MTech' && (
                    <>
                        <IonItem>
                            <IonLabel position="stacked">MTech CGPA</IonLabel>
                            <IonInput
                                type="number"
                                step="0.1"
                                value={formData.cgpa}
                                onIonChange={(e) => setFormData({ ...formData, cgpa: e.target.value })}
                                placeholder="Enter your MTech CGPA"
                            />
                        </IonItem>
                        <IonItem>
                            <IonLabel position="stacked">MTech Branch</IonLabel>
                            <IonInput
                                value={formData.branch}
                                onIonChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                                placeholder="Enter your MTech branch"
                            />
                        </IonItem>
                    </>
                )}

                {/* 10th and 12th Details */}
                <IonItem>
                    <IonLabel position="stacked">10th Passing Year</IonLabel>
                    <IonInput
                        type="number"
                        value={formData.education.tenth.passingYear}
                        onIonChange={(e) => setFormData({ ...formData, education: { ...formData.education, tenth: { ...formData.education.tenth, passingYear: e.target.value } } })}
                        placeholder="Enter 10th passing year"
                    />
                </IonItem>

                <IonItem>
                    <IonLabel position="stacked">10th Percentage</IonLabel>
                    <IonInput
                        type="number"
                        value={formData.education.tenth.percentage}
                        onIonChange={(e) => setFormData({ ...formData, education: { ...formData.education, tenth: { ...formData.education.tenth, percentage: e.target.value } } })}
                        placeholder="Enter 10th percentage"
                    />
                </IonItem>

                <IonItem>
                    <IonLabel position="stacked">12th Passing Year</IonLabel>
                    <IonInput
                        type="number"
                        value={formData.education.twelfth.passingYear}
                        onIonChange={(e) => setFormData({ ...formData, education: { ...formData.education, twelfth: { ...formData.education.twelfth, passingYear: e.target.value } } })}
                        placeholder="Enter 12th passing year"
                    />
                </IonItem>

                <IonItem>
                    <IonLabel position="stacked">12th Percentage</IonLabel>
                    <IonInput
                        type="number"
                        value={formData.education.twelfth.percentage}
                        onIonChange={(e) => setFormData({ ...formData, education: { ...formData.education, twelfth: { ...formData.education.twelfth, percentage: e.target.value } } })}
                        placeholder="Enter 12th percentage"
                    />
                </IonItem>
    
                <IonButton expand="full" onClick={handleSubmitForm}>Submit Form</IonButton>
    
                {/* Alert */}
                <IonAlert
                    isOpen={showAlert}
                    onDidDismiss={() => setShowAlert(false)}
                    header={'Alert'}
                    message={alertMessage}
                    buttons={['OK']}
                />
            </IonContent>
        </IonPage>
    );
};

export default ReleaseFormPage;
