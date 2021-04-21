const express = require("express");
const cors = require("cors");
const fs = require("fs");

const { Parser } = require("./Parser");
const parser = new Parser();

// Creates Express app
const app = express();

app.use(express.json());
app.use(cors());

// Gets input text and parses the text
const text = fs.readFileSync("./inputData.txt", "utf-8");
const input = parser.parse(text);

// /message GET endpoint
app.get("/message", (req, res) => {
  res.json(input);
});

const port = 8000;
app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
