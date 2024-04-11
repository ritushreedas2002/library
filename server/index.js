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
  "https://library-aes6.vercel.app/", // Make sure there's no trailing slash
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ['GET', 'POST', 'DELETE', 'PUT'], // Allow only these methods
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));


// linking express router
app.use(require("./router/route"));


// Error handling middleware
app.use((err, req, res, next) => {
  console.error("An error occurred:", err.stack);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(port, () => {
  console.log(`server is up and running at the port ${port}.`);
});

