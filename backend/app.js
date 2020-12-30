const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const rfs = require("rotating-file-stream");

const connectDB = require("./src/db");
const setup = require("./src/swagger");

const app = express();

const { UI_URL, PORT, NODE_ENV } = process.env;
const port = PORT;
const basePath = "/api";
let isProduction = NODE_ENV === "production";

if (isProduction) {
  const accessLogStream = rfs.createStream('access.log', {
    interval: '7d',
    path: path.join(__dirname, 'log')
  });
  app.use(morgan('combined', { stream: accessLogStream }));
} else {
  app.use(morgan('dev'));
}


app.use(cors({ credentials: true, origin: UI_URL }));

app.use(express.json());

connectDB();

app.use(basePath, require("./src/controllers"));

app.get(`${basePath}/ping`, (req, res) => {
  res.send("pong");
});

setup(app);

if (!isProduction) {
  console.log(`API is running in http://localhost:${port}/api`);
}

app.listen(port);
