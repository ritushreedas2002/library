import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar2 from "../../MainBody/SideBar/Sidebar2";
import useIndivBook from "../../hooks/useIndivBook";
import { MdDeleteOutline } from "react-icons/md";
import { FaBookReader } from "react-icons/fa";
import { AiOutlineRead } from "react-icons/ai";
import Notification from "../../utils/Notification/Notification";
import Chatbot from "../../chatbot/Chatbot";
import UserLogo from "../../User/UserLogo";
import { IoMdBookmarks } from "react-icons/io";

function BookImage({ bookId, uid, setBookmarks, fetchBookmarks }) {
  const bookInfo = useIndivBook(bookId);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const handleBookDelete = async () => {
    try {
      const response = await fetch(
        `https://library-henna-two.vercel.app/api/bookmarks/${uid}/${bookId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete favorite");
      }
      // Handle deletion in parent component by updating favorites state
      //setFavorites(prevFavorites => prevFavorites.filter(id => id !== bookId));
      // Trigger refetch of favorites
      setNotificationMessage("Book deleted successfully!");
      setShowNotification(true);

      // You might want to hide the notification automatically after a few seconds
      setTimeout(() => {
        setShowNotification(false);

        // Delay the fetchFavorites call until after the notification has been dismissed
        fetchBookmarks();
      }, 800);
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
          onClick={handleBookDelete}
        >
          <MdDeleteOutline />
        </button>
      </div>
    </div>
  );
}
function Bookmark({ uid }) {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookmarks = async () => {
    try {
      const response = await fetch(
        `https://library-henna-two.vercel.app/api/bookmarks/${uid}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch bookmarks");
      }
      const data = await response.json();
      setBookmarks(data.bookmarks); // Ensure this matches the backend response
      setLoading(false);
    } catch (error) {
      console.error("Error fetching bookmarks:", error.message);
      setLoading(false); // Ensure loading is set to false even on error
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, [uid]); // Dependency array ensures fetchBookmarks runs when uid changes

  return (
    <div className="flex bg-amber-100 min-h-screen">
       
      <div className="w-[13%]">
        <Sidebar2 />
      </div>
      <div className="ml-10 w-[86%] h-full bg-amber-100 mr-10">
        <h2 className="text-4xl font-semibold border-b-4 border-stone-600 pb-1 mb-1 mt-7">Bookmarks</h2>
        <div className="flex flex-wrap mt-6">
          {loading ? (
            <div>Loading...</div>
          ) : bookmarks.length > 0 ? (
            bookmarks.map((bookId, index) => (
              <BookImage
                key={index}
                bookId={bookId}
                uid={uid}
                setBookmarks={setBookmarks} // Adjusted for consistency
                fetchBookmarks={fetchBookmarks} // Adjusted for consistency
              />
            ))
          ) : (
            <div className=" w-full">
              <div className="flex justify-center items-center h-96 mt-10 ">
                <div className="text-3xl flex font-semibold items-center">
                  Start bookmarking some{" "}
                  <IoMdBookmarks className=" m-2 text-4xl" /> to view here
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Chatbot />
    </div>
  );
}

export default Bookmark;
