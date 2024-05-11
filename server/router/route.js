const express = require("express");
const User = require("../models/User");
const UserNote = require("../models/Notes");
const UserFeatures = require("../models/Features");
const SearchHistory = require("../models/search");
const Note = require("../models/Indibooknotes");
const chatbot = require("../Chatbot/Chatbot");
const ChatMessage=require("../models/chatmessage");
const Search=require("../models/SearchHistory")
const path = require("path");
const router = express.Router();
const multer = require("multer");
router.use(
  "/images",
  express.static(path.join(__dirname, "https://library-aes6.vercel.app/public/images"))
);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Adjust the path to point to your client's image directory
    const dest = path.join(__dirname, "https://library-aes6.vercel.app/public/images");
    cb(null, dest);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

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

router.put("/profile/:uid", upload.single("profileImage"), async (req, res) => {
  const { uid } = req.params;
  const { name } = req.body;

  let updateData = { name };
  if (req.file) {
    updateData.displayPicture = `/images/${req.file.filename}`;
  }

  try {
    const updatedUser = await User.findOneAndUpdate({ uid }, updateData, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(updatedUser);
  } catch (error) {
    console.error(`Error updating user data: ${error.message}`);
    res.status(500).json({ error: "Failed to update user data" });
  }
});



router.delete("/delete/:uid", async (req, res) => {
  try {
    const { uid } = req.params;

    const userFound = await User.findOne({ uid });
    if (!userFound) {
      return res.status(404).json({ error: "User not found!" });
    }

    await User.deleteOne({ uid });
    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    console.error(`Error occurred: ${error.message}`);
    res.status(500).json({ error: "An error occurred while deleting the user." });
  }
});


//NOTES
// Routes
router.get("/api/notes/:uid", async (req, res) => {
  try {
    const { uid } = req.params;
    const user = await UserNote.findOne({ uid });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const combinedNotes = [...user.favorites, ...user.notes];
    res.status(200).json(combinedNotes);
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
        notes: [{ title, description, color, tags, lastEdited }],
      });
    } else {
      userNote.notes.push({ title, description, color, tags, lastEdited });
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
    const noteIndex = user.notes.findIndex(
      (note) => note._id.toString() === noteId
    );

    // If the note is not found, return a 404 error
    if (noteIndex === -1) {
      return res.status(404).json({ message: "Note not found" });
    }

    // Update the note with the new values
    user.notes[noteIndex].title = title.trim() === "" ? "" : title;
    user.notes[noteIndex].description =
      description.trim() === "" ? "" : description;
    user.notes[noteIndex].color = color;
    user.notes[noteIndex].tags = tags;
    user.notes[noteIndex].lastEdited = lastEdited;
    // Save the updated user document
    await user.save();

    // Return the updated note in the response
    res.status(200).json(user.notes[noteIndex]);
  } catch (error) {
    console.error(`Error occurred: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/api/notes/:uid/:noteId", async (req, res) => {
  try {
    const { uid, noteId } = req.params;
    const user = await UserNote.findOne({ uid });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check and remove the note from the notes array
    let noteIndex = user.notes.findIndex(note => note._id.toString() === noteId);
    let noteFoundInNotes = noteIndex !== -1;
    if (noteFoundInNotes) {
      user.notes.splice(noteIndex, 1);
    }

    // Check and remove the note from the favorites array if not found in notes
    if (!noteFoundInNotes) {
      noteIndex = user.favorites.findIndex(note => note._id.toString() === noteId);
      if (noteIndex !== -1) {
        user.favorites.splice(noteIndex, 1);
      } else {
        // If the note is not found in both arrays, return an error
        return res.status(404).json({ message: "Note not found" });
      }
    }

    await user.save();
    res.json({notes: user.notes, favorites: user.favorites});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});




//favourite notes
// Route to add a note to favorites
// Route to add a note to favorites using PUT or PATCH method
router.put('/api/notes/favorite/:uid/:noteId', async (req, res) => {
  const { uid, noteId } = req.params;
  
  try {
    const userNote = await UserNote.findOne({ uid: uid });
    if (!userNote) {
      return res.status(404).send('User not found');
    }

    // Find the note to favorite
    const noteIndex = userNote.notes.findIndex(note => note._id.toString() === noteId);
    if (noteIndex === -1) {
      return res.status(404).send('Note not found');
    }

    // Retrieve the note to favorite
    const [noteToFavorite] = userNote.notes.splice(noteIndex, 1);
    noteToFavorite.favorite = true;

    userNote.favorites.push(noteToFavorite); // Add to favorites array

    await userNote.save();
    res.status(200).send('Note added to favorites');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});




// Route to remove a note from favorites using DELETE method
router.delete('/api/notes/unfavorite/:uid/:noteId', async (req, res) => {
  const { uid, noteId } = req.params;
  
  try {
    const userNote = await UserNote.findOne({ uid: uid });
    if (!userNote) {
      return res.status(404).send('User not found');
    }

    // Find the note in favorites
    const noteToUnfavoriteIndex = userNote.favorites.findIndex(note => note._id.toString() === noteId);
    if (noteToUnfavoriteIndex === -1) {
      return res.status(404).send('Favorite note not found');
    }
    
    // Retrieve the note to unfavorite
    const [noteToUnfavorite] = userNote.favorites.splice(noteToUnfavoriteIndex, 1);

    // Set note as not favorite and move it back to notes array
    noteToUnfavorite.favorite = false;
    userNote.notes.push(noteToUnfavorite);

    await userNote.save();
    res.status(200).send('Note removed from favorites');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});




//favourites
router.get("/api/favorites/:uid", async (req, res) => {
  try {
    const { uid } = req.params;
    const userFeatures = await UserFeatures.findOne({ uid });
    if (!userFeatures) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ favorites: userFeatures.favourites });
  } catch (error) {
    console.error("Error fetching favorites:", error);
    res.status(500).json({ message: error.message });
  }
});

router.post("/api/favorites/:uid/:bookId", async (req, res) => {
  try {
    const { uid, bookId } = req.params;
    // const { bookId } = req.body;

    let userFeatures = await UserFeatures.findOne({ uid });
    if (!userFeatures) {
      userFeatures = new UserFeatures({
        uid,
        favourites: [bookId],
        bookmarks: [], // assuming bookmarks are managed in the same schema
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

router.delete("/api/favorites/:uid/:bookId", async (req, res) => {
  try {
    const { uid, bookId } = req.params;

    const userFeatures = await UserFeatures.findOne({ uid });
    if (!userFeatures) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the index of the bookId to remove from favourites
    const bookIndex = userFeatures.favourites.indexOf(bookId);
    if (bookIndex === -1) {
      return res.status(404).json({ message: "Book not found in favorites" });
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

router.get("/api/favorites/:uid/:bookId", async (req, res) => {
  try {
    const { uid, bookId } = req.params;
    const userFeatures = await UserFeatures.findOne({ uid });
    if (!userFeatures) {
      return res.status(404).json({ message: "User not found" });
    }
    const isFavorited = userFeatures.favourites.includes(bookId);
    res.json({ isFavorited });
  } catch (error) {
    console.error("Error checking favorite:", error);
    res.status(500).json({ message: error.message });
  }
});

//current read
router.post("/api/current-read", async (req, res) => {
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

    res
      .status(200)
      .json({
        success: true,
        message: "Current read book ID updated successfully",
      });
  } catch (error) {
    console.error("Error updating current read book ID:", error.message);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

router.get("/api/current-read/:uid", async (req, res) => {
  try {
    const { uid } = req.params;

    // Query the database for the user's currentRead field
    const userFeatures = await UserFeatures.findOne({ uid });

    // If user not found or currentRead field is empty, return null
    if (
      !userFeatures ||
      !userFeatures.currentRead ||
      userFeatures.currentRead.length === 0
    ) {
      return res.status(200).json({ currentRead: null });
    }

    // Return the current book ID
    res.status(200).json({ currentRead: userFeatures.currentRead[0] });
  } catch (error) {
    console.error("Error fetching current read book ID:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

///recently viewwed

const MAX_RECENTLY_VIEWED = 12;

router.post("/api/recently-viewed", async (req, res) => {
  const { userId, bookId } = req.body;

  try {
    let userFeatures = await UserFeatures.findOne({ uid: userId });

    if (!userFeatures) {
      // If userFeatures document doesn't exist, create a new one with the bookId
      userFeatures = new UserFeatures({
        uid: userId,
        recentlyviewed: [bookId],
      });
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

    res
      .status(200)
      .json({
        success: true,
        message: "Recently viewed book added successfully",
      });
  } catch (error) {
    console.error("Error adding recently viewed book:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

router.get("/api/recently-viewed/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const userFeatures = await UserFeatures.findOne({ uid: userId });

    if (!userFeatures || !userFeatures.recentlyviewed.length) {
      return res
        .status(404)
        .json({ success: false, message: "No recently viewed books found" });
    }

    // Reverse the array to show the most recently viewed books first
    const recentlyViewedBooks = userFeatures.recentlyviewed;

    res
      .status(200)
      .json({ success: true, recentlyViewed: recentlyViewedBooks });
  } catch (error) {
    console.error("Error fetching recently viewed books:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

//bookmark
router.get("/api/bookmarks/:uid", async (req, res) => {
  try {
    const { uid } = req.params;
    const userFeatures = await UserFeatures.findOne({ uid });
    if (!userFeatures) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ bookmarks: userFeatures.bookmarks });
  } catch (error) {
    console.error("Error fetching favorites:", error);
    res.status(500).json({ message: error.message });
  }
});

router.post("/api/bookmarks/:uid/:bookId", async (req, res) => {
  try {
    const { uid, bookId } = req.params;
    // const { bookId } = req.body;

    let userFeatures = await UserFeatures.findOne({ uid });
    if (!userFeatures) {
      userFeatures = new UserFeatures({
        uid,
        bookmarks: [bookId], // assuming bookmarks are managed in the same schema
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

router.delete("/api/bookmarks/:uid/:bookId", async (req, res) => {
  try {
    const { uid, bookId } = req.params;

    const userFeatures = await UserFeatures.findOne({ uid });
    if (!userFeatures) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the index of the bookId to remove from favourites
    const bookIndex = userFeatures.bookmarks.indexOf(bookId);
    if (bookIndex === -1) {
      return res.status(404).json({ message: "Book not found in favorites" });
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

router.get("/api/bookmarks/:uid/:bookId", async (req, res) => {
  try {
    const { uid, bookId } = req.params;
    const userFeatures = await UserFeatures.findOne({ uid });
    if (!userFeatures) {
      return res.status(404).json({ message: "User not found" });
    }
    const isbookmarked = userFeatures.bookmarks.includes(bookId);
    res.json({ isbookmarked });
  } catch (error) {
    console.error("Error checking favorite:", error);
    res.status(500).json({ message: error.message });
  }
});

//book-notes

router.get("/api/booknotes/:uid/:bookId", async (req, res) => {
  try {
    const { uid, bookId } = req.params;

    const noteDocument = await Note.findOne({ uid });
    if (!noteDocument) {
      return res.status(404).json({ message: "User not found" });
    }

    const note = noteDocument.notes.find(
      (note) => note.bookId.toString() === bookId.toString()
    );
    if (!note) {
      return res.status(404).json({ message: "No note found for this book" });
    }

    res.status(200).json({ content: note.content });
  } catch (error) {
    //console.error('Error fetching note:', error); // Error log
    res.status(500).json({ message: error.message });
  }
});

// POST a new note
router.post("/api/notes/:uid/:bookId", async (req, res) => {
  try {
    const { uid, bookId } = req.params;
    const { content } = req.body;

    let noteDocument = await Note.findOne({ uid });

    if (!noteDocument) {
      noteDocument = new Note({
        uid,
        notes: [{ bookId, content }],
      });
    } else {
      // If the user document exists, check if the note for the bookId already exists
      const noteIndex = noteDocument.notes.findIndex(
        (note) => note.bookId === bookId
      );

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
router.put("/api/booknotes/:uid/:bookId", async (req, res) => {
  try {
    const { uid, bookId } = req.params;
    const { content } = req.body;

    // Find the user's note document
    const noteDocument = await Note.findOne({ uid });

    if (!noteDocument) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the index of the note to be updated
    const noteIndex = noteDocument.notes.findIndex(
      (note) => note.bookId.toString() === bookId.toString()
    );

    if (noteIndex === -1) {
      // Note not found for the given bookId
      return res.status(404).json({ message: "Note not found for this book" });
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

//search
router.get("/api/search-history/:uid", async (req, res) => {
  const { uid } = req.params;
  try {
    const searchHistory = await SearchHistory.findOne({ uid });
    res.json(searchHistory);
  } catch (error) {
    console.error("Error retrieving search history:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/api/search-history/:uid", async (req, res) => {
  const { uid } = req.params;
  const { search } = req.body;
  try {
    let searchHistory = await SearchHistory.findOne({ uid });
    if (!searchHistory) {
      // Create new search history entry if it doesn't exist
      searchHistory = new SearchHistory({ uid, search: [search] });
    } else {
      // Check if the bookId already exists in recently viewed
      const index = searchHistory.search.indexOf(search);
      if (index !== -1) {
        // If it exists, remove it from the current position
        searchHistory.search.splice(index, 1);
      }

      // Add new search to the beginning of the array
      searchHistory.search.unshift(search);

      // Limit the length of the array to 3
      if (searchHistory.search.length > 4) {
        searchHistory.search.pop(); // Remove the last item
      }
    }
    // Save updated search history
    await searchHistory.save();

    res.json(searchHistory);
  } catch (error) {
    console.error("Error updating search history:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

chatbot
router.post("/text-query", async (req, res) => {
  const { text, userId } = req.body;
  const resultQuery = await chatbot.textQuery(text, userId); //function  to chatbot
  const resObj = {
   name:resultQuery[0].queryResult.intent.displayName,
    userQuery: resultQuery[0].queryResult.queryText,
    fulfillmentText: resultQuery[0].queryResult.fulfillmentText,
  };
  //console.log(resObj);
  res.send(resObj);
});




//chatmessages

// Assuming you have Express setup
router.post('/api/chat-messages', async (req, res) => {
  const { userId, text, type } = req.body;

  try {
    let chatMessage = await ChatMessage.findOne({ userId });
    if (!chatMessage) {
      // If no chat history exists for this user, create a new one
      chatMessage = new ChatMessage({ userId, messages: [] });
    }
    // Add the new message
    chatMessage.messages.push({ text, type });
    await chatMessage.save();

    res.status(201).json(chatMessage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.get('/api/chat-messages/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const chatMessage = await ChatMessage.findOne({ userId });
    if (!chatMessage) {
      return res.status(404).json({ message: "No chat history found for this user." });
    }

    res.json(chatMessage.messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.delete('/api/chat-messages/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    // Attempt to delete the user's messages
    const result = await ChatMessage.deleteOne({ userId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'No messages found for the specified user.' });
    }

    res.status(200).json({ message: 'All messages for the user have been deleted successfully.' });
  } catch (error) {
    console.error('Error deleting messages:', error);
    res.status(500).json({ message: 'Failed to delete messages due to an internal error.' });
  }
});




//Search for search bar

// Assuming you have a route for search suggestions
router.get('/api/search-suggestions/:uid/:query', async (req, res) => {
  const { uid, query } = req.params;

  if (!query.trim()) {
    // Return early if query is empty or only contains whitespace
    return res.json([]);
  }

  try {
    const history = await Search.findOne({ uid });

    if (history && history.searches) {
      // Ensure there is a history and it has searches
      const matches = history.searches
        .filter(searchTerm => searchTerm.toLowerCase().includes(query.toLowerCase()))
        .slice(-5); // Get up to the last 5 matches that include the query

      const uniqueMatches = [...new Set(matches)]; // Remove duplicates
      
      res.json(uniqueMatches);
    } else {
      res.json([]);
    }
  } catch (error) {
    console.error('Error fetching search suggestions:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



// Assuming Express and the SearchHistory model is set up
router.post('/api/search/:userId', async (req, res) => {
  const { userId } = req.params;
  const { searchTerm } = req.body;

  try {
    // Check if the search term already exists to avoid duplicates
    const existingSearch = await Search.findOne({ uid: userId, searches: searchTerm });

    if (!existingSearch) {
      // Update the document by pushing the new search term into the searches array
      const updatedSearchHistory = await Search.findOneAndUpdate(
        { uid: userId },
        { $push: { searches: searchTerm } },
        { new: true, upsert: true } // Upsert option to create a new document if it doesn't exist
      );

      res.status(200).json({ message: 'Search term stored successfully.', data: updatedSearchHistory });
    } else {
      // If the search term already exists, just return success without adding a duplicate
      res.status(200).json({ message: 'Search term already exists.', data: existingSearch });
    }
  } catch (error) {
    console.error('Error storing search term:', error);
    res.status(500).json({ message: 'Server error while storing search term', error: error.message });
  }
});



module.exports = router;
