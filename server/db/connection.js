const mongoose = require("mongoose");
const { MONGO_KEY } = require("../constant");
require("dotenv").config({ path: "../env/.env" });

const DB =
  "mongodb+srv://admin-ritushree:Mo4gS9UnLrFY1J0Y@cluster0.s6k4ce2.mongodb.net/User";

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connection successful!!");
  })
  .catch((err) => {
    console.log("no connection!! ", err.message);
  });
