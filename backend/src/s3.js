import { readFileSync } from 'fs';
import { config, S3 } from 'aws-sdk';

let { AWS_SECRET_ACCESS_KEY, AWS_ACCESS_KEY_ID } = process.env;
const { NODE_ENV } = process.env;
const isProduction = NODE_ENV === 'production';

if (isProduction) {
  AWS_SECRET_ACCESS_KEY = readFileSync(AWS_SECRET_ACCESS_KEY, 'utf-8').trim();
  AWS_ACCESS_KEY_ID = readFileSync(AWS_ACCESS_KEY_ID, 'utf-8').trim();
}

config.update({
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  accessKeyId: AWS_ACCESS_KEY_ID,
  region: 'sa-east-1',
});

const s3 = new S3();

export default s3;
