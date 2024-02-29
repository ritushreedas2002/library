// UserProfile.js
import React from "react";

const UserProfile = ({ user, onEditProfileClick }) => {
  if (!user) {
    // If user is null, render a loading state or return null
    return <div>Loading...</div>;
  }
  const { name, email, profileImage } = user;
  

  return (
    <div className="w-full max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="md:flex">
        <div className="w-full p-4">
          <h1 className="text-3xl font-semibold text-blue-600">Account</h1>
          <p className="text-gray-600">Manage your account settings</p>

          <div className="mt-6 border-t-2 border-gray-200">
            <div className="mt-4">
              <h2 className="text-2xl font-bold text-blue-500">Profile</h2>
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center">
                  <div className="rounded-full h-36 w-36 overflow-hidden mr-4 object-cover">
                    <img src={profileImage?profileImage:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRImuk1S2k7pdtVjPyBZoOELIz5_wc4kFt0EnzAO7thPw&s"}
                      alt="Profile"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="mt-4 flex">
                      <h2 className="text-lg font-semibold text-blue-500">
                        Username:
                      </h2>
                      <h2 className="text-gray-800 pl-3 text-lg font-semibold">{name}</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <h2 className="text-lg font-semibold text-blue-500">
                Email addresses
              </h2>
              <div className="p-4 flex justify-between items-center">
                <div>
                  <span className="text-gray-800 break-all">{email}</span>
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
                    Primary
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={onEditProfileClick}
        className="bg-blue-500 text-white px-4 py-2 ml-96 mb-12 rounded"
      >
        Edit Profile
      </button>
    </div>
  );
};

export default UserProfile;
