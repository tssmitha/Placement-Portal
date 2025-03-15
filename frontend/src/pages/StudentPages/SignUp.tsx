import React, { useState } from "react";
import { IonInput, IonSelect, IonSelectOption, IonButton, IonContent, IonPage, IonLabel, IonItem } from '@ionic/react';
import axios from 'axios';
import { AxiosError } from 'axios';
import { useHistory } from 'react-router-dom';

import './SignUp.css';
// Define the type for form data
interface FormData {
    name: string;
    email: string;
    mobile: string;
    dob: string;
    usn: string;
    semester: string;
    branch: string;
    currentYear: string;
    startYear: string;
    password: string;
    confirmPassword: string;
}

type FormErrors = {
    [key in keyof FormData]?: string;
};

const SignUp: React.FC = () => {
    const navigate = useHistory();
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        mobile: "",
        dob: "",
        usn: "",
        semester: "",
        branch: "",
        currentYear: "",
        startYear: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [loading, setLoading] = useState<boolean>(false);

    // Handle changes for inputs
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    

    // Validate form inputs
    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.name) {
            newErrors.name = "Full name is required";
        }
        if (!formData.email.includes("@")) {
            newErrors.email = "Invalid email address";
        }
        if (!formData.mobile.match(/^\d{10}$/)) {
            newErrors.mobile = "Invalid mobile number";
        }
        if (!formData.usn) {
            newErrors.usn = "USN is required";
        }
        if (!formData.dob) {
            newErrors.dob = "Date of birth is required";
        }
        if (!formData.semester) {
            newErrors.semester = "Current semester is required";
        }
        if (!formData.branch) {
            newErrors.branch = "Branch is required";
        }
        if (!formData.currentYear.match(/^(I|II|III|IV)$/)) {
            newErrors.currentYear = "Academic year must be I, II, III, or IV";
        }
        if (!formData.startYear.match(/^\d{4}$/)) {
            newErrors.startYear = "Invalid start year";
        }
        if (!formData.password) {
            newErrors.password = "Password is required";
        }
        if (formData.password && formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await axios.post("http://localhost:5000/api/auth/signup", formData, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (response.status === 201) {
                    alert("Registration successful! Please wait for admin verification.");
                    setFormData({
                        name: "",
                        email: "",
                        mobile: "",
                        dob: "",
                        usn: "",
                        semester: "",
                        branch: "",
                        currentYear: "",
                        startYear: "",
                        password: "",
                        confirmPassword: "",
                    });

                    // Navigate to login page after successful registration
                    ("/login");
                }
            } catch (error: unknown) {
                if (error instanceof AxiosError) {
                    console.error("Error during registration:", error);
                    alert(`Registration failed: ${error.response?.data.message || "Unknown error"}`);
                } else {
                    console.error("Unknown error during registration:", error);
                    alert("Registration failed: Unknown error");
                }
            }
        }
    };

    return (
        <IonPage>
            <IonContent>
                <div className="signup-container mt-5">
                    <div className="signup-header text-center">
                        <img src="/images/logo.png" alt="NIE Logo" className="mb-4" />
                        <h1>Sign Up</h1>
                    </div>

                    <form className="signup-form" onSubmit={handleSubmit}>
                        {/* Full Name */}
                        <IonItem>
                            <IonLabel>Full Name</IonLabel>
                            <IonInput
                                type="text"
                                name="name"
                                value={formData.name}
                                onIonChange={handleChange}
                                required
                            />
                        </IonItem>
                        {errors.name && <p className="error-text">{errors.name}</p>}

                        {/* Email Address */}
                        <IonItem>
                            <IonLabel>College Email Address</IonLabel>
                            <IonInput
                                type="email"
                                name="email"
                                value={formData.email}
                                onIonChange={handleChange}
                                required
                            />
                        </IonItem>
                        {errors.email && <p className="error-text">{errors.email}</p>}

                        {/* Mobile Number */}
                        <IonItem>
                            <IonLabel>Mobile Number</IonLabel>
                            <IonInput
                                type="text"
                                name="mobile"
                                value={formData.mobile}
                                onIonChange={handleChange}
                                required
                            />
                        </IonItem>
                        {errors.mobile && <p className="error-text">{errors.mobile}</p>}

                        {/* Date of Birth */}
                        <IonItem>
                            <IonLabel>Date of Birth</IonLabel>
                            <IonInput
                                type="date"
                                name="dob"
                                value={formData.dob}
                                onIonChange={handleChange}
                                required
                            />
                        </IonItem>
                        {errors.dob && <p className="error-text">{errors.dob}</p>}

                        {/* USN */}
                        <IonItem>
                            <IonLabel>USN</IonLabel>
                            <IonInput
                                type="text"
                                name="usn"
                                value={formData.usn}
                                onIonChange={handleChange}
                                required
                            />
                        </IonItem>
                        {errors.usn && <p className="error-text">{errors.usn}</p>}

                        {/* Semester */}
                        <IonItem>
                            <IonLabel position="floating">Current Semester</IonLabel>
                            <IonSelect
                                name="semester"
                                value={formData.semester}
                                onIonChange={handleChange}
                                
                            >
                                <IonSelectOption value="4">4</IonSelectOption>
                                <IonSelectOption value="5">5</IonSelectOption>
                                <IonSelectOption value="6">6</IonSelectOption>
                                <IonSelectOption value="7">7</IonSelectOption>
                                <IonSelectOption value="8">8</IonSelectOption>
                            </IonSelect>
                        </IonItem>
                        {errors.semester && <p className="error-text">{errors.semester}</p>}

                        {/* Academic Year */}
                        <IonItem>
                            <IonLabel >Academic Year</IonLabel>
                            <IonSelect
                                name="currentYear"
                                value={formData.currentYear}
                                onIonChange={handleChange}
                                
                            >
                                <IonSelectOption value="I">I</IonSelectOption>
                                <IonSelectOption value="II">II</IonSelectOption>
                                <IonSelectOption value="III">III</IonSelectOption>
                                <IonSelectOption value="IV">IV</IonSelectOption>
                            </IonSelect>
                        </IonItem>
                        {errors.currentYear && <p className="error-text">{errors.currentYear}</p>}

                        {/* Branch */}
                        <IonItem>
                            <IonLabel position="floating">Branch</IonLabel>
                            <IonSelect
                                name="branch"
                                value={formData.branch}
                                onIonChange={handleChange}
                                
                            >
                                <IonSelectOption value="CSE">Computer Science and Engineering</IonSelectOption>
                                <IonSelectOption value="ISE">Information Science and Engineering</IonSelectOption>
                                <IonSelectOption value="ECE">Electronics and Communication Engineering</IonSelectOption>
                                <IonSelectOption value="EEE">Electrical and Electronics Engineering</IonSelectOption>
                                <IonSelectOption value="CE">Civil Engineering</IonSelectOption>
                                <IonSelectOption value="ME">Mechanical Engineering</IonSelectOption>
                            </IonSelect>
                        </IonItem>
                        {errors.branch && <p className="error-text">{errors.branch}</p>}

                        {/* Start Year */}
                        <IonItem>
                            <IonLabel>Start Year</IonLabel>
                            <IonInput
                                type="text"
                                name="startYear"
                                value={formData.startYear}
                                onIonChange={handleChange}
                                required
                            />
                        </IonItem>
                        {errors.startYear && <p className="error-text">{errors.startYear}</p>}

                        {/* Password */}
                        <IonItem>
                            <IonLabel>Password</IonLabel>
                            <IonInput
                                type="password"
                                name="password"
                                value={formData.password}
                                onIonChange={handleChange}
                                required
                            />
                        </IonItem>
                        {errors.password && <p className="error-text">{errors.password}</p>}

                        {/* Confirm Password */}
                        <IonItem>
                            <IonLabel>Confirm Password</IonLabel>
                            <IonInput
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onIonChange={handleChange}
                                required
                            />
                        </IonItem>
                        {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}

                        {/* Submit Button */}
                        <IonButton type="submit" expand="full" className="signup-button">
                            Register
                        </IonButton>
                    </form>

                    <div className="signup-footer">
                        <p>
                            Already have an account? <a href="/login">Login</a>
                        </p>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default SignUp;
