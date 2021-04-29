import { connect } from 'mongoose';
import { readFileSync } from 'fs';
import User from './models/user.model';

const { MONGO_DATABASE, MONGO_HOSTNAME, NODE_ENV } = process.env;
const isProduction = NODE_ENV === 'production';

const { MONGO_INITDB_ROOT_USERNAME } = process.env;
let { MONGO_INITDB_ROOT_PASSWORD } = process.env;

if (isProduction) {
  MONGO_INITDB_ROOT_PASSWORD = readFileSync(
    MONGO_INITDB_ROOT_PASSWORD,
    'utf-8',
  );
}

const mongoAuth = `${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD.trim()}`;
const MONGO_URL = `mongodb://${mongoAuth}@${MONGO_HOSTNAME}/${MONGO_DATABASE}`;

const connectDB = async () => {
  await connect(MONGO_URL, {
    useNewUrlParser: true,
    auth: { authSource: 'admin' },
    useUnifiedTopology: true,
  });

  const { INIT_USERNAME, INIT_PASSWORD } = process.env;
  const user = {
    username: INIT_USERNAME,
    password: isProduction
      ? readFileSync(INIT_PASSWORD, 'utf-8').trim()
      : INIT_PASSWORD,
  };
  const query = await User.findOne({ username: INIT_USERNAME });
  if (!query) {
    await User.create(user);
  }
};

export default connectDB;
