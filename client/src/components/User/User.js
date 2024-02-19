
import { useEffect, useState } from "react";
import EditProfileModal from "./EditProfile";
import UserProfile from "./UserProfile";
import {  useSelector } from "react-redux";
import Sidebar2 from "../MainBody/SideBar/Sidebar2";
import axios from "axios"; 

const User = () => {
  const user1 = useSelector(store => store.user.user);

  const [user, setUser] = useState({
    name: "unkown",
    email: "unkonown",
    profileImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRImuk1S2k7pdtVjPyBZoOELIz5_wc4kFt0EnzAO7thPw&s",
  });
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/user", {
          params: {
            uid: user1.uid,
          },
        });
        console.log(response.data);
        console.log(user1.uid);
        setUser({name:response.data.name,email:response.data.email,profileImage:response.data.displayPicture});
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Handle error
      }
    };

    fetchUserData();
  }, [user1?.uid]); // Include user1.uid in dependency array
 
  
  console.log(user);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditProfileClick = () => {
    setIsEditing(true);
  };
  const handleSaveChanges = async (newName, newProfileImage) => {
    try {
      const requestBody = {
        name: newName,
        // displayPicture: newProfileImage, // You can include this if needed
      };
  
      const response = await fetch(`http://localhost:5000/profile/${user1.uid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
  
      if (!response.ok) {
        throw new Error('Failed to save changes');
      }
  
      const updatedUserData = await response.json();
  
      setUser({
        ...user,
        name: updatedUserData.name,
        profileImage: updatedUserData.displayPicture || user.profileImage,
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving changes:", error);
      // Handle error
    }
  };
  
  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  return (
    <>
      <Sidebar2/>
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

