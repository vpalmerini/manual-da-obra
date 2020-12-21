const multerS3 = require("multer-s3");
const crypto = require("crypto");
const s3 = require("../s3");

const { BUCKET_NAME } = process.env;

const config = {
  storage: multerS3({
    acl: "public-read",
    s3,
    bucket: BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err);

        const fileName = `${hash.toString("hex")}-${file.originalname}`;
        cb(null, fileName);
      });
    },
  }),
  fileFilter: (req, file, cb) => {
    const allowedMimes = ["application/pdf", "video/mp4"];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"));
    }
  },
};

const deleteParams = (key) => {
  return {
    Bucket: BUCKET_NAME,
    Key: key,
  }
}

module.exports = {
  config,
  deleteParams,
};
