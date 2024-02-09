// app.js (or wherever you configure your Express app)

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();
dotenv.config();
const port = 5000;

// *database
require("./db/connection");

// *cors
const allowedOrigins = [
  "http://localhost:3000",
  "https://localhost:3000", // Add your frontend origin with HTTPS
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));

// linking express router
app.use(require("./router/route"));

app.listen(port, () => {
  console.log(`server is up and running at the port ${port}.`);
});
