import React, { useState, useEffect } from "react";
import useIndivBook from "../../hooks/useIndivBook";
import { Link } from "react-router-dom";
import Sidebar2 from "../../MainBody/SideBar/Sidebar2";

const CurrentRead = ({ uid }) => {
  const [currentBookId, setCurrentBookId] = useState(null);

  function BookImage({ bookId }) {
    const bookInfo = useIndivBook(bookId);

    if (!bookInfo) {
      return null; // or loading state if needed
    }

    return (
      <div>
        <div className="h-64 w-48 bg-red-200 m-6 flex-col items-center">
          <div className="h-52 w-64">
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
          </div>
        </div>
      </div>
    );
  }

  // Function to fetch the current book ID from the backend
  const fetchCurrentRead = async () => {
    try {
      // Make a GET request to your backend API
      const response = await fetch(
        `http://localhost:5000/api/current-read/${uid}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Add any other headers if needed
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch current read book");
      }

      // Parse the JSON response
      const data = await response.json();

      // Update the currentBookId state with the fetched book ID
      setCurrentBookId(data.currentRead);
    } catch (error) {
      console.error("Error fetching current read book:", error.message);
      // Handle error if needed
    }
  };

  // useEffect hook to fetch current book ID when the component mounts
  useEffect(() => {
    fetchCurrentRead();
  }, []); // Dependency array is empty to run this effect only once when the component mounts

  return (
    <div className="flex bg-purple-400 w-screen h-screen">
      <div>
        <Sidebar2 />
      </div>
      <div className="ml-56">
        <h2 className="mt-7 text-3xl">Currently Reading</h2>
        {currentBookId ? <p></p> : <p>No book currently being read</p>}

        <BookImage bookId={currentBookId} />
      </div>
    </div>
  );
};

export default CurrentRead;
