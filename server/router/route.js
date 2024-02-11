const express = require("express");
const User = require("../models/User");
const UserNote=require("../models/Notes");
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


//NOTES
// Routes
router.get('/api/notes/:uid', async (req, res) => {
  try {
      const { uid } = req.params;
      const user = await UserNote.findOne({ uid });
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user.notes);
  } catch (err) {
      res.status(400).json({ message: err.message });
  }
});

router.post("/api/notes/:uid", async (req, res) => {
  try {
    const { uid } = req.params;
    const { title, description, color, tags } = req.body;

    let userNote = await UserNote.findOne({ uid });

    if (!userNote) {
      userNote = new UserNote({
        uid,
        notes: [{ title, description, color, tags }],
      });
    } else {
      userNote.notes.push({ title, description, color, tags });
    }

    await userNote.save();

    res.status(201).json({ message: "Note added successfully!!" });
  } catch (error) {
    console.error(`Error occurred: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to fetch individual note details by ID
router.get("/api/notes/:uid/:noteId", async (req, res) => {
  try {
    const { uid, noteId } = req.params;

    // Find the user's notes based on the UID
    const user = await UserNote.findOne({ uid });

    // If the user is not found, return a 404 error
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the specific note by ID within the user's notes array
    const note = user.notes.find((note) => note._id.toString() === noteId);

    // If the note is not found, return a 404 error
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    // If the note is found, return it in the response
    res.status(200).json(note);
  } catch (error) {
    console.error(`Error occurred: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
});


router.put("/api/notes/:uid/:noteId", async (req, res) => {
  try {
    const { uid, noteId } = req.params;
    const { title, description, color, tags } = req.body;

    // Find the user's notes based on the UID
    const user = await UserNote.findOne({ uid });

    // If the user is not found, return a 404 error
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the index of the note within the user's notes array
    const noteIndex = user.notes.findIndex((note) => note._id.toString() === noteId);

    // If the note is not found, return a 404 error
    if (noteIndex === -1) {
      return res.status(404).json({ message: "Note not found" });
    }

    // Update the note with the new values
    user.notes[noteIndex].title = title.trim() === "" ? "" : title;
    user.notes[noteIndex].description = description.trim() === "" ? "" : description;
    user.notes[noteIndex].color = color;
    user.notes[noteIndex].tags = tags;

    // Save the updated user document
    await user.save();

    // Return the updated note in the response
    res.status(200).json(user.notes[noteIndex]);
  } catch (error) {
    console.error(`Error occurred: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
});



router.delete('/api/notes/:uid/:noteId', async (req, res) => {
  try {
    const { uid, noteId } = req.params;
    const user = await UserNote.findOne({ uid });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Find the index of the note to remove
    const noteIndex = user.notes.findIndex(note => note._id.toString() === noteId);
    if (noteIndex === -1) {
      return res.status(404).json({ message: 'Note not found' });
    }
    // Remove the note from the array
    user.notes.splice(noteIndex, 1);
    await user.save();
    res.json(user.notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});





module.exports = router;