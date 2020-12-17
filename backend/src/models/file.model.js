const mongoose = require("mongoose");

const { Schema } = mongoose;

const FileSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["video", "project"],
  },
  url: {
    type: String
  },
  system: {
    type: Schema.Types.ObjectId,
    ref: "System",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("File", FileSchema);
