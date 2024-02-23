//import { useState } from "react";
import {
  FiHome,
  FiSettings,
  FiLock,
  FiHeart,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";
import { FaRegFilePdf } from "react-icons/fa6";
import { BiLogOut } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../utils/Firebase";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../../utils/userSlice";
import { FaRegStickyNote } from "react-icons/fa";
import { IoMdBookmarks } from "react-icons/io";
import { useState } from "react";
import JoyRide from "react-joyride";
import { steps } from "../../utils/constantsJoy";

const Sidebar2 = ({ onSignOut }) => {
  //const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((store) => store.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  const handleDropdownClick = (event) => {
    // event.preventDefault();
    event.stopPropagation();
  };

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
  return (
    <div
      className={`fixed inset-y-0 left-0 w-[13%] h-full overflow-hidden bg-black`}
    >
      <div className="text-white text-4xl p-4  ">
        <h6 className="text-[20px] font-semibold text-white">
          "Welcome"{" "}
          <div
            className="text-blue-500"
            style={{ fontFamily: "Pacifico, cursive" }}
          >
            {user?.displayName}
          </div>
        </h6>
      </div>
      <nav>
        <ul className="mt-5">
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
          <li
            className=" mt-4 group cursor-pointer"
            onClick={toggleAccordion}
            id="mybooks"
          >
            <div className="flex items-center pl-4 pr-2 py-1 w-auto m-2 text-white hover:bg-purple-900 rounded">
              <span className="text-2xl">
                <IoMdBookmarks />
              </span>
              <div className=" ml-4 text-lg pr-2 group-hover:text-gray-300">
                My Books
              </div>
              {isAccordionOpen ? (
                <FiChevronUp className="text-2xl" />
              ) : (
                <FiChevronDown className="text-2xl" />
              )}
            </div>
          </li>
          {isAccordionOpen && (
            <div onClick={handleDropdownClick}>
              <Link to="/bookmark" onClick={() => setIsAccordionOpen(true)}>
                <div className="flex items-center pl-8 pr-20 py-1 w-auto m-2 text-white hover:bg-purple-900 rounded">
                  <span className="text-xl">
                    <FiSettings />
                  </span>
                  <span className="ml-4 text-md group-hover:text-gray-300">
                    Bookmarks
                  </span>
                </div>
              </Link>

              <Link to="/favourites" onClick={handleDropdownClick}>
                <div className="flex items-center pl-8 pr-20 py-1 w-auto m-2 text-white hover:bg-purple-900 rounded">
                  <span className="text-xl">
                    <FiHeart />
                  </span>
                  <span className="ml-4 text-md group-hover:text-gray-300">
                    Favourites
                  </span>
                </div>
              </Link>
              <Link to="/current-read" onClick={handleDropdownClick}>
                <div className="flex items-center pl-8 pr-20 py-1 w-auto m-2 text-white hover:bg-purple-900 rounded">
                  <span className="text-xl">
                    <FiSettings />
                  </span>
                  <span className="ml-4 text-md group-hover:text-gray-300">
                    Currently Reading
                  </span>
                </div>
              </Link>
              <Link to="/recent" onClick={handleDropdownClick}>
                <div className="flex items-center pl-8 pr-20 py-1 w-auto m-2 text-white hover:bg-purple-900 rounded">
                  <span className="text-xl">
                    <FiHeart />
                  </span>
                  <span className="ml-4 text-md group-hover:text-gray-300">
                    Recently Viewed
                  </span>
                </div>
              </Link>
            </div>
          )}
          <li className="mt-4 group" id="pdf">
            <Link to="/pdf">
              <div className="flex items-center pl-4 pr-20 py-2 w-auto m-2 text-white hover:bg-purple-900 rounded">
                <span className="text-2xl">
                  <FaRegFilePdf />
                </span>
                <div className="ml-4 text-lg group-hover:text-gray-300 flex">
                  PDF Viewer
                </div>
              </div>
            </Link>
          </li>
          <li className="mt-4 group">
            <Link to="/Note">
              <div className="flex items-center pl-4 pr-20 py-2 w-auto m-2 text-white hover:bg-purple-900 rounded">
                <span className="text-2xl">
                  <FaRegStickyNote />
                </span>
                <span className="ml-4 text-lg group-hover:text-gray-300">
                  NoteTaking
                </span>
              </div>
            </Link>
          </li>
          <li className="mt-4 group">
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
          <li className=" mt-4 group cursor-pointer">
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
