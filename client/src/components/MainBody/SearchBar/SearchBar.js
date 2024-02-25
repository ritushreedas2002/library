import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const searchtext = useRef(null);
  const navigate = useNavigate();
  const uid = localStorage.getItem("uid");
  const handleSearchClick = async () => {
    console.log(searchtext.current.value);
    const searchTerm = searchtext.current.value;
    try {
      const response = await fetch(
        `http://localhost:5000/api/search-history/${uid}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ search: searchTerm }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update search history");
      }

      navigate("/search/" + searchTerm);
      //const searchedBooks = await SearchBooks(searchtext.current.value);
      //console.log(searchedBooks);
      //setSearchResults(searchedBooks);
    } catch (error) {
      console.error("Error updating search history:", error.message);
      // Handle error if needed
    }
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
</div>;
{
  /* ))} */
}
// </div>
