const multerS3 = require("multer-s3");
const crypto = require("crypto");
const aws = require("aws-sdk");
const fs = require("fs");

let { AWS_SECRET_ACCESS_KEY, AWS_ACCESS_KEY_ID, BUCKET_NAME, NODE_ENV } = process.env;
const isProduction = NODE_ENV === "production";

if (isProduction) {
  AWS_SECRET_ACCESS_KEY = fs.readFileSync(AWS_SECRET_ACCESS_KEY, "utf-8").trim();
  AWS_ACCESS_KEY_ID = fs.readFileSync(AWS_ACCESS_KEY_ID, "utf-8").trim();
}

aws.config.update({
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  accessKeyId: AWS_ACCESS_KEY_ID,
  region: "sa-east-1",
});

const s3 = new aws.S3();

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
  s3,
};
