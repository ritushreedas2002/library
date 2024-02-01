import React, { useEffect, useState } from "react";

const useIndivBook = (bookid) => {
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBookDetail();
  }, []);

  const fetchBookDetail = async () => {
    if (isLoading) {
      try {
        const response = await fetch(
          "https://www.googleapis.com/books/v1/volumes/" + bookid
        );
        const data = await response.json();
        console.log(data);
        setBook(data);
      } catch (error) {
        setError(error);
        console.error("Error fetching books:", error);
        setIsLoading(false);
      }
    }
  };

  return book;
};

export default useIndivBook;
