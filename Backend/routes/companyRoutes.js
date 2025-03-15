const express = require('express');
const router = express.Router();
const Company = require('../Models/company'); // Import the Company model

// Add a new company
// router.post('/companies', async (req, res) => {
//   try {
//     const { companyName, companyID, intake, packageOffered, jobDescription, roleOffered } = req.body;

//     // Create a new company entry
//     const newCompany = new Company({
//       companyName,
//       companyID,
//       intake,
//       packageOffered,
//       jobDescription,
//       roleOffered,
//     });

//     const savedCompany = await newCompany.save();
//     res.status(201).json(savedCompany);
//   } catch (err) {
//     if (err.code === 11000) { // Handle duplicate company name or ID
//       res.status(400).json({ message: 'Company name or ID must be unique.' });
//     } else {
//       res.status(500).json({ message: err.message });
//     }
//   }
// });


router.post('/' , async(req , res) => {
  try{
    const newCompany = new Company(req.body);
    await newCompany.save();
    res.status(200).json(newCompany);
  }catch(err){
    res.status(400).json({ message : "Error adding company"});
  }
});

// Fetch all companies
router.get('/', async (req, res) => {
  try {
    const companies = await Company.find();
    res.status(200).json(companies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Fetch a single company by ID
router.get('/:id', async (req, res) => {
  try {
    const company = await Company.findOne({ companyID: req.params.id });
    if (!company) return res.status(404).json({ message: 'Company not found' });
    res.status(200).json(company);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a company
router.put('/:id', async (req, res) => {
  try {
    const updatedCompany = await Company.findOneAndUpdate(
      { companyID: req.params.id },
      req.body,
      { new: true, runValidators: true } // Return the updated document and validate inputs
    );

    if (!updatedCompany) return res.status(404).json({ message: 'Company not found' });
    res.status(200).json(updatedCompany);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a company
router.delete('/:id', async (req, res) => {
  try {
    const deletedCompany = await Company.findOneAndDelete({ companyID: req.params.id });
    if (!deletedCompany) return res.status(404).json({ message: 'Company not found' });
    res.status(200).json({ message: 'Company deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
