const mongoose = require("mongoose");
const fs = require("fs");
const User = require("./models/user.model");

const {
  MONGO_DATABASE,
  MONGO_HOSTNAME,
  NODE_ENV,
} = process.env;
const isProduction = NODE_ENV === "production";

let { MONGO_INITDB_ROOT_USERNAME, MONGO_INITDB_ROOT_PASSWORD } = process.env;

if (isProduction) {
  MONGO_INITDB_ROOT_PASSWORD = fs.readFileSync(MONGO_INITDB_ROOT_PASSWORD, "utf-8");
}

const mongoAuth = `${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD.trim()}`;
const MONGO_URL = `mongodb://${mongoAuth}@${MONGO_HOSTNAME}/${MONGO_DATABASE}`;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      auth: { authSource: "admin" },
      useUnifiedTopology: true,
    });

    const { INIT_USERNAME, INIT_PASSWORD } = process.env;
    if (isProduction) {
      INIT_PASSWORD = fs.readFileSync(INIT_PASSWORD, "utf-8").trim();
    }
    const user = {
      username: INIT_USERNAME,
      password: INIT_PASSWORD,
    };
    const query = await User.findOne({ username: INIT_USERNAME });
    if (!query) {
      await User.create(user);
    }
  } catch (e) {
    throw e;
  }
};

module.exports = connectDB;
