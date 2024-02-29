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
      .then(() => {
        // Sign-out successful.
        localStorage.removeItem("userAuthenticated");
        localStorage.removeItem("uid");
        dispatch(removeUser());
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
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

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
            <ul className="py-1 text-gray-700">
              <li>
                <a
                  href="#logout"
                  onClick={() => handleLogout()} // Replace with your logout logic
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserLogo;
