const mongoose = require("mongoose");
const fs = require("fs");
const User = require("./models/user.model");

const {
  MONGO_INITDB_ROOT_USERNAME,
  MONGO_INITDB_ROOT_PASSWORD,
  MONGO_DATABASE,
  MONGO_HOSTNAME,
  NODE_ENV,
} = process.env;

const isProduction = NODE_ENV === "production";
let DB_PASSWORD;

if (isProduction) {
  DB_PASSWORD = fs.readFileSync(MONGO_INITDB_ROOT_PASSWORD, "utf-8");
} else {
  DB_PASSWORD = MONGO_INITDB_ROOT_PASSWORD;
}

const mongoAuth = `${MONGO_INITDB_ROOT_USERNAME}:${DB_PASSWORD.trim()}`;
const MONGO_URL = `mongodb://${mongoAuth}@${MONGO_HOSTNAME}/${MONGO_DATABASE}`;

const connectDB = async () => {
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    auth: { authSource: "admin" },
    useUnifiedTopology: true,
  });

  if (isProduction) {
    console.log("Database connected");
    return;
  }

  const { INIT_USERNAME, INIT_EMAIL, INIT_PASSWORD } = process.env;

  const user = {
    username: INIT_USERNAME,
    email: INIT_EMAIL,
    password: INIT_PASSWORD,
  };
  const query = await User.findOne({ email: INIT_USERNAME });
  if (!query) {
    await User.create(user);
  }
  console.log("Database connected with user:", user);
};

module.exports = connectDB;
