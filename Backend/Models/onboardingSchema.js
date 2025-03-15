const { Schema, model } = require('mongoose');

const onboardingSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true },
    dob: { type: Date, required: true },
    usn: { type: String, required: true, unique: true },
    semester: { type: String, required: true }, // 4,5,6,7,8
    branch: { type: String, required: true }, // Dropdown options
    currentYear: { type: String, required: true }, // Roman numeral dropdown
    startYear: { type: String, required: true },
    sgpa: { type: [String], default: [] }, // Array to store SGPA for each semester
    cgpa: { type: String },
    backlogs: { type: String },
    internships: { type: String },
    certifications: { type: String },
    paymentStatus: { type: Boolean, default: false },
    termsAccepted: { type: Boolean, default: false },
    fatherName: { type: String },
    motherName: { type: String },
    address: { type: String },
    currentAddress: { type: String },
    permanentAddress: { type: String },
    fatherContact: { type: String },
    motherContact: { type: String },
    alternateCollegeEmail: { type: String },
    alternateContact: { type: String },
    tenthPercentage: { type: String },
    tenthBoard: { type: String },
    tenthYear: { type: String },
    twelfthPercentage: { type: String },
    twelfthBoard: { type: String },
    twelfthYear: { type: String },
    diplomaPercentage: { type: String },
    diplomaBoard: { type: String },
    diplomaYear: { type: String },
    registeredAt: { type: Date, default: Date.now },
    paymentReceipt: { type: String },  // To store payment receipt URL/file
});

const Onboarding = model('Onboarding', onboardingSchema);

module.exports = Onboarding;
