const express = require("express");
const User = require("../models/User");
const UserNote=require("../models/Notes");
const UserFeatures=require("../models/Features");
const Note=require("../models/Indibooknotes");
const path = require('path');
const router = express.Router();
const multer = require("multer");
router.use('../../images', express.static(path.join(__dirname, '../../client/public/images')));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Adjust the path to point to your client's image directory
    const dest = path.join(__dirname, '../../client/public/images');
    cb(null, dest);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// *adding user details into mongoDB
router.post("/register",async (req, res) => {
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


router.put('/profile/:uid', upload.single('profileImage'), async (req, res) => {
  const { uid } = req.params;
  const { name } = req.body;

  let updateData = { name };
  if (req.file) {
    updateData.displayPicture = `/images/${req.file.filename}`;
  }

  try {
    const updatedUser = await User.findOneAndUpdate({ uid }, updateData, { new: true });
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
    const lastEdited = Date.now();
    if (!userNote) {
      userNote = new UserNote({
        uid,
        notes: [{ title, description, color, tags,lastEdited }],
      });
    } else {
      userNote.notes.push({ title, description, color, tags,lastEdited });
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
    const lastEdited = Date.now();
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
    user.notes[noteIndex].lastEdited=lastEdited;
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


//favourites
router.get('/api/favorites/:uid', async (req, res) => {
  try {
    const { uid } = req.params;
    const userFeatures = await UserFeatures.findOne({ uid });
    if (!userFeatures) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ favorites: userFeatures.favourites });
  } catch (error) {
    console.error("Error fetching favorites:", error);
    res.status(500).json({ message: error.message });
  }
});


router.post('/api/favorites/:uid/:bookId', async (req, res) => {
  try {
    const { uid,bookId } = req.params;
    // const { bookId } = req.body;

    let userFeatures = await UserFeatures.findOne({ uid });
    if (!userFeatures) {
      userFeatures = new UserFeatures({
        uid,
        favourites: [bookId],
        bookmarks: [] // assuming bookmarks are managed in the same schema
      });
    } else {
      if (!userFeatures.favourites.includes(bookId)) {
        userFeatures.favourites.push(bookId);
      }
    }
    await userFeatures.save();
    
    res.status(201).send();
  } catch (error) {
    console.error("Error adding favorite:", error);
    res.status(500).json({ message: error.message });
  }
});

router.delete('/api/favorites/:uid/:bookId', async (req, res) => {
  try {
    const { uid, bookId } = req.params;

    const userFeatures = await UserFeatures.findOne({ uid });
    if (!userFeatures) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the index of the bookId to remove from favourites
    const bookIndex = userFeatures.favourites.indexOf(bookId);
    if (bookIndex === -1) {
      return res.status(404).json({ message: 'Book not found in favorites' });
    }

    // Remove the bookId from the favourites array
    userFeatures.favourites.splice(bookIndex, 1);

    await userFeatures.save();
    
    res.json(userFeatures.favourites);
  } catch (error) {
    console.error("Error deleting favorite:", error);
    res.status(500).json({ message: error.message });
  }
});

router.get('/api/favorites/:uid/:bookId', async (req, res) => {
  try {
    const { uid, bookId } = req.params;
    const userFeatures = await UserFeatures.findOne({ uid });
    if (!userFeatures) {
      return res.status(404).json({ message: 'User not found' });
    }
    const isFavorited = userFeatures.favourites.includes(bookId);
    res.json({ isFavorited });
  } catch (error) {
    console.error("Error checking favorite:", error);
    res.status(500).json({ message: error.message });
  }
});


//current read
router.post('/api/current-read', async (req, res) => {
  try {
    const { uid, bookId } = req.body;

    // Check if the user exists
    let userFeatures = await UserFeatures.findOne({ uid });

    // If the user doesn't exist, create a new document
    if (!userFeatures) {
      userFeatures = new UserFeatures({ uid, currentRead: [bookId] });
    } else {
      // If the user exists, update the currentRead field
      userFeatures.currentRead = [bookId]; // Replace existing book ID with the new one
    }

    // Save the userFeatures document
    await userFeatures.save();

    res.status(200).json({ success: true, message: 'Current read book ID updated successfully' });
  } catch (error) {
    console.error('Error updating current read book ID:', error.message);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});


router.get('/api/current-read/:uid', async (req, res) => {
  try {
    const { uid } = req.params;

    // Query the database for the user's currentRead field
    const userFeatures = await UserFeatures.findOne({ uid });

    // If user not found or currentRead field is empty, return null
    if (!userFeatures || !userFeatures.currentRead || userFeatures.currentRead.length === 0) {
      return res.status(200).json({ currentRead: null });
    }

    // Return the current book ID
    res.status(200).json({ currentRead: userFeatures.currentRead[0] });
  } catch (error) {
    console.error('Error fetching current read book ID:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

///recently viewwed

const MAX_RECENTLY_VIEWED = 12;

router.post('/api/recently-viewed', async (req, res) => {
  const { userId, bookId } = req.body;

  try {
    let userFeatures = await UserFeatures.findOne({ uid: userId });

    if (!userFeatures) {
      // If userFeatures document doesn't exist, create a new one with the bookId
      userFeatures = new UserFeatures({ uid: userId, recentlyviewed: [bookId] });
    } else {
      // Check if the bookId already exists in recently viewed
      const index = userFeatures.recentlyviewed.indexOf(bookId);
      if (index !== -1) {
        // If it exists, remove it from the current position
        userFeatures.recentlyviewed.splice(index, 1);
      }
      // Add the bookId to the beginning of the array
      userFeatures.recentlyviewed.unshift(bookId);
      // Ensure the array does not exceed the maximum length
      if (userFeatures.recentlyviewed.length > MAX_RECENTLY_VIEWED) {
        userFeatures.recentlyviewed.pop(); // Remove the oldest entry
      }
    }

    // Save the updated userFeatures document
    await userFeatures.save();

    res.status(200).json({ success: true, message: 'Recently viewed book added successfully' });
  } catch (error) {
    console.error('Error adding recently viewed book:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

router.get('/api/recently-viewed/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const userFeatures = await UserFeatures.findOne({ uid: userId });

    if (!userFeatures || !userFeatures.recentlyviewed.length) {
      return res.status(404).json({ success: false, message: 'No recently viewed books found' });
    }

    // Reverse the array to show the most recently viewed books first
    const recentlyViewedBooks = userFeatures.recentlyviewed;

    res.status(200).json({ success: true, recentlyViewed: recentlyViewedBooks });
  } catch (error) {
    console.error('Error fetching recently viewed books:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});



//bookmark
router.get('/api/bookmarks/:uid', async (req, res) => {
  try {
    const { uid } = req.params;
    const userFeatures = await UserFeatures.findOne({ uid });
    if (!userFeatures) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ bookmarks: userFeatures.bookmarks });
  } catch (error) {
    console.error("Error fetching favorites:", error);
    res.status(500).json({ message: error.message });
  }
});


router.post('/api/bookmarks/:uid/:bookId', async (req, res) => {
  try {
    const { uid,bookId } = req.params;
    // const { bookId } = req.body;

    let userFeatures = await UserFeatures.findOne({ uid });
    if (!userFeatures) {
      userFeatures = new UserFeatures({
        uid,
        bookmarks: [bookId] // assuming bookmarks are managed in the same schema
      });
    } else {
      if (!userFeatures.bookmarks.includes(bookId)) {
        userFeatures.bookmarks.push(bookId);
      }
    }
    await userFeatures.save();
    
    res.status(201).send();
  } catch (error) {
    console.error("Error adding favorite:", error);
    res.status(500).json({ message: error.message });
  }
});

router.delete('/api/bookmarks/:uid/:bookId', async (req, res) => {
  try {
    const { uid, bookId } = req.params;

    const userFeatures = await UserFeatures.findOne({ uid });
    if (!userFeatures) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the index of the bookId to remove from favourites
    const bookIndex = userFeatures.bookmarks.indexOf(bookId);
    if (bookIndex === -1) {
      return res.status(404).json({ message: 'Book not found in favorites' });
    }

    // Remove the bookId from the favourites array
    userFeatures.bookmarks.splice(bookIndex, 1);

    await userFeatures.save();
    
    res.json(userFeatures.bookmarks);
  } catch (error) {
    console.error("Error deleting favorite:", error);
    res.status(500).json({ message: error.message });
  }
});

router.get('/api/bookmarks/:uid/:bookId', async (req, res) => {
  try {
    const { uid, bookId } = req.params;
    const userFeatures = await UserFeatures.findOne({ uid });
    if (!userFeatures) {
      return res.status(404).json({ message: 'User not found' });
    }
    const isbookmarked = userFeatures.bookmarks.includes(bookId);
    res.json({ isbookmarked });
  } catch (error) {
    console.error("Error checking favorite:", error);
    res.status(500).json({ message: error.message });
  }
});



//book-notes


router.get('/api/booknotes/:uid/:bookId', async (req, res) => {
  try {
    const { uid, bookId } = req.params;
    

    const noteDocument = await Note.findOne({ uid });
    if (!noteDocument) {
      
      return res.status(404).json({ message: 'User not found' });
    }

    const note = noteDocument.notes.find(note => note.bookId.toString() === bookId.toString());
    if (!note) {
     
      return res.status(404).json({ message: 'No note found for this book' });
    }

    
    res.status(200).json({content:note.content});
  } catch (error) {
    //console.error('Error fetching note:', error); // Error log
    res.status(500).json({ message: error.message });
  }
});



// POST a new note
router.post('/api/notes/:uid/:bookId', async (req, res) => {
  try {
    const { uid ,bookId } = req.params;
    const { content } = req.body;

    let noteDocument = await Note.findOne({ uid });

    if (!noteDocument) {
      
      noteDocument = new Note({
        uid,
        notes: [{ bookId, content }]
      });
    } else {
      // If the user document exists, check if the note for the bookId already exists
      const noteIndex = noteDocument.notes.findIndex(note => note.bookId === bookId);

      if (noteIndex === -1) {
        // If the note doesn't exist, add it to the notes array
        noteDocument.notes.push({ bookId, content });
      } 
    }

    const savedDocument = await noteDocument.save();
    res.status(201).json(savedDocument);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT an existing note
router.put('/api/booknotes/:uid/:bookId', async (req, res) => {
  try {
    const { uid, bookId } = req.params;
    const { content } = req.body;

    // Find the user's note document
    const noteDocument = await Note.findOne({ uid });

    if (!noteDocument) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the index of the note to be updated
    const noteIndex = noteDocument.notes.findIndex(note => note.bookId.toString() === bookId.toString());
    
    if (noteIndex === -1) {
      // Note not found for the given bookId
      return res.status(404).json({ message: 'Note not found for this book' });
    }

    // Update the note's content
    noteDocument.notes[noteIndex].content = content;

    // Save the updated note document
    const updatedDocument = await noteDocument.save();

    // Respond with the updated note
    res.json(updatedDocument.notes[noteIndex]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});




module.exports = router;