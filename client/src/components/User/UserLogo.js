import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { removeUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signOut } from "firebase/auth";
import { auth } from "../utils/Firebase";
const UserLogo = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const uid=localStorage.getItem("uid");
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
            uid: uid,
          },
        });
        console.log(response.data);
        console.log(uid);
        setUser({name:response.data.name,email:response.data.email,profileImage:response.data.displayPicture});
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Handle error
      }
    };

    fetchUserData();
  }, [uid]); // Include user1.uid in dependency array

  const handleLogout = () => {
    signOut(auth)
      .then(async () => { // Note: Added async here
        try {
          const userId = localStorage.getItem("uid"); // Retrieve the user ID
          if (!userId) {
            console.error("User ID not found");
            return;
          }
    
          const response = await fetch(`http://localhost:5000/api/chat-messages/${userId}`, {
            method: 'DELETE',
          });
    
          if (!response.ok) {
            throw new Error('Failed to delete messages');
          }
    
          // Assuming you have a state management for messages
          // setMessages([]); // Clear messages from state
          console.log("All messages have been deleted successfully.");
        } catch (error) {
          console.error("Error deleting messages:", error);
        }
        // Proceed to clear local storage and user state
        localStorage.removeItem("userAuthenticated");
        localStorage.removeItem("uid");
        dispatch(removeUser());
        navigate("/");
      })
      .catch((error) => {
        // Handle sign-out errors
        console.error("Logout error:", error);
      });
};

  // Toggle the dropdown menu
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <div className="flex justify-end items-center">
      {/* User Image */}
      <div className="absolute top-7 right-10">
        <div onClick={toggleDropdown} className="cursor-pointer">
          <img src={user.profileImage} alt="User" className="rounded-full w-16 h-16 border-2 border-gray-300" />
        </div>
        </div>
        {isDropdownOpen && (
        <div>
        <div className={`transform rotate-180 transition absolute right-16 top-[87px] text-white`}>
          {/* Triangle icon can be replaced with an SVG or another icon */}
          ▲
        </div>
        <div className="absolute right-4 top-[104px] w-28 bg-white rounded-lg shadow-lg z-10">
          <ul className="text-center text-gray-800">
            <li className="px-4 py-2 hover:bg-purple-600 hover:text-white transition-colors cursor-pointer" onClick={handleLogout}>
              Log out
            </li>
          </ul>
        </div>
        </div>
      )}
      </div>
    
  );
};

export default UserLogo;
