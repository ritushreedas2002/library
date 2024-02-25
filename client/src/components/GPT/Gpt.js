import React, { useEffect, useRef, useState } from "react";
import { openai } from "../utils/openai";
import Sidebar2 from "../MainBody/SideBar/Sidebar2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import image from "../../assets/background-pic-1.webp";

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
      "Provide a succinct summary of " +
      searchtext.current.value +
      " in approximately 300 words, focusing on the main plot, key characters, and significant themes. Start by introducing the setting and the protagonist, then outline the central conflict or challenge they face. Highlight any notable twists, turns, or climaxes in the narrative, ensuring to convey the emotional and thematic depth of the story without divulging any crucial spoilers. Conclude with the resolution or the moral lesson, if applicable, and the impact the story aims to leave on the reader. Aim for clarity and conciseness while capturing the essence and unique aspects of the book.";
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
    <div className="flex bg-purple-400 min-h-screen">
      <div className="w-[13%]">
        <Sidebar2 />
      </div>
      {/* <div className="pt-[35%] md:pt-[10%] flex justify-center">
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
        <div>{results}</div>

        <button
          onClick={handlerecommnedation}
          className="w-56 bg-blue-500 text-white text-md rounded-xl"
        >
          {" "}
          Personalised Recommended books
        </button>
        <div>{searchresult}</div>
      </div> */}
      <div className="bg-gray-800 min-h-screen flex items-center justify-center w-screen">
        <div
          className="bg-gray-700 w-[90%] h-[90%] bg-cover p-12 rounded-2xl shadow-xl text-white"
          style={{ backgroundImage: `url(${image})` }}
        >
          <div className="flex justify-between mb-6">
            <div className="font-semibold text-lg">Search</div>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Book name"
              className="w-full p-4 pl-5 bg-gray-600 rounded-full focus:outline-none opacity-75 placeholder-white"
            />
          </div>
          <div className="flex space-x-4 mt-6">
            <button
              className="bg-gray-600 px-4 py-2 rounded-full focus:outline-none hover:bg-gray-500 opacity-85"
              onClick={handleGptSearchClick}
            >
              Get summaries
              <FontAwesomeIcon icon={faSearch} className="text-gray-300 pl-2" />
            </button>
            <button className="bg-gray-600 px-4 py-2 rounded-full focus:outline-none hover:bg-gray-500 opacity-85">
              Personalized book suggestions
            </button>
          </div>
          <div className="mt-6">
            <div>{results !== null ? results : ""}</div>
            {/* <img
              src="https://placehold.co/700x400"
              alt="Decorative image placeholder for book search feature"
              className="w-full h-40 bg-gray-600 rounded-xl"
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gpt;
