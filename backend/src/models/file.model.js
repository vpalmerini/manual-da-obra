import { model, Schema } from 'mongoose';

/**
 * @swagger
 *  components:
 *    schemas:
 *      File:
 *        type: object
 *        required:
 *          - name
 *        properties:
 *          _id:
 *            type: string
 *            description: The auto-generated id of the file
 *          name:
 *            type: string
 *          type:
 *            type: string
 *            enum: ["video", "project"]
 *          url:
 *            type: string
 *            description: URL of the object in S3 (AWS)
 *          key:
 *            type: string
 *            description: Just a hash to add to object's name
 *          createdAt:
 *            type: date
 *            format: date-time
 *          system:
 *            type: object
 *            $ref: '#/components/schemas/System'
 */

const FileSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['video', 'project'],
  },
  url: {
    type: String,
  },
  key: {
    type: String,
  },
  system: {
    type: Schema.Types.ObjectId,
    ref: 'System',
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const File = model('File', FileSchema);

export default File;
