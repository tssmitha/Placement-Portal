const { Schema, model } = require('mongoose');

const studentSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true },
    dob: { type: Date, required: true },
    usn: { type: String, required: true, unique: true },
    semester: { type: String, required: true }, // 4,5,6,7,8
    branch: { type: String, required: true }, // Dropdown options
    currentYear: { type: String, required: true }, // Roman numeral dropdown
    startYear: { type: String, required: true },
    termsAccepted: { type: Boolean, required: true, default: false },
    password: { type: String }, // To be set later after verification
    status: { 
        type: String, 
        enum: ['pending', 'verified', 'rejected'], 
        default: 'pending' 
    }, // Tracks if the account is verified
    placementStatus: { type: String, enum: ['Placed', 'Not Placed'], default: 'unplaced' },
    registeredAt: { type: Date, default: Date.now }, // Tracks registration time
    updatedByAdminAt: { type: Date }, // Tracks admin's update time
});

const Student = model('Student', studentSchema);

module.exports = Student;
