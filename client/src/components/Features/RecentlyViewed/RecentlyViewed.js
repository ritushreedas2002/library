import React, { useState, useEffect } from "react";
import useIndivBook from "../../hooks/useIndivBook";
import { Link } from "react-router-dom";
import Sidebar2 from "../../MainBody/SideBar/Sidebar2";
import { AiOutlineRead } from "react-icons/ai";

const RecentlyViewed = ({ uid }) => {
  const [recentlyViewedBooks, setRecentlyViewedBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  function BookImage({ bookId }) {
    const bookInfo = useIndivBook(bookId);

    if (!bookInfo) {
      return null; // or loading state if needed
    }

    return (
      <div className="w-44 bg-red-200 m-4  flex-col rounded-xl ">
        {/* <div className="h-52 w-64">
          <Link to={`/book/${bookId}`}>
            <img
              className="h-full w-full object-contain pr-16 pt-3"
              src={
                bookInfo?.volumeInfo?.imageLinks?.smallThumbnail ||
                bookInfo?.volumeInfo?.imageLinks?.thumbnail
              }
              alt={bookInfo.title}
            />
          </Link>
        </div> */}
        <div className="h-60 ">
          <Link to={`/book/${bookId}`}>
            <img
              // className="h-full w-full p-3 rounded-xl object-cover "
              className="w-40 h-56 m-2 rounded-lg"
              src={
                bookInfo?.volumeInfo?.imageLinks?.smallThumbnail ||
                bookInfo?.volumeInfo?.imageLinks?.thumbnail
              }
              alt={bookInfo.title}
            />
          </Link>
        </div>
        <div className="flex justify-between mb-2 -mt-1">
          <Link to={`/book/${bookId}`}>
            <button className="ml-4 w-14 h-7 bg-slate-400 text-xl  rounded-lg pl-5">
              <AiOutlineRead />
            </button>
          </Link>
          {/* <button
            className="w-14 h-7 bg-slate-400 text-xl rounded-lg pl-5 mr-4"
            onClick={handleBookDelete}
          >
            <MdDeleteOutline />
          </button> */}
        </div>
      </div>
    );
  }

  useEffect(() => {
    const fetchRecentlyViewedBooks = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/recently-viewed/${uid}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch recently viewed books");
        }
        const data = await response.json();
        setRecentlyViewedBooks(data.recentlyViewed);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching recently viewed books:", error);
        setError(error);
        setIsLoading(false);
      }
    };

    fetchRecentlyViewedBooks();
  }, [uid]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex bg-purple-400">
      <div className=" w-[13%]">
        <Sidebar2 />
      </div>
      <div className="ml-10 w-[86%]">
        <h2 className="mt-7 text-3xl">Recently Viewed Books</h2>
        <div className="flex flex-wrap mt-6">
          {recentlyViewedBooks.map((bookId) => (
            <BookImage bookId={bookId} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentlyViewed;
