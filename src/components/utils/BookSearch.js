// BookSearch.js

import React from "react";
import useBooks from "./useBooks";
import "./styles.css"

const DemoBookCard = () => {
  return (
    <div className="w-48 h-48 bg-gray-500 flex justify-center items-center md:w-48  ">
      <h1 className="text-white">pic unavailable</h1>
    </div>
  );
};

export const BookCard = ({ book }) => {
  return (
    <div className='w-36 mr-7 md:w-48 pr-4'>
      {book?.volumeInfo?.imageLinks?.thumbnail ? (
        <img
          src={book.volumeInfo?.imageLinks?.thumbnail}
          alt={book.volumeInfo?.title}
          className="w-48 h-48"
        />
      ) : (
        <DemoBookCard />
      )}
    </div>
  );
};

const BookSearch = () => {
  const { books, error } = useBooks();

  if (error) {
    return <p>Error fetching books: {error.message}</p>;
  }

  if (books.length === 0) {
    return <h1>Still empty</h1>;
  }

  console.log("Books fetched:", books);

  return (
    <div className="px-12 w-full mt-12">
      <h1 className="m-5 text-3xl">Programming Books</h1>
      <div className="flex overflow-x-scroll">
        <div className="flex">
      {books?.map((book, index) => (
        <BookCard key={index} book={book} />
      ))}
    </div>
    </div>
    </div>
  );
};
 
export default BookSearch;
