const Student = require('../Models/students');

const getAdminStats = async (req, res) => {
    try {
      // Get total placed students
      const totalPlaced = await Student.countDocuments({ placementStatus: 'Placed' });
      const totalStudents = await Student.countDocuments();
  
      // Get students placed by branch
      const studentsByBranch = await Student.aggregate([
        { $match: { placementStatus: 'Placed' } },
        { $group: { _id: "$branch", count: { $sum: 1 } } }
      ]);
      res.json({
        totalStudents,
        totalPlaced,
        studentsByBranch,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  };
  
  module.exports = { getAdminStats };