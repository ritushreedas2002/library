const express = require("express");
const User = require("../models/User");
const router = express.Router();
// const multer = require("multer");

// // Multer configuration for file uploads
// const upload = multer({
//   storage: multer.memoryStorage(),
//   limits: {
//     fileSize: 5 * 1024 * 1024, // 5 MB file size limit
//   },
// });


// *adding user details into mongoDB
router.post("/register", async (req, res) => {
  try {
    const { name, email, uid, displayPicture } = req.body;

    const userFound = await User.findOne({ uid });
    if (userFound) {
      return res.status(422).json({ error: "User already exists!" });
    } else {
      const newUser = new User({
        name,
        uid,
        email,
        displayPicture,
      });
      const registerUser = await newUser.save();

      res.status(201).json({ message: "User registered successfully!!" });
    }
  } catch (error) {
    console.log(`error occured : ${error.message}`);
  }
});

router.get("/user", async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.query.uid });
    res.json(user);
  } catch (error) {
    console.error(`Error fetching user data: ${error.message}`);
    res.status(500).json({ error: "Failed to fetch user data" });
  }
});

router.put("/profile/:uid", async (req, res) => {
  try {
    const { uid } = req.params;
    const { name} = req.body;
    // let displayPicture;

    // Check if a new image file was uploaded
    // if (req.file) {
    //   displayPicture = req.file.buffer.toString("base64"); // Convert image buffer to base64 string
    

    // Find user by UID and update profile fields
    const updatedUser = await User.findOneAndUpdate(
      { uid },
      { name },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error(`Error updating user data: ${error.message}`);
    res.status(500).json({ error: "Failed to update user data" });
  }
});



module.exports = router;