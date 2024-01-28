import React, { useState, useEffect } from "react";
import { GOOGLE_BOOK_API } from "./constants";
const apiKey = GOOGLE_BOOK_API;

const BookSearch = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // setIsLoading(true);

  const fetchBooks = async (startIndex = 0) => {
    console.log(process.env.GOOGLE_BOOK_API);
    if (isLoading) {
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=react&startIndex=${startIndex}&maxResults=30&key=AIzaSyAHmU-nwtsjbFU7LJgVZ0wY6typtBwzeKw`
        );
        const data = await response.json();
        console.log(data);
        setBooks((prevBooks) => [...prevBooks, ...data.items]);

        // Stop fetching if 30 books are reached
        if (books.length > 29) {
          console.log("30 books received");
          setIsLoading(false);
          return;
        }

      } catch (error) {
        setError(error);
        console.error("Error fetching books:", error);
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);


  console.log("Books fetched:", books);
  
};

export default BookSearch;


