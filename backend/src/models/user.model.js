const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const { Schema } = mongoose;

/**
 * @swagger
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *          - username
 *        properties:
 *          _id:
 *            type: string
 *            description: The auto-generated id of the user
 *          username:
 *            type: string
 *          email:
 *            type: string
 *          password:
 *            type: string
 *            description: It's stored as a hash
 *          createdAt:
 *            type: date
 *            format: date-time
 */ 

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  return next();
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
