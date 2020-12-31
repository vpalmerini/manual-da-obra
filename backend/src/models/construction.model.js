const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * @swagger
 *  components:
 *    schemas:
 *      Construction:
 *        type: object
 *        required:
 *          - name
 *          - location
 *        properties:
 *          _id:
 *            type: string
 *            description: The auto-generated id of the construction
 *          name:
 *            type: string
 *          location:
 *            type: string
 *          image:
 *            type: string
 *            description: URL of a construction's image
 *          createdAt:
 *            type: date
 *            format: date-time
 *          systems:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/System'
 *            description: List of construction's systems
 */ 

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
