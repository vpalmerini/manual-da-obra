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
  systems: [{
    type: Schema.Types.ObjectId,
    ref: "System"
  }],
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Construction", ConstructionSchema);
