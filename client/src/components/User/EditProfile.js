// EditProfileModal.js
import React, { useState } from 'react';

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
      <div className="bg-white p-6 rounded shadow-md flex flex-col">
        <h2 className="text-xl font-bold mb-4 text-red-700">Edit Profile</h2>

        <label htmlFor="upload-photo" className='text-red-400'>Upload Profile Photo:</label>
        <input
          type="file"
          id="upload-photo"
          accept="image/*"
          onChange={handleImageChange}
          className="mb-4"
        />

        <label htmlFor="edit-name" className='text-red-400'>Edit Name:</label>
        <input
          type="text"
          id="edit-name"
          placeholder="Enter your name"
          value={name}
          onChange={handleNameChange}
          className="mb-4"
        />

        <div className="flex justify-between">
          <button
            onClick={onCancel}
            className="bg-red-800 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveClick}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
