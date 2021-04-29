import { model, Schema } from 'mongoose';
import { hash } from 'bcryptjs';

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

UserSchema.pre('save', async (next) => {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await hash(this.password, 10);
  return next();
});

const User = model('User', UserSchema);

export default User;
