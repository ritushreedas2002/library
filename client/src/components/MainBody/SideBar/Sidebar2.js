//import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

import { MdNoteAlt } from "react-icons/md";
import { ImHome } from "react-icons/im";
import {
  FaBookmark,
  FaHeart,
  FaBookReader,
  FaHistory,
  FaUserCog,
} from "react-icons/fa";
import { FaRegFilePdf } from "react-icons/fa6";
import { BiLogOut } from "react-icons/bi";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../utils/Firebase";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../../utils/userSlice";
import { IoMdBookmarks } from "react-icons/io";
import { useState } from "react";
import { BsRobot } from "react-icons/bs";

const Sidebar2 = ({ onSignOut }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const isActive = (pathOrPaths) => {
    const paths = Array.isArray(pathOrPaths) ? pathOrPaths : [pathOrPaths];
    return paths.some((path) => currentPath.startsWith(path));
  };

  //const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((store) => store.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  const handleDropdownClick = (event) => {
    // event.preventDefault();
    event.stopPropagation();
  };

  // const handleLogout = () => {
  //   signOut(auth)
  //     .then(() => {
  //       // Sign-out successful.
  //       localStorage.removeItem("userAuthenticated");
  //       localStorage.removeItem("uid");
  //       dispatch(removeUser());
  //       navigate("/");
  //     })
  //     .catch((error) => {
  //       // An error happened.
  //     });
  // };
  return (
    <div
  className="fixed inset-y-0 left-0 w-[13%] h-full overflow-hidden bg-black "
  style={{ backdropFilter: 'blur(10px)' }}
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
        <ul className="mt-10">
          <li className="mt-5 group">
            <Link
              to="/MainBody"
              className={`flex items-center pl-4 pr-20 py-2 w-auto m-2 text-white hover:bg-purple-900 rounded ${
                isActive("/MainBody") ? "bg-purple-700" : ""
              }`}
            >
              <span className="text-2xl">
                <ImHome />
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
            <div
              className={`flex items-center pl-4 pr-2 py-1 w-auto m-2 text-white hover:bg-purple-900 rounded ${
                isActive([
                  "/favourites",
                  "/current-read",
                  "/bookmark",
                  "/recent",
                ])
                  ? "bg-purple-700"
                  : ""
              }`}
            >
              <span className="text-2xl">
                <IoMdBookmarks />
              </span>
              <div className=" ml-4 text-lg pr-2 group-hover:text-gray-300">
                My Books
              </div>
              {isAccordionOpen ? (
                <FiChevronUp className="text-lg" />
              ) : (
                <FiChevronDown className="text-lg" />
              )}
            </div>
          </li>
          {isAccordionOpen && (
            <div onClick={handleDropdownClick}>
              <Link to="/bookmark" onClick={() => setIsAccordionOpen(true)}>
                <div className="flex items-center pl-8 pr-20 py-1 w-auto m-2 text-white hover:bg-purple-900 rounded">
                  <span className="text-xl">
                    <FaBookmark />
                  </span>
                  <span className="ml-4 text-md group-hover:text-gray-300">
                    Bookmarks
                  </span>
                </div>
              </Link>

              <Link to="/favourites" onClick={handleDropdownClick}>
                <div className="flex items-center pl-8 pr-20 py-1 w-auto m-2 text-white hover:bg-purple-900 rounded">
                  <span className="text-xl">
                    <FaHeart />
                  </span>
                  <span className="ml-4 text-md group-hover:text-gray-300">
                    Favourites
                  </span>
                </div>
              </Link>
              <Link to="/current-read" onClick={handleDropdownClick}>
                <div className="flex items-center pl-8 pr-20 py-1 w-auto m-2 text-white hover:bg-purple-900 rounded">
                  <span className="text-xl">
                    <FaBookReader />
                  </span>
                  <span className="ml-4 text-md group-hover:text-gray-300">
                    Currently Reading
                  </span>
                </div>
              </Link>
              <Link to="/recent" onClick={handleDropdownClick}>
                <div className="flex items-center pl-8 pr-20 py-1 w-auto m-2 text-white hover:bg-purple-900 rounded">
                  <span className="text-xl">
                    <FaHistory />
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
              <div
                className={`flex items-center pl-4 pr-20 py-2 w-auto m-2 text-white hover:bg-purple-900 rounded ${
                  isActive("/pdf") ? "bg-purple-700" : ""
                }`}
              >
                <span className="text-2xl">
                  <FaRegFilePdf />
                </span>
                <div className="ml-4 text-lg group-hover:text-gray-300 flex">
                  PDF Viewer
                </div>
              </div>
            </Link>
          </li>
          <li className="mt-4 group" id="notes">
            <Link to="/Note">
            <div
                className={`flex items-center pl-4 pr-20 py-2 w-auto m-2 text-white hover:bg-purple-900 rounded ${
                  isActive("/Note") ? "bg-purple-700" : ""
                }`}
              >
                <span className="text-2xl">
                  <MdNoteAlt />
                </span>
                <span className="ml-4 text-lg group-hover:text-gray-300">
                  Notes
                </span>
              </div>
            </Link>
          </li>
          <li className="mt-4 group" id="account">
            <Link
              to="/User"
              className={`flex items-center pl-4 pr-20 py-2 w-auto m-2 text-white hover:bg-purple-900 rounded ${
                isActive("/User") ? "bg-purple-700" : ""
              }`}
            >
              <span className="text-2xl">
                <FaUserCog />
              </span>
              <span className="ml-4 text-lg group-hover:text-gray-300">
                Account
              </span>
            </Link>
          </li>
          <li className="mt-4 group" id="book">
            <Link
              to="/gpt"
              className={`flex items-center pl-4 pr-20 py-2 w-auto m-2 text-white hover:bg-purple-900 rounded ${
                isActive("/gpt") ? "bg-purple-700" : ""
              }`}
            >
              <span className="text-2xl">
                <BsRobot />
              </span>
              <span className="ml-4 text-lg group-hover:text-gray-300">
                BookGPT
              </span>
            </Link>
          </li>
          {/* <li className=" mt-4 group cursor-pointer">
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
          </li> */}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar2;
