const mongoose = require("mongoose");
const config=require("../config/devKey")
const DB =config.backendUrl;

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
