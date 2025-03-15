const mongoose = require('mongoose');

const BranchSchema = new mongoose.Schema({
  branchName: { type: String, required: true },
  totalStudents: { type: Number, required: true },
});

const Branch = mongoose.model('Branch', BranchSchema);

module.exports = Branch;
