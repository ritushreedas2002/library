import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ShimmerSearch from "../../utils/Shimmer/ShimmerSearch";
import Sidebar2 from "../SideBar/Sidebar2";
import SearchBar from "./SearchBar";
import { GOOGLE_BOOK_API_KEY } from "../../utils/constant";

const SearchResults = () => {
  const { query } = useParams();
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const pageList = [1, 2, 3, 4, 5, 6];
  const resultsPerPage = 25;
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("relevance");

  useEffect(() => {
    const SearchBooks = async (query, currentPage, sortOrder) => {
      const startIndex = (currentPage - 1) * resultsPerPage;
      let sortParam;
      if (sortOrder === "newest") {
        sortParam = "&orderBy=newest"; // No sort for newest (default)
      } else {
        sortParam = ""; // Default to relevance
      }
      const data = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=${startIndex}&maxResults=${resultsPerPage}${sortParam}&key=${GOOGLE_BOOK_API_KEY}`
      );
      const json = await data.json();
      return json.items;
    };

    SearchBooks(query, currentPage, sortOrder).then(setSearchResults);
  }, [query, currentPage, sortOrder]);
  console.log(searchResults);

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  // if (searchResults.length === 0) return <ShimmerSearch />;
  const handlePageClick = (page) => {
    setCurrentPage(page); // Update current page
  };

  return (
    <div className="bg-slate-600 flex">
      <div className=" w-[13%]">
        <Sidebar2 />
      </div>
      <div className="flex flex-col  w-[87%]">
        {" "}
        {/* Adjust the layout as needed */}
        <div className="">
          <SearchBar /> {/* Include the SearchBar */}
          <select
            value={sortOrder}
            onChange={handleSortChange}
            className=" ml-80 p-1 rounded-lg font-semibold bg-blue-600 text-white"
          >
            <option value="relevance">Relevance</option>
            <option value="newest">Newest</option>
          </select>
        </div>
        {searchResults.length !== 0 ? (
          <div>
            <div className="bg-slate-600 flex flex-wrap justify-start mt-4 ml-32">
              {searchResults.map((book, index) => (
                <Link to={`/book/${book.id}`} key={index}>
                  <div>
                    <img
                      src={book.volumeInfo?.imageLinks?.thumbnail}
                      alt={book.volumeInfo?.title}
                      className="w-48 h-48 m-2 rounded-lg"
                    />
                  </div>
                </Link>
              ))}
            </div>
            <div className=" flex flex-wrap justify-center mt-4 mb-20">
              {pageList.map((page, index) => (
                <button
                  key={index}
                  className={`bg-slate-800 text-xl text-white m-4 px-3 py-1 rounded-lg transition-transform duration-100 ${
                    currentPage === page
                      ? "bg-blue-500 scale-125 shadow-slate-950"
                      : ""
                  }`}
                  onClick={() => handlePageClick(page)}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <ShimmerSearch />
        )}
      </div>
    </div>
  );
};

export default SearchResults;
