// import {
//   RxCrop,
//   RxDesktop,
//   RxPencil2,
//   RxReader,
//   RxRocket,
//   RxAccessibility,
// } from "react-icons/rx";
import { useEffect, useState } from "react";

const usePopular = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBooks = async () => {
    if (isLoading) {
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=bestsellers&startIndex=0&maxResults=10&key=AIzaSyBd5eK6KC9hXwSK5Gqu86oJdxFcm-FLBVQ`
        );
        const data = await response.json();
        console.log(data);
        setBooks((prevBooks) => [...prevBooks, ...data.items]);

        // Stop fetching if 30 books are reached
        if (books.length > 6) {
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

  return books;
};

export default usePopular;