const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ConstructionSchema = new Schema({
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
  systems: [{
    type: Schema.Types.ObjectId,
    ref: "System"
  }]
});

module.exports = mongoose.model("Construction", ConstructionSchema);
