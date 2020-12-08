const express = require("express");
const cors = require("cors");
const connectDB = require("./src/db");

const app = express();

const { UI_URL, PORT } = process.env;
const port = PORT;
const basePath = "/api";

app.use(cors({ credentials: true, origin: UI_URL }));

app.use(express.json());

connectDB();

app.get(`${basePath}/ping`, (req, res) => {
  res.send("pong");
});

console.log(`API is running in http://localhost:${port}/api`);

app.listen(port);
