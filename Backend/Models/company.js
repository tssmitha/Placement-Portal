const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the companies
const companySchema = new Schema({
  companyName: {
    type: String,
    required: true,
    unique: true, // Ensures company names are unique
  },
  companyID: {
    type: String,
    required: true,
    unique: true, // Unique company identifier
  },
  intake: [{
    year: {
      type: Number,
      required: true, // Year of the intake (e.g., 2022, 2023, etc.)
    },
    numberOfStudents: {
      type: Number,
      required: true, // Number of students taken in that year
    },
    roundsConducted: {
      type: Number,
      required: true, // Number of recruitment rounds conducted
    },
  }],
  packageOffered: {
    type: Number, // Expected package (salary) offered by the company
    required: true,
  },
  jobDescription: {
    type: String,
    required: true, // Description of the job offered
  },
  roleOffered: {
    type: String,
    required: true, // Role being offered by the company
  },
  email: {
    type: String,
    required: true, // Email ID of the company for contact
  },
  contactInfo: {
    type: String,
    required: true, // Contact details of the recruitment team (e.g., phone numbers)
  },
  status: {
    type: String,
    enum: ['Completed', 'Ongoing', 'Not Started'],
    required: true, // Whether the recruitment process is completed, ongoing, or not started
  },
  // Optional: add timestamps to track the company's data creation and updates
}, { timestamps: true });

// Create and export the model
const Company = mongoose.model('Company', companySchema);

module.exports = Company;
