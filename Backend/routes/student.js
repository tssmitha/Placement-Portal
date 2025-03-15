const express = require('express');
const Form = require('../Models/releaseFormSchema'); // Path to your Form schema model
const router = express.Router();

// Submit form by students
router.post('/submit-form/:formId', async (req, res) => {
    const { formId } = req.params;
    const student = req.body.studentDetails[0]; // Access the first student in the array

    if (!student) {
        return res.status(400).json({ error: "Student details are missing in the request." });
    }

    const {
        name, usn, dateOfBirth, degree, yearOfPassing,
        phoneNumber, personalEmail, resumeLink, education, btechDetails, mtechDetails
    } = student;

    console.log("Mapped Student Data:", {
        name, usn, dateOfBirth, degree, yearOfPassing, phoneNumber, personalEmail, resumeLink, education, btechDetails, mtechDetails
    });

    // Validate required fields before processing further
    if (!name || !usn || !dateOfBirth || !degree || !yearOfPassing || !phoneNumber || !personalEmail || !resumeLink) {
        return res.status(400).json({ error: "Missing required student details in the request." });
    }

    try {
        const form = await Form.findById(formId);
        if (!form) {
            return res.status(404).json({ message: 'Form not found' });
        }

        // Ensure studentDetails is an array
        if (!Array.isArray(form.studentDetails)) {
            form.studentDetails = []; // Initialize as an array if it's not already
        }

        // Add student details to the form
        form.studentDetails.push({
            name,
            usn,
            dateOfBirth,
            degree,
            yearOfPassing,
            phoneNumber,
            personalEmail,
            resumeLink,
            education: {
                tenth: education?.tenth || {},
                twelfth: education?.twelfth || {}
            },
            btechDetails: btechDetails || {},
            mtechDetails: mtechDetails || {}
        });

        // Save the updated form with the new student details
        await form.save({ validateBeforeSave: false });

        res.status(200).json({ message: 'Form submitted successfully!' });
    } catch (err) {
        console.error('Error submitting form:', err);
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;
