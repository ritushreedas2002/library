import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const searchtext = useRef(null);
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const [searchResults, setSearchResults] = useState([]);

  // const SearchBooks = async (query) => {
  //   const data = await fetch(
  //     "https://www.googleapis.com/books/v1/volumes?q=" +
  //       query +
  //       "&startIndex=0&maxResults=30&key=AIzaSyAHmU-nwtsjbFU7LJgVZ0wY6typtBwzeKw"
  //   );
  //   const json = await data.json();
  //   return json.items;
  // };

  const handleSearchClick = async () => {
    console.log(searchtext.current.value);
    navigate("/search/" + searchtext.current.value);
    //const searchedBooks = await SearchBooks(searchtext.current.value);
    //console.log(searchedBooks);
    //setSearchResults(searchedBooks);
  };

  return (
    <div className="mt-2">
      <div className=" flex justify-center">
      <form
        className="ml-14 pt-4 w-3/5 grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchtext}
          type="text"
          className="p-3 m-4 grid col-span-10 rounded-lg"
          placeholder="Search more books..."
        />
        <button
          className="col-span-2 m-4 py-2 px-2 bg-red-700 text-white text-md font-semibold rounded-lg text-center"
          onClick={handleSearchClick}
        >
          🔍 Search
        </button>
      </form>
      </div>
      
      
    </div>
  );
};

export default SearchBar;

<div>
        {/* {searchResults && searchResults.map((book, index) => ( */}
          {/* <div key={index}> */}
            {/* <h2>{book.volumeInfo.title}</h2> */}
            {/* <p>{book.volumeInfo.description}</p> */}
          </div>
        {/* ))} */}
      // </div>
