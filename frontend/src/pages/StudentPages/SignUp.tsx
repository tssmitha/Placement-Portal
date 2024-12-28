import React, { useState } from "react";
import axios from 'axios';
import "./SignUp.css";

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
    termsAccepted: boolean;
}

type FormErrors = {
    [key in keyof FormData]?: string;
};

const SignUp: React.FC = () => {
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
        termsAccepted: false,
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [showForm, setShowForm] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    // Handle changes for inputs
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    // Validate form inputs
    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};
    
        if (!formData.name) {
            newErrors.name = "Full name is required";
            console.log("Validation failed: Full name is required");
        }
        if (!formData.email.includes("@")) {
            newErrors.email = "Invalid email address";
            console.log("Validation failed: Invalid email address");
        }
        if (!formData.mobile.match(/^\d{10}$/)) {
            newErrors.mobile = "Invalid mobile number";
            console.log("Validation failed: Invalid mobile number");
        }
        if (!formData.usn) {
            newErrors.usn = "USN is required";
            console.log("Validation failed: USN is required");
        }
        if (!formData.dob) {
            newErrors.dob = "Date of birth is required";
            console.log("Validation failed: Date of birth is required");
        }
        if (!formData.semester) {
            newErrors.semester = "Current semester is required";
            console.log("Validation failed: Current semester is required");
        }
        if (!formData.branch) {
            newErrors.branch = "Branch is required";
            console.log("Validation failed: Branch is required");
        }
        if (!formData.currentYear.match(/^(I|II|III|IV)$/)) {
            newErrors.currentYear = "Academic year must be I, II, III, or IV";
        }
        if (!formData.startYear.match(/^\d{4}$/)) {
            newErrors.startYear = "Invalid start year";
            console.log("Validation failed: Invalid start year");
            console.log(formData.startYear);
        }
        
        if (!formData.termsAccepted) {
            newErrors.termsAccepted = "You must agree to terms and conditions";
            console.log("Validation failed: Terms and conditions not accepted");
        }
    
        setErrors(newErrors);
        console.log("Errors:", newErrors);
        return Object.keys(newErrors).length === 0;
    };
    

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted");
        console.log(validateForm());
        if (validateForm()) {
            try {
                console.log("Ready to sedn API request!");
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
                        termsAccepted: false,
                    });
                    setShowForm(false);
                }
            } catch (error: any) {
                console.error("Error during registration:", error);
                if (error.response) {
                    alert(`Registration failed: ${error.response.data.message || "Unknown error"}`);
                } else {
                    alert("Failed to connect to the server. Please try again.");
                }
            } finally {
                setLoading(false);
            }
        }
    };

    // Handle terms change with a delay before showing the form
    const handleTermsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            termsAccepted: checked,
        }));

        if (checked) {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                setShowForm(true);
            }, 2000);
        } else {
            setShowForm(false);
            setLoading(false);
        }
    };

    // Skeleton loader for loading state
    const SkeletonLoader = () => (
        <div className="skeleton-loader">
            <div className="skeleton skeleton-title mb-4"></div>
            {[...Array(6)].map((_, idx) => (
                <div key={idx} className="skeleton skeleton-field mb-3"></div>
            ))}
            <div className="skeleton skeleton-button"></div>
        </div>
    );

    return (
        <div className="signup-container mt-5">
            <div className="signup-header text-center">
                <img src="/images/logo.png" alt="NIE Logo" className="mb-4" />
                <h1>Sign Up</h1>
            </div>

            {!formData.termsAccepted ? (
                <>
                    <div className="signup-instructions text-center mb-4">
                        <p>Please read the following instructions carefully:</p>
                        <ul className="list-unstyled">
                            <li>Your data must be genuine and accurate.</li>
                            <li>You must be a current student of NIE.</li>
                            <li>Your data will be verified.</li>
                        </ul>
                    </div>
                    <div className="signup-checkbox mb-4 text-center">
                        <input
                            type="checkbox"
                            id="termsAccepted"
                            name="termsAccepted"
                            checked={formData.termsAccepted}
                            onChange={handleTermsChange}
                            className="me-2"
                        />
                        <label htmlFor="termsAccepted">
                            I have read and agree to the above instructions
                        </label>
                    </div>
                </>
            ) : loading ? (
                <SkeletonLoader />
            ) : (
                showForm && (
                    <form className="signup-form" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleChange}
                            className="signup-input"
                        />
                        {errors.name && <p className="error-text">{errors.name}</p>}

                        <input
                            type="email"
                            name="email"
                            placeholder="College Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            className="signup-input"
                        />
                        {errors.email && <p className="error-text">{errors.email}</p>}

                        <input
                            type="text"
                            name="mobile"
                            placeholder="Mobile Number"
                            value={formData.mobile}
                            onChange={handleChange}
                            className="signup-input"
                        />
                        {errors.mobile && <p className="error-text">{errors.mobile}</p>}

                        <input
                            type="date"
                            name="dob"
                            value={formData.dob}
                            onChange={handleChange}
                            className="signup-input"
                        />
                        {errors.dob && <p className="error-text">{errors.dob}</p>}

                        <input
                            type="text"
                            name="usn"
                            placeholder="USN"
                            value={formData.usn}
                            onChange={handleChange}
                            className="signup-input"
                        />
                        {errors.usn && <p className="error-text">{errors.usn}</p>}

                        <select
                            name="semester"
                            value={formData.semester}
                            onChange={handleChange}
                            className="signup-input"
                        >
                            <option value="" disabled>
                                Select Semester
                            </option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                        </select>
                        {errors.semester && <p className="error-text">{errors.semester}</p>}

                        <select
                            name="currentYear"  
                            value={formData.currentYear}
                            onChange={handleChange}
                            className="signup-input"
                        >
                            <option value="" disabled>
                                Select Academic Year
                            </option>
                            <option value="I">I</option>
                            <option value="II">II</option>
                            <option value="III">III</option>
                            <option value="IV">IV</option>
                        </select>


                        <select
                            name="branch"
                            value={formData.branch}
                            onChange={handleChange}
                            className="signup-input"
                        >
                            <option value="" disabled>
                                Select Branch
                            </option>
                            <option value="CSE">Computer Science and Engineering</option>
                            <option value="ISE">Information Science and Engineering</option>
                            <option value="ECE">Electronics and Communication Engineering</option>
                            <option value="EEE">Electrical and Electronics Engineering</option>
                            <option value="CE">Civil Engineering</option>
                            <option value="ME">Mechanical Engineering</option>
                        </select>
                        {errors.branch && <p className="error-text">{errors.branch}</p>}

                        <input
                            type="text"
                            name="startYear"
                            placeholder="Start Year of Program (e.g., 2020)"
                            value={formData.startYear}
                            onChange={handleChange}
                            className="signup-input"
                        />
                        {errors.startYear && <p className="error-text">{errors.startYear}</p>}

                        <button type="submit" className="signup-button">
                            Register
                        </button>
                    </form>
                )
            )}

            <div className="signup-footer">
                <p>
                    Already have an account? <a href="/login">Login</a>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
