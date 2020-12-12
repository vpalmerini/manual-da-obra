const mongoose = require("mongoose");

const SystemSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  description: {
    type: String,
  }
})

const System = mongoose.model("System", SystemSchema);

module.exports = System;