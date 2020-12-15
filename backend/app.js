const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const rfs = require("rotating-file-stream");

const connectDB = require("./src/db");
const { handleError } = require("./src/helpers/error");

const app = express();

const { UI_URL, PORT, NODE_ENV } = process.env;
const port = PORT;
const basePath = "/api";

if (NODE_ENV === "production") {
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

app.use((err, req, res) => {
  handleError(err, res);
});

console.log(`API is running in http://localhost:${port}/api`);

app.listen(port);
