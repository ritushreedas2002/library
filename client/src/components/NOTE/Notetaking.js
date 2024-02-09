import React, { useState, useEffect } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { IoIosAddCircle } from "react-icons/io";
import { MdCancel } from "react-icons/md";
const Notetaking = ({ userid }) => {
  const uid = decodeURIComponent(userid);
  const [notes, setNotes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);
  const [noteId, setNoteId] = useState(null);
  useEffect(() => {
    // Update uid only if user1 and user1.uid are defined
    if (uid) {
      setNoteId(null);
      setTitle("");
      setTag("");
      setTags([]);
      setDescription("");
      fetchNotes();
    }
  }, [uid]);

  const fetchNotes = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/notes/${uid}`);
      if (!response.ok) {
        throw new Error("Failed to fetch notes");
      }
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error(error);
    }
  };

  const addNote = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/notes/${uid}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, tags }),
      });
      if (!response.ok) {
        throw new Error("Failed to add note");
      }
      setTitle("");
      setDescription("");
      setTags([]);
      fetchNotes();
      setShowForm(false);
    } catch (error) {
      console.error(error);
    }
  };

  const updateNote = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/notes/${uid}/${noteId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, description, tags }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update note");
      }
      fetchNotes();
      setShowForm(false);
      setNoteId(null);
      setTitle("");
      setTag("");
      setTags([]);
      setDescription("");
    } catch (error) {
      console.error(error);
    }
  };

  const deleteNote = async (noteId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/notes/${uid}/${noteId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete note");
      }
      fetchNotes();
    } catch (error) {
      console.error(error);
    }
  };

  const handleTagChange = (e) => {
    setTag(e.target.value);
  };

  const handleAddTag = () => {
    setTags([...tags, tag]);
    setTag("");
  };

  const handleUpdateNote = (note) => {
    setTitle(note.title);
    setDescription(note.description);
    setTags([...note.tags]);
    setNoteId(note._id);
    setShowForm(true);
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl mb-4">Note Taking App</h1>
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setShowForm(true)}
      >
        Add Note
      </button>
      {showForm && (
        <div className="mt-8">
          <h2 className="text-xl mb-2">
            {noteId ? "Update Note" : "Add New Note"}
          </h2>
          <input
            className="border rounded p-2 mb-2"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="border rounded p-2 mb-2"
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="mb-2">
            <input
              className="border rounded p-2 mr-2"
              type="text"
              placeholder="Tag"
              value={tag}
              onChange={handleTagChange}
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleAddTag}
            >
              Add Tag
            </button>
          </div>
          <div className="mb-4">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
              >
                {tag}
              </span>
            ))}
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={noteId ? updateNote : addNote}
          >
            {noteId ? "Update" : "Create"}
          </button>
          <button
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              setShowForm(false);
              setNoteId(null); // Reset noteId when canceling

              setTitle("");
              setTag("");
              setTags([]);
              setDescription("");
            }}
          >
            Cancel
          </button>
        </div>
      )}
      <div className="mt-8">
        {notes.map((note) => (
          <div key={note._id} className="mb-4">
            <h2 className="text-xl">{note.title}</h2>
            <p>{note.description}</p>
            <p>
              <strong>Tags:</strong> {note.tags.join(", ")}
            </p>
            <div>
              <button
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2"
                onClick={() => handleUpdateNote(note)}
              >
                Update
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => deleteNote(note._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Notetaking;
