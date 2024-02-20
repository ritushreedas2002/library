import React, { useState, useEffect } from 'react';
import useIndivBook from '../../hooks/useIndivBook';
import { Link } from 'react-router-dom';

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
    );
  }

  useEffect(() => {
    const fetchRecentlyViewedBooks = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/recently-viewed/${uid}`);
        if (!response.ok) {
          throw new Error('Failed to fetch recently viewed books');
        }
        const data = await response.json();
        setRecentlyViewedBooks(data.recentlyViewed);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching recently viewed books:', error);
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
    <div>
      <h2>Recently Viewed Books</h2>
      <div className='flex flex-wrap'>
        {recentlyViewedBooks.map(bookId => (
          <BookImage bookId={bookId} />
        ))}
      </div>
    </div>
  );
};

export default RecentlyViewed;
