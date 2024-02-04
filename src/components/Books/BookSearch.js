// BookSearch.js

import React from "react";
import useBooks from "../hooks/useBooks";

import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { modifyCategory } from "../utils/bookSlice";

const DemoBookCard = () => {
  return (
    <div className="w-48 h-48 bg-gray-500 flex justify-center items-center md:w-48  ">
      <h1 className="text-white">pic unavailable</h1>
    </div>
  );
};

export const BookCard = ({ book }) => {
  return (
    <div className="w-36 mr-7 md:w-48 pr-4">
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
  const List = ["programming", "romance", "science fiction", "self help"];
  const programming = useBooks(List[0]);
  const romance = useBooks(List[1]);
  const science = useBooks(List[2]);
  const self = useBooks(List[3]);

  // if (error) {
  //   return <p>Error fetching books: {error.message}</p>;
  // }

  if (programming.length === 0) {
    return <h1>Still empty</h1>;
  }

  console.log("Books fetched:", programming);

  return (
    <div className="pl-12 w-full flex flex-col ">
      <h1 className="pb-4 text-3xl font-medium text-white">
        Programming Books
      </h1>
      <div className="flex overflow-x-scroll no-scrollbar">
        <div className="flex">
          {programming?.map((book, index) => (
            <Link key={index} to={"/book/" + book.id}>
              <BookCard key={index} book={book} />
            </Link>
          ))}
        </div>
      </div>
      <h1 className="pb-4 pt-8 text-3xl font-medium text-white">Romance</h1>
      <div className="flex overflow-x-scroll no-scrollbar">
        <div className="flex">
          {romance?.map((book, index) => (
            <Link key={index} to={"/book/" + book.id}>
              <BookCard key={index} book={book} />
            </Link>
          ))}
        </div>
      </div>
      <h1 className="pb-4 pt-8 text-3xl font-medium text-white">
        Science Fiction
      </h1>
      <div className="flex overflow-x-scroll no-scrollbar">
        <div className="flex">
          {science?.map((book, index) => (
            <Link key={index} to={"/book/" + book.id}>
              <BookCard key={index} book={book} />
            </Link>
          ))}
        </div>
      </div>
      <h1 className="pb-4 pt-8 text-3xl font-medium text-white">Self Help</h1>
      <div className="flex overflow-x-scroll no-scrollbar">
        <div className="flex">
          {self?.map((book, index) => (
            <Link key={index} to={"/book/" + book.id}>
              <BookCard key={index} book={book} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

// const BookSearch = () => {
//   const List = ["programming", "romance", "science fiction", "self help"];
//   const [booksByCategory, setBooksByCategory] = useState({});

//   useEffect(() => {
//     List.forEach(async (category) => {
//       const { books, error } = useBooks(category);
//       if (!error) {
//         setBooksByCategory((prevBooks) => ({
//           ...prevBooks,
//           [category]: books,
//         }));
//       }
//     });
//   }, []);

//   if (Object.keys(booksByCategory).length === 0) {
//     return <h1>Still empty</h1>;
//   }

//   return (
//     <div className="pl-12 w-full mt-12">
//       {List.map((category) => (
//         <div key={category}>
//           <h1 className="m-5 text-3xl">{`${category.charAt(0).toUpperCase() + category.slice(1)} Books`}</h1>
//           <div className="flex overflow-x-scroll">
//             <div className="flex">
//               {booksByCategory[category]?.map((book, index) => (
//                 <Link key={index} to={"/book/" + book.id}>
//                   <BookCard key={index} book={book} />
//                 </Link>
//               ))}
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// const useBooksByCategory = (categories) => {
//   const [booksByCategory, setBooksByCategory] = useState({});

//   useEffect(() => {
//     const fetchBooks = async () => {
//       const newBooksByCategory = {};
//       for (let category of categories) {
//         const { books, error } = await useBooks(category);
//         if (!error) {
//           newBooksByCategory[category] = books;
//         }
//       }
//       setBooksByCategory(newBooksByCategory);
//     };

//     fetchBooks();
//   }, [categories]);

//   return booksByCategory;
// };

// const BookSearch = () => {
//   const List = ["programming", "romance", "science fiction", "self help"];
//   const booksByCategory = useBooksByCategory(List);
//   console.log(booksByCategory);

//   // ...
// };

export default BookSearch;
