import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ShimmerSearch from "../utils/Shimmer/ShimmerSearch";

const SearchResults = () => {
  const { query } = useParams();
  const [searchResults, setSearchResults]= useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const SearchBooks = async (query) => {
      const data = await fetch(
        "https://www.googleapis.com/books/v1/volumes?q=" +
          query +
          "&startIndex=0&maxResults=27&key=AIzaSyBd5eK6KC9hXwSK5Gqu86oJdxFcm-FLBVQ"
      );
      const json = await data.json();
      return json.items;
    };

    SearchBooks(query).then(setSearchResults);
  }, [query]);
    console.log(searchResults);

    if(searchResults.length===0)return <ShimmerSearch/>

  return (
    <div>
      <button onClick={() => navigate(-1)}>Go Back</button>
      <div className=" bg-slate-600 flex flex-wrap justify-start pl-32">
        {searchResults.map((book, index) => (
          <Link to={`/book/${book.id}`}>
          <div key={index}>
            {/* <h2>{book.volumeInfo.title}</h2> */}
            <img
              src={book.volumeInfo?.imageLinks?.thumbnail}
              alt={book.volumeInfo?.title}
              className="w-48 h-48 m-2"
            />
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
