import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import "./theme/variables.css"; // Import the custom theme CSS
import "./StudentOnboardingForm.css";
import LazySection from './LazySection'; // Import the lazy loading section
import { useHistory } from "react-router";
import axios from "axios";

const StudentOnboardingForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    dob: "",
    usn: "",
    semester: "",
    branch: "",
    currentYear: "",
    startYear: "",
    sgpa: Array(8).fill(""), // Array to hold SGPA for semesters 1 to 8
    cgpa: "",
    backlogs: "",
    internships: "",
    certifications: "",
    paymentStatus: false,
    termsAccepted: false,
    fatherName: "",
    motherName: "",
    address: "",
    currentAddress: "",
    permanentAddress: "",
    fatherContact: "",
    motherContact: "",
    alternateCollegeEmail: "",
    alternateContact: "",
    tenthPercentage: "",
    tenthBoard: "",
    tenthYear: "",
    twelfthPercentage: "",
    twelfthBoard: "",
    twelfthYear: "",
    diplomaPercentage: "",
    diplomaBoard: "",
    diplomaYear: "",
    entranceExamName: "",
    entranceExamRank: "",
    skills: "",
    preferredRole: "",
  });

  const [paymentStatus, setPaymentStatus] = useState("pending");
  const history = useHistory();


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSGPAChange = (index: number, value: string) => {
    const newSGPA = [...formData.sgpa];
    newSGPA[index] = value;
    setFormData({ ...formData, sgpa: newSGPA });

    // Calculate CGPA when SGPA fields are updated
    const validSGPAs = newSGPA.filter((sgpa) => sgpa !== "").map(Number);
    if (validSGPAs.length > 0) {
      const averageCGPA = (validSGPAs.reduce((sum, sgpa) => sum + sgpa, 0) / validSGPAs.length).toFixed(2);
      setFormData((prev) => ({ ...prev, cgpa: averageCGPA }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);

    try{
        const response = await axios.post("/api/auth/registered-students",formData);
        if(response.status === 200){
            history.push("/payment");
        }
    }catch(error){
        console.error("Error saving student data : ",error);
        alert("There was an error submitting the form");
    }
    
  };

  return (
    <Container className="signup-container">
      <div className="signup-header">
        <h2>Student Onboarding Form</h2>
      </div>
      <Card className="shadow-lg border-0 rounded-3">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            
            {/* Personal Details Section - Lazy Loaded */}
            <LazySection>
              <div className="signup-form">
                <h4 className="signup-section-title">Personal Details</h4>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="name">
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter full name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="signup-input"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="email">
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="signup-input"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="mobile">
                      <Form.Label>Mobile Number</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter mobile number"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        required
                        className="signup-input"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="dob">
                      <Form.Label>Date of Birth</Form.Label>
                      <Form.Control
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        required
                        className="signup-input"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                {/* Additional Personal Details */}
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="fatherName">
                      <Form.Label>Father's Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter father's name"
                        name="fatherName"
                        value={formData.fatherName}
                        onChange={handleChange}
                        required
                        className="signup-input"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="motherName">
                      <Form.Label>Mother's Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter mother's name"
                        name="motherName"
                        value={formData.motherName}
                        onChange={handleChange}
                        required
                        className="signup-input"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="fatherContact">
                      <Form.Label>Father's Contact</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Father's contact number"
                        name="fatherContact"
                        value={formData.fatherContact}
                        onChange={handleChange}
                        required
                        className="signup-input"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="motherContact">
                      <Form.Label>Mother's Contact</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Mother's contact number"
                        name="motherContact"
                        value={formData.motherContact}
                        onChange={handleChange}
                        required
                        className="signup-input"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="currentAddress">
                      <Form.Label>Current Address</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your current address"
                        name="currentAddress"
                        value={formData.currentAddress}
                        onChange={handleChange}
                        required
                        className="signup-input"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="permanentAddress">
                      <Form.Label>Permanent Address</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter permanent address"
                        name="permanentAddress"
                        value={formData.permanentAddress}
                        onChange={handleChange}
                        required
                        className="signup-input"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="alternateCollegeEmail">
                      <Form.Label>Alternate College Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter alternate college email"
                        name="alternateCollegeEmail"
                        value={formData.alternateCollegeEmail}
                        onChange={handleChange}
                        required
                        className="signup-input"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="alternateContact">
                      <Form.Label>Alternate Contact</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter alternate contact number"
                        name="alternateContact"
                        value={formData.alternateContact}
                        onChange={handleChange}
                        required
                        className="signup-input"
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </div>
            </LazySection>

            {/* Academic Details Section */}
            <LazySection>
              <div className="signup-form mt-5">
                <h4 className="signup-section-title">Academic Details</h4>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="usn">
                      <Form.Label>USN</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter USN"
                        name="usn"
                        value={formData.usn}
                        onChange={handleChange}
                        required
                        className="signup-input"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="semester">
                      <Form.Label>Semester</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter current semester"
                        name="semester"
                        value={formData.semester}
                        onChange={handleChange}
                        required
                        className="signup-input"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* SGPA Fields */}
                <Row>
                  <Col md={12}>
                    <h5>Semester-wise SGPA</h5>
                    {[...Array(8)].map((_, index) => (
                      <Form.Group key={index} controlId={`sgpa-${index}`}>
                        <Form.Label>SGPA - Semester {index + 1}</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder={`Enter SGPA for Semester ${index + 1}`}
                          value={formData.sgpa[index]}
                          onChange={(e) => handleSGPAChange(index, e.target.value)}
                          className="signup-input"
                        />
                      </Form.Group>
                    ))}
                  </Col>
                </Row>

                {/* CGPA */}
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="cgpa">
                      <Form.Label>CGPA</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Auto-calculated CGPA"
                        value={formData.cgpa}
                        readOnly
                        className="signup-input"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="backlogs">
                      <Form.Label>Backlogs (if any)</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter number of backlogs"
                        name="backlogs"
                        value={formData.backlogs}
                        onChange={handleChange}
                        className="signup-input"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* Additional Fields */}
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="internships">
                      <Form.Label>Internship Details</Form.Label>
                      <Form.Control
                        as="textarea"
                        placeholder="Enter details about internships"
                        name="internships"
                        value={formData.internships}
                        onChange={handleChange}
                        rows={3}
                        className="signup-input"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="certifications">
                      <Form.Label>Certifications</Form.Label>
                      <Form.Control
                        as="textarea"
                        placeholder="Enter relevant certifications"
                        name="certifications"
                        value={formData.certifications}
                        onChange={handleChange}
                        rows={3}
                        className="signup-input"
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </div>
            </LazySection>

            <LazySection>
  <div className="signup-form mt-5">
    <h4 className="signup-section-title">Previous Education Details</h4>
    <Row>
      {/* 10th Standard Details */}
      <Col md={6}>
        <Form.Group controlId="tenthPercentage">
          <Form.Label>10th Percentage</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter 10th percentage"
            name="tenthPercentage"
            value={formData.tenthPercentage}
            onChange={handleChange}
            className="signup-input"
          />
        </Form.Group>
      </Col>
      <Col md={6}>
        <Form.Group controlId="tenthBoard">
          <Form.Label>10th Board</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter 10th board (e.g., CBSE, ICSE, State Board)"
            name="tenthBoard"
            value={formData.tenthBoard}
            onChange={handleChange}
            className="signup-input"
          />
        </Form.Group>
      </Col>
    </Row>
    <Row>
      <Col md={6}>
        <Form.Group controlId="tenthYear">
          <Form.Label>Year of Passing (10th)</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter year of passing"
            name="tenthYear"
            value={formData.tenthYear}
            onChange={handleChange}
            className="signup-input"
          />
        </Form.Group>
      </Col>
    </Row>

    {/* 12th/PUC Details */}
    <Row className="mt-4">
      <Col md={6}>
        <Form.Group controlId="twelfthPercentage">
          <Form.Label>12th/PUC Percentage</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter 12th/PUC percentage"
            name="twelfthPercentage"
            value={formData.twelfthPercentage}
            onChange={handleChange}
            className="signup-input"
          />
        </Form.Group>
      </Col>
      <Col md={6}>
        <Form.Group controlId="twelfthBoard">
          <Form.Label>12th/PUC Board</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter 12th/PUC board (e.g., CBSE, State Board)"
            name="twelfthBoard"
            value={formData.twelfthBoard}
            onChange={handleChange}
            className="signup-input"
          />
        </Form.Group>
      </Col>
    </Row>
    <Row>
      <Col md={6}>
        <Form.Group controlId="twelfthYear">
          <Form.Label>Year of Passing (12th/PUC)</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter year of passing"
            name="twelfthYear"
            value={formData.twelfthYear}
            onChange={handleChange}
            className="signup-input"
          />
        </Form.Group>
      </Col>
    </Row>

    {/* Diploma Details (if applicable) */}
    <Row className="mt-4">
      <Col md={6}>
        <Form.Group controlId="diplomaPercentage">
          <Form.Label>Diploma Percentage/CGPA</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter diploma percentage or CGPA"
            name="diplomaPercentage"
            value={formData.diplomaPercentage}
            onChange={handleChange}
            className="signup-input"
          />
        </Form.Group>
      </Col>
      <Col md={6}>
        <Form.Group controlId="diplomaBoard">
          <Form.Label>Diploma Board/University</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter diploma board or university"
            name="diplomaBoard"
            value={formData.diplomaBoard}
            onChange={handleChange}
            className="signup-input"
          />
        </Form.Group>
      </Col>
    </Row>
    <Row>
      <Col md={6}>
        <Form.Group controlId="diplomaYear">
          <Form.Label>Year of Passing (Diploma)</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter year of passing"
            name="diplomaYear"
            value={formData.diplomaYear}
            onChange={handleChange}
            className="signup-input"
          />
        </Form.Group>
      </Col>
    </Row>
  </div>
</LazySection>

<LazySection>
  <div className="signup-form mt-5">
    <h4 className="signup-section-title">Upload Resume</h4>
    <Row>
      <Col md={12}>
        <Form.Group controlId="resumeUpload">
          <Form.Label>Upload Your Resume</Form.Label>
          <Form.Control
            type="file"
            name="resume"
            accept=".pdf,.doc,.docx"
            onChange={(e) => {
              const file = e.target.files?.[0];
              console.log("Uploaded file:", file);
              // Handle file upload logic here
            }}
            className="signup-input"
          />
          <Form.Text className="text-muted">
            Supported formats: PDF, DOC, DOCX. Maximum size: 2MB.
          </Form.Text>
        </Form.Group>
      </Col>
    </Row>
  </div>
</LazySection>





            {/* Submit Button */}
            <Button type="submit" variant="primary" className="signup-button w-100 mt-4">
  Proceed to Payment
</Button>

          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default StudentOnboardingForm;
