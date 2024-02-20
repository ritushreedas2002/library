import React, { useState, useEffect } from "react";
import Sidebar2 from "../MainBody/SideBar/Sidebar2";
import AddButton from "../../assets/AddButton.png";
import { IoIosAddCircle } from "react-icons/io";
import { MdAddTask } from "react-icons/md";
import { RxCrossCircled } from "react-icons/rx";
import { MdDeleteOutline } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { IoAddCircle } from "react-icons/io5";

const Notetaking = ({ userid }) => {
  const uid = decodeURIComponent(userid);
  const [notes, setNotes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);
  const [noteId, setNoteId] = useState(null);
  const [addNoteClicked, setaddvalues] = useState(false);
  const [color, setSelectedColor] = useState(null); // Default color is yellow
  const [isDeletedClicked, setisDeletedClicked] = useState(false);
  //const [showcolor, setshowcolor] = useState(false);
  const colorOptions = [
    //{ id: "#fec971", label: "Yellow" },
    { id: "#fe9b72", label: "Orange" },
    { id: "#e4ee91", label: "none" },
    { id: "#00d4fe", label: "Blue" },
    { id: "#b693fd", label: "purple" },
    { id: "#66CDAA", label: "MediumAquaMarine" },
    { id: "#DB7093", label: "PaleVioletRed" },
  ];
  useEffect(() => {
    // Update uid only if user1 and user1.uid are defined
    if (uid) {
      setNoteId(null);
      setTitle("");
      setTag("");
      setTags([]);
      setDescription("");
      setSelectedColor("");
      setaddvalues(false);
      setShowForm(false);
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
        body: JSON.stringify({ title, description, color, tags }),
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
    const updatedTitle = title.trim();
    const updatedDescription = description.trim();
    try {
      const response = await fetch(
        `http://localhost:5000/api/notes/${uid}/${noteId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: updatedTitle,
            description: updatedDescription,
            color,
            tags,
          }),
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
      setSelectedColor("");
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
    setShowForm(false);
    setisDeletedClicked(false);
  };

  const handleTagChange = (e) => {
    setTag(e.target.value);
  };

  const handleAddTag = () => {
    if (tag !== "") {
      setTags([...tags, tag]);
      setTag("");
    }
  };

  const handleUpdateNote = (note) => {
    setTitle(note.title);
    setDescription(note.description);
    setTags([...note.tags]);
    setNoteId(note._id);
    setSelectedColor(note.color);
    setShowForm(true);
  };
  const handleDeleteTag = (index) => {
    const updatedTags = [...tags];
    updatedTags.splice(index, 1);
    setTags(updatedTags);
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
  const year = date.getFullYear().toString().substr(-2); // Get last two digits of the year
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Add leading zero if needed
  const day = date.getDate().toString().padStart(2, '0'); // Add leading zero if needed
  const hours = date.getHours().toString().padStart(2, '0'); // Add leading zero if needed
  const minutes = date.getMinutes().toString().padStart(2, '0'); // Add leading zero if needed
  const seconds = date.getSeconds().toString().padStart(2, '0'); // Add leading zero if needed
  return `${month}-${day}-${year} ${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className=" flex">
      <div className=" w-[13%]">
        <Sidebar2 />
      </div>
      <div className="ml-10 w-[86%] mr-10">
        <div className="container mx-auto mt-4 ">
          <div>
            <h1 className="text-4xl font-semibold border-b-4 pb-1 mb-1">
              Notes
            </h1>
            <div className=" flex h-14 items-center">
              <img
                src={AddButton}
                /*className=" w- size-fit cursor-pointer hover:drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)]"*/
                alt="+ button"
                class="zoom"
                onClick={() => {
                  //setShowForm(true);
                  setaddvalues(!addNoteClicked);
                }}
              />
              {addNoteClicked && (
                <div className="flex mt-1  ml-5 space-x-2">
                  {colorOptions.map((option, index) => (
                    <div
                      key={index}
                      className={`w-8 h-8 rounded-full border border-gray-300 ${
                        color === option.id ? "border-6" : ""
                      }`}
                      style={{ backgroundColor: option.id, cursor: "pointer" }}
                      onClick={() => {
                        setSelectedColor(option.id);
                        setShowForm(true);
                      }}
                    ></div>
                  ))}
                </div>
              )}
            </div>
          </div>
          {showForm && (
            <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-40">
              <div
                className="p-8 rounded-2xl shadow-md w-[500px]"
                style={{
                  backgroundColor: color,
                }}
              >
                <h2 className="text-xl font-semibold text-gray-600 mb-3">
                  {noteId ? "Update Note" : "Add New Note"}
                </h2>
                <input
                  className="border-b-2 rounded-xl p-2 mb-2 w-full bg-gray-700 "
                  style={{ backgroundColor: "white" }}
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />

                <textarea
                  className="border-b-2 rounded-xl p-2 mb-2 w-full bg-white resize-none"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  style={{ minHeight: "150px" }} // Set minimum height to 100px or any desired value
                />
                <div className="mb-2 flex items-center ">
                  <input
                    className="border-b-2 rounded-xl p-2 mr-2"
                    style={{ backgroundColor: "white" }}
                    type="text"
                    placeholder="Tag"
                    value={tag}
                    onChange={handleTagChange}
                  />

                  <span className="text-5xl text-gray-800 hover:text-sky-900 cursor-pointer">
                    <IoIosAddCircle onClick={handleAddTag} />
                    {/* empty tags are also adding */}
                  </span>
                </div>
                <div className="mb-4 flex flex-wrap">
                  {tags.map((tag, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <span className="bg-gray-200 flex items-center rounded-full px-2 py-1 text-sm font-semibold text-gray-700 mr-2 ml-1">
                        {tag}
                        <div className=" text-lg">
                          <IoMdClose
                            className="text-gray-500 cursor-pointer ml-1 "
                            onClick={() => handleDeleteTag(index)}
                          />
                        </div>
                      </span>
                    </div>
                  ))}
                </div>
                {/* Color picker dropdown */}

                <div className="flex items-center mb-4">
                  <div className="bg-slate-400 p-2 text-white rounded-xl">
                    Choose color
                  </div>
                  {
                    <div className="flex mt-1  ml-5 space-x-2">
                      {colorOptions.map((option, index) => (
                        <div
                          key={index}
                          className={`w-8 h-8 rounded-full border border-gray-300 ${
                            color === option.id ? "border-6" : ""
                          }`}
                          style={{
                            backgroundColor: option.id,
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            setSelectedColor(option.id);
                          }}
                        ></div>
                      ))}
                    </div>
                  }
                </div>
                <div className=" flex  items-center justify-end">
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white text-2xl font-extrabold py-2 px-8 rounded mr-4"
                    onClick={noteId ? updateNote : addNote}
                  >
                    <MdAddTask />
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white text-2xl font-extrabold py-2 px-8 rounded"
                    onClick={() => {
                      setShowForm(false);
                      setNoteId(null); // Reset noteId when canceling
                      setTitle("");
                      setTag("");
                      setTags([]);
                      setSelectedColor("");
                      setDescription("");
                      setaddvalues(false);
                    }}
                  >
                    <RxCrossCircled />
                  </button>
                </div>
              </div>
            </div>
          )}
          {notes.length !== 0 ? (
            <div className="mt-2 flex flex-wrap relative">
              {notes.map((note) => (
                <div
                  key={note._id}
                  className="p-4 rounded-3xl m-1.5 relative cursor-pointer h-[300px] w-[300px]"
                  style={{
                    backgroundColor: note.color,
                  }}
                  onClick={() => {
                    if (isDeletedClicked === false) {
                      handleUpdateNote(note);
                    }
                  }}
                >
                  <h2 className="text-xl font-semibold -mt-2">
                    {note.title && (
                      <>
                        <div className="flex flex-col justify-between">
                          <p>{note.title}</p>
                          <p className="text-gray-500 text-xs mt-3 ml-28">Edited On {formatDate(note.lastEdited)}</p>
                        </div>
                        <div className="border border-b-2 mt-1"></div>
                      </>
                    )}
                  </h2>
                  <div className="text-base mt-1 h-48 text-black overflow-y-scroll no-scrollbar">
                    {note.description}
                  </div>
                  {/* <p>
                  <strong>Tags:</strong> {note.tags.join(", ")}
                </p> */}
                  <div className=" absolute bottom-4 left-4 flex w-48 overflow-x-scroll no-scrollbar ">
                    {note.tags.map((tag, index) => (
                      <div
                        key={index}
                        className=" bg-gray-200 rounded  px-1 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2"
                        style={{ whiteSpace: "nowrap" }}
                      >
                        {tag}
                      </div>
                    ))}
                  </div>
                  <div onClick={(e) => e.stopPropagation()}>
                    <button
                      className="text-2xl font-extrabold bg-red-500 hover:bg-red-700 text-white py-2 px-5 rounded-xl absolute bottom-4 right-4"
                      onClick={() => {
                        setisDeletedClicked(true);
                        deleteNote(note._id);
                      }}
                    >
                      <MdDeleteOutline />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center h-96 mt-10">
              <div className="text-3xl flex font-semibold items-center">
                Click <IoAddCircle className=" mx-2" /> to start adding notes
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Notetaking;
