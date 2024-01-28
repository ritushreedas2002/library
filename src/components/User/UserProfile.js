import React, { useState } from 'react';

const UserProfile = ({ name, email, profilePic, onNameChange, onImageChange }) => {
  const [newName, setNewName] = useState(name);

  const handleNameSubmit = () => {
    onNameChange(newName);
  };

  const handleImageSubmit = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        onImageChange(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="bg-gray-300 h-32 w-32 rounded-full overflow-hidden mb-4">
        <img
          src={profilePic}
          alt="Profile"
          className="h-full w-full object-cover"
        />
      </div>
      <input
        type="file"
        accept="image/*"
        className="mb-4"
        onChange={handleImageSubmit}
      />
      <h2 className="text-2xl font-semibold mb-2">{name}</h2>
      <div className="mb-4">
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="border-b border-gray-400 focus:outline-none"
        />
        <button
          onClick={handleNameSubmit}
          className="bg-blue-500 text-white ml-2 px-4 py-1 rounded"
        >
          Save
        </button>
      </div>
      <p className="text-gray-600">{email}</p>
    </div>
  );
};

export default UserProfile;
