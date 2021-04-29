import multerS3, { AUTO_CONTENT_TYPE } from 'multer-s3';
import { randomBytes } from 'crypto';
import s3 from '../s3';

const { BUCKET_NAME } = process.env;

const config = {
  storage: multerS3({
    acl: 'public-read',
    s3,
    bucket: BUCKET_NAME,
    contentType: AUTO_CONTENT_TYPE,
    key: (_req, file, cb) => {
      randomBytes(16, (err, hash) => {
        if (err) cb(err);

        const fileName = `${hash.toString('hex')}-${file.originalname}`;
        cb(null, fileName);
      });
    },
  }),
  fileFilter: (_req, file, cb) => {
    const allowedMimes = ['application/pdf', 'video/mp4'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  },
};

const deleteParams = (key) => ({
  Bucket: BUCKET_NAME,
  Key: key,
});

export { config, deleteParams };
