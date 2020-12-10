const mongoose = require("mongoose");

const ConstructionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Construction = mongoose.model("Construction", ConstructionSchema);

module.exports = Construction;
