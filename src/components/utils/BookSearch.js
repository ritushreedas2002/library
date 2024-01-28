import React, { useState, useEffect } from "react";
// require("dotenv").config();
// import {GOOGLE_BOOK_API} from
import { GOOGLE_BOOK_API } from "./constants";
const apiKey = GOOGLE_BOOK_API;

// const BookSearch = () => {
//   const [books, setBooks] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=cricketworldcup&key=AIzaSyCxlIrurnEuA_M67vv5Q_A_ZS4sqQoGbQg`); // Replace YOUR_API_KEY with your actual API key
//         const data = await response.json();
//         setBooks(data.items);
//       } catch (error) {
//         setError(error);
//         console.error('Error fetching books:', error);
//       }
//     };

//     fetchBooks();
//   }, []);

//   useEffect(() => {
//     if (books.length > 0) {
//       console.log('Books fetched:', books);
//     }
//   }, [books]);

//   return (
//     <h1>None</h1>
//   );
// };
const BookSearch = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add a loading state
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

        // Fetch more only if there are more books to retrieve
        // if (data.items.length > 0) {
        //   fetchBooks(startIndex + 30);
        // } else {
        //   setIsLoading(false);
        // }
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

  // useEffect(() => {
  //   if (books.length > 0) {
  console.log("Books fetched:", books);
  //   }
  //}, []);
};

export default BookSearch;

// useEffect(() => {
//   const fetchBooks = async (startIndex = 0) => {
//     setIsLoading(true); // Indicate loading
//     try {
//       const response = await fetch(
//         `https://www.googleapis.com/books/v1/volumes?q=react&startIndex=${startIndex}&maxResults=10&key=AIzaSyCxlIrurnEuA_M67vv5Q_A_ZS4sqQoGbQg`
//       );
//       const data = await response.json();
//       console.log(data);
//       setBooks((prevBooks) => [...prevBooks, ...data.items]); // Combine results

//       // Fetch more if needed
//       if (data.items.length <= 40 && books.length <= 40) {
//         fetchBooks(startIndex + 10); // Recursively fetch next page
//       } else {
//         setIsLoading(false); // Done loading
//       }
//     } catch (error) {
//       setError(error);
//       console.error("Error fetching books:", error);
//       setIsLoading(false); // Clear loading state even on error
//     }
//   };

//   fetchBooks();
// }, []);
