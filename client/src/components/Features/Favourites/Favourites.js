import React, { useEffect, useState } from "react";
import useIndivBook from "../../hooks/useIndivBook";
import { MdDeleteOutline } from "react-icons/md";
import { FaBookReader } from "react-icons/fa";
import { AiOutlineRead } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import Sidebar2 from "../../MainBody/SideBar/Sidebar2";
import Notification from "../../utils/Notification/Notification";
import Chatbot from "../../chatbot/Chatbot";
import UserLogo from "../../User/UserLogo";
import { IoMdBookmarks } from "react-icons/io";

function BookImage({ bookId, uid, setFavorites, fetchFavorites }) {
  const bookInfo = useIndivBook(bookId);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  // useEffect(() => {
  //   if (showToast) {
  //     toast("Removed from favourites", {
  //       autoClose: 5000
  //     });
  //     setShowToast(false); // Reset the state
  //   }
  // }, [showToast]);

  const handleBookDelete = async () => {
    try {
      //setShowToast(true);

      const response = await fetch(
        `http://localhost:5000/api/favorites/${uid}/${bookId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete favorite");
      }

      setNotificationMessage("Book deleted successfully!");
      setShowNotification(true);

      // You might want to hide the notification automatically after a few seconds
      setTimeout(() => {
        setShowNotification(false);

        // Delay the fetchFavorites call until after the notification has been dismissed
        fetchFavorites();
      }, 800);
      //fetchFavorites();
    } catch (error) {
      console.error("Error deleting favorite:", error.message);
    }
  };

  if (!bookInfo) {
    return null; // or loading state if needed
  }

  return (
    <div className="w-44 bg-red-200 m-4  flex-col rounded-xl">
      {showNotification && (
        <Notification
          message={notificationMessage}
          onClose={() => setShowNotification(false)}
        />
      )}
      <div className="h-60 ">
        <img
          // className="h-full w-full p-3 rounded-xl object-cover "
          className="w-40 h-56 m-2 rounded-lg"
          src={
            bookInfo?.volumeInfo?.imageLinks?.smallThumbnail ||
            bookInfo?.volumeInfo?.imageLinks?.thumbnail
          }
          alt={bookInfo.title}
        />
      </div>
      <div className="flex justify-between mb-2 -mt-1">
        <Link to={`/book/${bookId}`}>
          <button className="ml-4 w-14 h-7 bg-slate-400 text-xl  rounded-lg pl-5">
            <AiOutlineRead />
          </button>
        </Link>
        <button
          className="w-14 h-7 bg-slate-400 text-xl rounded-lg pl-5 mr-4"
          onClick={() => {
            toast("Test toast"); // This will display the toast notification
            handleBookDelete(); // This will execute your delete function
          }}
        >
          <MdDeleteOutline />
        </button>
      </div>
    </div>
  );
}

const Favourites = ({ uid }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/favorites/${uid}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch favorites");
      }
      const data = await response.json();
      setFavorites(data.favorites);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching favorites:", error.message);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, [uid]);

  return (
    <div className="flex bg-amber-100 min-h-screen">
      <UserLogo/>
      <div className="w-[13%]">
        <Sidebar2 />
      </div>
      {/* Include Sidebar2 component */}
      <div className="ml-10 w-[86%] h-[100%]  bg-amber-100 relative mr-10">
        <h2 className="text-4xl font-semibold border-b-4 border-stone-600 pb-1 mb-1 mt-7">
          Favorites
        </h2>
        <div className="flex flex-wrap mt-6 container">
          {loading ? (
            <div>Loading...</div>
          ) : favorites.length > 0 ? (
            favorites.map((bookId, index) => (
              <BookImage
                key={index}
                bookId={bookId}
                uid={uid}
                setFavorites={setFavorites}
                fetchFavorites={fetchFavorites}
              />
            ))
          ) : (
            <div className=" w-full">
              <div className="flex justify-center items-center h-96 mt-10 ">
                <div className="text-3xl flex font-semibold items-center">
                  Start adding some <IoMdBookmarks className=" m-2 text-4xl" />{" "}
                  to your favorites to view here
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Chatbot />
    </div>
  );
};

export default Favourites;
