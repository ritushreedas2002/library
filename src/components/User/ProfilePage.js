import React, { useState } from 'react';
import UserProfile from './UserProfile';

const ProfilePage = () => {
  // Initial user data (you can replace this with your actual user data)
  const initialUser = {
    name: 'John Doe',
    email: 'john@example.com',
    profilePic: 'default-profile-pic.jpg', // Provide a default profile picture URL
  };

  const [user, setUser] = useState(initialUser);

  const handleNameChange = (newName) => {
    setUser((prevUser) => ({ ...prevUser, name: newName }));
  };

  const handleImageChange = (newImage) => {
    setUser((prevUser) => ({ ...prevUser, profilePic: newImage }));
  };

  return (
    <div className="container mx-auto mt-8">
      <UserProfile
        name={user.name}
        email={user.email}
        profilePic={user.profilePic}
        onNameChange={handleNameChange}
        onImageChange={handleImageChange}
      />
    </div>
  );
};

export default ProfilePage;
