const mongoose = require("mongoose");

const { Schema } = mongoose;

const SystemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
  },
  description: {
    type: String,
  },
  project: {
    type: String,
  },
  video: {
    type: String,
  },
  construction: {
    type: Schema.Types.ObjectId,
    ref: "Construction",
  },
});

SystemSchema.pre("save", async function (next) {
  this.nickname = await this.name.toLowerCase().replace(/ /g, "_");
  return next();
});

module.exports = mongoose.model("System", SystemSchema);
