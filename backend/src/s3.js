const fs = require("fs");
const aws = require("aws-sdk");

let { AWS_SECRET_ACCESS_KEY, AWS_ACCESS_KEY_ID, NODE_ENV } = process.env;
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

module.exports = s3;