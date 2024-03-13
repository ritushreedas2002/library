
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import UserLogo from "../../User/UserLogo"
const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const uid = localStorage.getItem("uid");



  useEffect(() => {
    // ... fetching user data

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setSearchHistory([]);
        setSuggestions([]);
      }
    };

    // Add click event listener to the document
    document.addEventListener('click', handleClickOutside);

    return () => {
      // Remove click event listener from the document
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  // Debounce the fetchSuggestions function
  // Function to fetch suggestions debounced
  const fetchSuggestions = useRef(
    debounce(async (query) => {
      if (!query.trim()) {
        setSuggestions([]);
        return;
      }
      try {
        const response = await fetch(
          `http://localhost:5000/api/search-suggestions/${uid}/${query}`
        );
        if (!response.ok) throw new Error("Failed to fetch suggestions");
        const data = await response.json();
        setSuggestions(data);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
      }
    }, 300)
  ).current;

  // Function to fetch the latest search history when the input is focused
  const fetchLatestSearches = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/search-history/${uid}`
      );
      if (!response.ok) throw new Error("Failed to fetch search history");
      const data = await response.json();
      setSearchHistory(data.search || []); // Ensure search history is always an array
    } catch (error) {
      console.error("Error fetching search history:", error);
      setSearchHistory([]);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      fetchSuggestions(searchTerm);
    }
  }, [searchTerm]);

  const handleSearchClick = async () => {
    // Update search history with the new search term
    if (!searchTerm) return;
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

      const response1 = await fetch(`http://localhost:5000/api/search/${uid}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ searchTerm: searchTerm }),
      });

      if (!response.ok) {
        throw new Error("Failed to update search history");
      }

      if (!response1.ok) {
        throw new Error("Failed to update search history");
      }
      // Navigate to a route that displays search results. This route should handle fetching and displaying the results based on the searchTerm.
      // Assuming you have a route like '/search/:query' for search results
      navigate("/search/" + searchTerm);
      setSearchHistory([]);
      setSuggestions([])
    } catch (error) {
      console.error("Error updating search history:", error.message);
    }
  };

  return (
    <div className=" pb-2 bg-gradient-to-b from-black h-28">
      <div className=" mr-3" ref={dropdownRef}>
        <div className="flex justify-center">
          <form
            className="ml-14 pt-4 w-3/5 grid grid-cols-12"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="text"
              className="p-3 m-4 grid col-span-10 rounded-lg"
              placeholder="Search more books..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={fetchLatestSearches}
            />
            <button
              className="col-span-2 m-4 py-2 px-2 bg-red-600 hover:bg-red-700 text-white text-md font-semibold rounded-lg text-center"
              onClick={handleSearchClick}
            >
              🔍 Search
            </button>
          </form>
        </div>
        {searchTerm.length === 0 && searchHistory.length > 0 ? (
          // Show search history if searchTerm is empty
          <div className="absolute top-[84px] z-10 w-[40%] ml-[313px] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            {searchHistory.map((historyItem, index) => (
              <div
                key={index}
                className="px-4 py-2 text-sm border-b-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  navigate("/search/" + historyItem);
                  setSearchHistory([]); // Clear the search history state
        
                  setSuggestions([])
                }}
              >
                {historyItem}
              </div>
            ))}
          </div>
        ) : suggestions.length > 0 ? (
          // Show suggestions if there are any and searchTerm is not empty
          <div className="absolute top-[84px] z-10 w-[40%] ml-[313px] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="px-4 py-2 text-sm border-b-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                onClick={() =>{ 
                  navigate("/search/" + suggestion)
                  setSuggestions([])
                  setSearchTerm("")
                  setSearchHistory([])
                }}
              >
                {suggestion}
              </div>
            ))}
          </div>
        ) : null}
      </div>
      <UserLogo/>
    </div>
  );
};

export default SearchBar;
