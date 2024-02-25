import React, { useEffect, useRef, useState } from "react";
import { openai } from "../utils/openai";
import { ThreeDots} from 'react-loader-spinner'
const Gpt = () => {
  const [searchHistory, setSearchHistory] = useState([]);
  const [searchresult, setsearchresult] = useState([]);
  const searchtext = useRef(null);
  const [results, setresult] = useState(null);
  const uid = localStorage.getItem("uid");

  useEffect(() => {
    const fetchSearchHistory = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/search-history/${uid}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch search history");
        }
        const data = await response.json();
        setSearchHistory(data.search);
      } catch (error) {
        console.error("Error fetching search history:", error.message);
        // Handle error if needed
      }
    };

    fetchSearchHistory();
  }, [uid]);

  const handleGptSearchClick = async () => {
    console.log(searchtext.current.value);
    const gptQuery =
      "Act as a Book Summary system and suggest some gist summary of the book " +
      searchtext.current.value;

    const gptResults = await openai.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-3.5-turbo",
    });
    if (!gptResults.choices) {
      // TODO: Write Error Handling
    }

    console.log(gptResults.choices?.[0]?.message?.content);
    setresult(gptResults.choices?.[0]?.message?.content);
  };

  const handlerecommnedation = async () => {
    const gptQuery =
      "according to the books provided in the array " +
      searchHistory +
      "provide me the list of 10 best recommended books related to the array provided";

    const gptResults = await openai.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-3.5-turbo",
    });
    if (!gptResults.choices) {
      // TODO: Write Error Handling
    }

    console.log(gptResults.choices?.[0]?.message?.content);
    setsearchresult(gptResults.choices?.[0]?.message?.content);
  };

  return (
    <div className="pt-[35%] md:pt-[10%] flex justify-center">
      <form
        className="w-full md:w-1/2 bg-black grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchtext}
          type="text"
          className="p-4 m-4 col-span-9"
          placeholder="Enter the book name :"
        />
        <button
          className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg"
          onClick={handleGptSearchClick}
        >
          Search
        </button>
      </form>
      {results===null?(<ThreeDots
  visible={true}
  height="80"
  width="80"
  color="#4fa94d"
  radius="9"
  ariaLabel="three-dots-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />):<div>{results}</div>}
      

      <button
        onClick={handlerecommnedation}
        className="w-56 bg-blue-500 text-white text-md rounded-xl"
      >
        {" "}
        Personalised Recommended books
      </button>
      <div>{searchresult}</div>

    </div>
    
  );
};

export default Gpt;
