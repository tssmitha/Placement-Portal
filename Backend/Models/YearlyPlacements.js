const mongoose = require('mongoose');

const YearlyPlacementsSchema = new mongoose.Schema({
  year: {
    type: Number,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  placed: {
    type: Number,
    required: true,
  },
});

const YearlyPlacements = mongoose.model('YearlyPlacements', YearlyPlacementsSchema);

module.exports = YearlyPlacements;
