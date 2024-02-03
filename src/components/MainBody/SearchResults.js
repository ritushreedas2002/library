import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const SearchResults = () => {
  const { query } = useParams();
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const SearchBooks = async (query) => {
      const data = await fetch(
        "https://www.googleapis.com/books/v1/volumes?q=" +
          query +
          "&startIndex=0&maxResults=27&key=AIzaSyAHmU-nwtsjbFU7LJgVZ0wY6typtBwzeKw"
      );
      const json = await data.json();
      return json.items;
    };

    SearchBooks(query).then(setSearchResults);
  }, [query]);

  return (
    <div>
      <button onClick={() => navigate(-1)}>Go Back</button>
      <div className=" bg-slate-600 flex flex-wrap justify-start pl-32">
        {searchResults.map((book, index) => (
          <div key={index}>
            {/* <h2>{book.volumeInfo.title}</h2> */}
            <img
              src={book.volumeInfo?.imageLinks?.thumbnail}
              alt={book.volumeInfo?.title}
              className="w-48 h-48 m-2"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
