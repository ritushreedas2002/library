//import { useState } from "react";
import { FiMenu, FiHome, FiSettings, FiLock, FiHeart } from "react-icons/fi";

import { BiLogOut } from "react-icons/bi";
import { Link,  useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../utils/Firebase";
import { useDispatch } from "react-redux";
import { removeUser } from "../../utils/userSlice";

const Sidebar2 = ({onSignOut}) => {
  //const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        localStorage.setItem("userAuthenticated", "false");
        dispatch(removeUser());
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <div
      className={`fixed inset-y-0 left-0 w-[13%] h-full transition-width duration-300 overflow-hidden bg-black`}
    >
      <button
        className="text-white text-4xl p-4 hover:bg-purple-900 focus:outline-none focus:bg-purple-900"
        // onClick={() => setIsOpen(!isOpen)}
      >
        <FiMenu />
      </button>
      <nav>
        <ul className="mt-10">
          <li className="mt-5 group">
            <Link
              to="/MainBody"
              className="flex items-center pl-4 pr-20 py-2 w-auto m-2 text-white hover:bg-purple-900 rounded"
            >
              <span className="text-2xl">
                <FiHome />
              </span>
              <span className="ml-4 text-lg group-hover:text-gray-300">
                Home
              </span>
            </Link>
          </li>
          <li className=" mt-5 group">
            <div className="flex items-center pl-4 pr-20 py-2 w-auto m-2 text-white hover:bg-purple-900 rounded">
              <span className="text-2xl">
                <FiSettings />
              </span>
              <span className="ml-4 text-lg group-hover:text-gray-300">
                Settings
              </span>
            </div>
          </li>
          <li className="mt-5 group">
            <Link
              to="/User"
              className="flex items-center pl-4 pr-20 py-2 w-auto m-2 text-white hover:bg-purple-900 rounded"
            >
              <span className="text-2xl">
                <FiLock />
              </span>
              <span className="ml-4 text-lg group-hover:text-gray-300">
                Account
              </span>
            </Link>
          </li>
          <li className="mt-5 group">
            <div className="flex items-center pl-4 pr-20 py-2 w-auto m-2 text-white hover:bg-purple-900 rounded">
              <span className="text-2xl">
                <FiHeart />
              </span>
              <span className="ml-4 text-lg group-hover:text-gray-300">
                Favourites
              </span>
            </div>
          </li>
          <li className=" mt-5 group cursor-pointer">
            <div
              className="flex items-center pl-4 pr-20 py-2 w-auto m-2 text-white hover:bg-purple-900 rounded"
              onClick={handleLogout}
            >
              <span className="text-2xl">
                <BiLogOut />
              </span>
              <span className="ml-4 text-lg group-hover:text-gray-300">
                Logout
              </span>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar2;
