import React, { useEffect, useState } from "react";
import useIndivBook from "../../hooks/useIndivBook";
import { MdDeleteOutline } from "react-icons/md";
import { FaBookReader } from "react-icons/fa";
import { Link } from "react-router-dom";
import Sidebar2 from "../../MainBody/SideBar/Sidebar2";
function BookImage({ bookId, uid, setFavorites, fetchFavorites }) {
  const bookInfo = useIndivBook(bookId);

  const handleBookDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/favorites/${uid}/${bookId}`,
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
      fetchFavorites();
    } catch (error) {
      console.error("Error deleting favorite:", error.message);
    }
  };

  if (!bookInfo) {
    return null; // or loading state if needed
  }

  return (
    <div className="h-64 w-48 bg-red-200 m-6 flex-col items-center">
      <div className="h-52 w-64">
        <img
          className="h-full w-full object-contain pr-16 pt-3"
          src={
            bookInfo?.volumeInfo?.imageLinks?.small ||
            bookInfo?.volumeInfo?.imageLinks?.thumbnail
          }
          alt={bookInfo.title}
        />
      </div>
      <div className="flex justify-between">
      <Link to={`/book/${bookId}`}>
        <button className="ml-4 w-14 h-7 bg-slate-400 mt-3 rounded-xl pl-5">
          <FaBookReader />
        </button>
        </Link>
        <button
          className="w-14 h-7 bg-slate-400 mt-3 rounded-xl pl-5 mr-3"
          onClick={handleBookDelete}
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
    <div className="flex bg-purple-400 w-screen">
        <div>
        <Sidebar2 /> 
        </div>
      {/* Include Sidebar2 component */}
      <div className="ml-56">
        <h2 className="mt-7 text-3xl">Favorites</h2>
        <div className="flex flex-wrap mt-6">
          {loading ? (
            <div>Loading...</div>
          ) : (
            favorites.map((bookId, index) => (
              <BookImage
                key={index}
                bookId={bookId}
                uid={uid}
                setFavorites={setFavorites}
                fetchFavorites={fetchFavorites}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Favourites;
