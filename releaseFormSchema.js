const mongoose = require('mongoose');

const releaseFormSchema = new mongoose.Schema({
  jobDescription: {
    type: String,
    required: true,
  },
  studentDetails: [
    {
      name: { 
        type: String, 
        required: true,
      },
      usn: { 
        type: String, 
        sparse: true,
        required: true,
      },
      dateOfBirth: { 
        type: Date, 
        required: true,
      },
      phoneNumber: {
        type: String,
        required: true,
      },
      personalEmail: {
        type: String,
        required: true,
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email address.'],
      },
      degree: { 
        type: String, 
        enum: ['BTech', 'MTech'], 
        required: true,
      },
      yearOfPassing: { 
        type: Number, 
        required: true,
      },
      btechDetails: {
        cgpa: { 
          type: Number, 
          required: function() { return this.degree === 'BTech'; },
        },
        branch: { 
          type: String, 
          required: function() { return this.degree === 'BTech'; },
        },
      },
      mtechDetails: {
        cgpa: { 
          type: Number, 
          required: function() { return this.degree === 'MTech'; },
        },
        branch: { 
          type: String, 
          required: function() { return this.degree === 'MTech'; },
        },
      },
      education: {
        tenth: {
          passingYear: { 
            type: Number, 
            required: false,
          },
          percentage: { 
            type: Number, 
            required: false,
          },
        },
        twelfth: {
          passingYear: { 
            type: Number, 
            required: false,
          },
          percentage: { 
            type: Number, 
            required: false,
          },
        },
      },
      resumeLink: {
        type: String,
        required: true,
      },
      submittedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  submittedBy: {
    type: String,
    enum: ['admin', 'student'],
    required: true,
  },
});

releaseFormSchema.index({ 'studentDetails.usn': 1 }, { sparse: true });

module.exports = mongoose.model('ReleaseForm', releaseFormSchema);
