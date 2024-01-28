import { useEffect, useState } from "react";

const useBooks = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBooks = async (startIndex = 0) => {
    if (isLoading) {
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=react&startIndex=${startIndex}&maxResults=7&key=AIzaSyAHmU-nwtsjbFU7LJgVZ0wY6typtBwzeKw`
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

  return { books, error };
};

export default useBooks;
