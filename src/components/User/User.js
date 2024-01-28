import { useState } from "react";
import EditProfileModal from "./EditProfile";
import UserProfile from "./UserProfile";

const User = () => {


  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    profileImage: null,
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleEditProfileClick = () => {
    setIsEditing(true);
  };

  const handleSaveChanges = (newName, newProfileImage) => {
    setUser({
      ...user,
      name: newName,
      profileImage: newProfileImage || user.profileImage,
    });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };
  return (
    <>
      <div className="flex justify-center items-center h-screen bg-slate-200">
      {isEditing ? (
        <EditProfileModal
          onSaveChanges={handleSaveChanges}
          onCancel={handleCancelEdit}
          user={user}
        />
      ) : (
        <UserProfile user={user} onEditProfileClick={handleEditProfileClick} />
      )}
    </div>

    </>
  );
};
export default User;
