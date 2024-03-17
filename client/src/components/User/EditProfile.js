// EditProfileModal.js
import React, { useState } from "react";

const EditProfileModal = ({ onSaveChanges, onCancel, user }) => {
  const [name, setName] = useState(user.name);
  const [profileImage, setProfileImage] = useState(null);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
  };

  const handleSaveClick = () => {
    onSaveChanges(name, profileImage);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 w-[30%]  rounded-3xl shadow-md flex flex-col">
        <h2 className="text-3xl font-bold mb-4 text-red-500 text-center">
          Edit Profile
        </h2>

        <label
          htmlFor="upload-photo"
          className="text-red-400 text-xl font-semibold mb-4"
        >
          Upload Profile Photo:
        </label>
        <input
          type="file"
          id="upload-photo"
          accept="image/*"
          onChange={handleImageChange}
          className="mb-8"
        />

        <label
          htmlFor="edit-name"
          className="text-red-400 text-xl font-semibold mb-4"
        >
          Edit Name:
        </label>
        <input
          type="text"
          id="edit-name"
          placeholder="Enter your name"
          value={name}
          onChange={handleNameChange}
          className="mb-8 p-2 px-4 bg-blue-100  rounded-xl text-lg font-semibold"
        />

        <div className="flex justify-between">
          <button
            onClick={onCancel}
            className="bg-red-600 hover:bg-red-800 text-white px-4 py-2 rounded-lg transition-transform duration-100 cursor-pointer hover:scale-110"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveClick}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-transform duration-100 cursor-pointer hover:scale-110"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
