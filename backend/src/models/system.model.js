const mongoose = require("mongoose");

const { Schema } = mongoose;

/**
 * @swagger
 *  components:
 *    schemas:
 *      System:
 *        type: object
 *        required:
 *          - name
 *        properties:
 *          _id:
 *            type: string
 *            description: The auto-generated id of the system
 *          nickname:
 *            type: string
 *            description: Just a formatting of system's name
 *          description:
 *            type: string
 *          createdAt:
 *            type: date
 *            format: date-time
 *          construction:
 *            type: object
 *            $ref: '#/components/schemas/Construction'
 *          files:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/File'
 *            description: List of system's files
 */ 

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
  files: [{
    type: Schema.Types.ObjectId,
    ref: "File",
  }],
  construction: {
    type: Schema.Types.ObjectId,
    ref: "Construction",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

SystemSchema.pre("save", async function (next) {
  this.nickname = await this.name.toLowerCase().replace(/ /g, "_");
  return next();
});

SystemSchema.post("findOneAndUpdate", async function () {
  const system = await this.model.findOne(this.getFilter());
  system.nickname = system.name.toLowerCase().replace(/ /g, "_");
  system.save();
});

module.exports = mongoose.model("System", SystemSchema);
