const express = require('express');
const Branch = require('../Models/Branch'); // Import the Branch model
const Company = require('../Models/company'); // Import the Company model (if you have it)
const YearlyPlacements = require('../Models/YearlyPlacements');

const router = express.Router();

// Fetch statistics for all branches and total placements
router.get('/admin/stats', async (req, res) => {
  try {
    // Get the total students in each branch
    const branches = await Branch.find();

    // Fetch the number of students placed in each branch from the companies data
    const companies = await Company.find();

    // Create an array to store the placement stats
    const placementStats = branches.map(branch => {
      const totalStudents = branch.totalStudents;
      const branchName = branch.branchName;

      // Find the number of placed students for the branch from company data
      let placedStudents = 0;
      companies.forEach(company => {
        company.intake.forEach(intake => {
          if (intake.branch === branchName) {
            placedStudents += intake.numberOfStudents;
          }
        });
      });

      return {
        branchName,
        totalStudents,
        placedStudents
      };
    });

    // Calculate the total students placed and total students registered
    const totalPlaced = placementStats.reduce((acc, branch) => acc + branch.placedStudents, 0);
    const totalStudents = placementStats.reduce((acc, branch) => acc + branch.totalStudents, 0);

    // Return the data as JSON
    res.json({
      totalPlaced,
      totalStudents,
      placementStats
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});
  

// Example API endpoint to get year-wise placement stats
router.get('/year-wise-placement-stats', async (req, res) => {
    const count = await YearlyPlacements.countDocuments();
console.log("Total documents in YearlyPlacements:", count);

  try {
    const yearWiseStats = await YearlyPlacements.aggregate([
      {
        $group: {
          _id: { year: "$year", branch: "$branch" },
          total: { $sum: "$total" },
          placed: { $sum: "$placed" }
        }
      },
      {
        $group: {
          _id: "$_id.year",
          branches: {
            $push: {
              branch: "$_id.branch",
              total: "$total",
              placed: "$placed",
              successRate: { $multiply: [{ $divide: ["$placed", "$total"] }, 100] }
            }
          }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    console.log("Year wise stats" ,yearWiseStats); // Log to check data before sending the response
    res.json(yearWiseStats);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching year-wise placement stats');
  }
});

  
  

  // Example API endpoint to get placement success rate by branch
router.get('/placement-success-rate', async (req, res) => {
    try {
      const statsByBranch = await PlacementStats.aggregate([
        { $group: { _id: "$branch", totalPlaced: { $sum: "$placed" }, totalStudents: { $sum: "$total" } } }
      ]);
      res.json(statsByBranch);
    } catch (error) {
      res.status(500).send('Error fetching placement success rate by branch');
    }
  });
  
  

module.exports = router;


