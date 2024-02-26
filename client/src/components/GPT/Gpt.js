import React, { useEffect, useRef, useState } from "react";
import { openai } from "../utils/openai";
import Sidebar2 from "../MainBody/SideBar/Sidebar2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import image from "../../assets/background-pic-1.webp";
import { ThreeDots } from "react-loader-spinner";

const Gpt = () => {
  const [searchHistory, setSearchHistory] = useState([]);
  const [searchresult, setsearchresult] = useState([]);
  const [toggleView, setToggleView] = useState(true);
  const searchtext = useRef(null);
  const [results, setresult] = useState(null);
  const [error,seterror]=useState("");
  const [loading,isloading]=useState(false);
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
        // console.log(data.search);
      } catch (error) {
        console.error("Error fetching search history:", error.message);
        // Handle error if needed
      }
    };

    fetchSearchHistory();
  }, [uid]);

  const handleGptSearchClick = async () => {

    if (!searchtext.current.value) {
      // If search text is empty, show error message and return early
      //alert("Please enter the book name");
      seterror("Please enter the book name")
      return;
    }
    seterror("");
    
    setToggleView(true);
    console.log(searchtext.current.value);
    isloading(true);
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
    isloading(false);
    searchtext.current.value = "";
  };

  const handlerecommnedation = async () => {
    if (searchHistory.length === 0) {
      seterror("You have not performed any searches yet");
      return;
    }
    seterror("");
    
    setToggleView(false);
    isloading(true);
    const gptQuery = `Can you recommend exactly 10 books related to ${searchHistory} to read except this book? Provide me in json format containing books array with only title of the books. Don't include \`\`\`json\`\`\` in first`;
    //   "according to the books provided in the array " +
    //   searchHistory +
    //   "provide me a list of 10 best recommended books related to the array provided in a comma seperated format like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya. Give me the names only. Put the name of the 10 books in an array from indexes 0 to 9 and return it.";

    // const gptResults = await openai.chat.completions.create({
    //   messages: [{ role: "user", content: gptQuery }],
    //   model: "gpt-3.5-turbo",
    // });
    // if (!gptResults.choices) {
    //   // TODO: Write Error Handling
    // }

    // console.log(gptResults.choices?.[0]?.message?.content);
    // setsearchresult(gptResults.choices?.[0]?.message?.content);
    // const searchmap = gptResults.choices?.[0]?.message?.content.split(",");
    // console.log(searchmap);
    // setsearchresult(searchmap);

    try {
      // Making the API call
      const gptResults = await openai.chat.completions.create({
        messages: [{ role: "user", content: gptQuery }],
        model: "gpt-3.5-turbo",
        // response_format: { type: "json_object" }
      });

      // Checking if the API returned any results
      if (gptResults.choices && gptResults.choices.length > 0) {
        // const recommendations = gptResults.choices[0].message.content;
        // console.log(recommendations);
        const recommendationsJson = JSON.parse(
          gptResults.choices[0].message.content
        );
        console.log(recommendationsJson);

        // Splitting the returned string into an array of book names
        // const bookList = recommendations
        //   .split("", "")
        //   .map((book) => book.trim());
        // console.log(bookList);
        if (recommendationsJson && recommendationsJson.books) {
          const bookList = recommendationsJson.books; // This should already be an array of book titles
          console.log(bookList);

          // Setting the array of book names in the state to use in your component for rendering
          setsearchresult(bookList); // Assuming setsearchresult updates the state with the book list
          isloading(false);
          searchtext.current.value = "";
        } else {
          console.error("Books array not found in the recommendations");
          // Handle the case where the 'books' array is not in the response
        }

        // Setting the array of book names in the state to use in your component for rendering
        // setsearchresult(bookList); // Assuming setsearchresult updates the state with the book list
      } else {
        console.error("No results found");
        // Handle the case where there are no recommendations
      }
    } catch (error) {
      console.error("Error handling the recommendation:", error);
      // Implement error handling
    }
  };
  // if (searchresult.length > 0) {
  //   console.log(searchresult.split(","));
  // }

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
          className="bg-gray-700 w-[90%] min-h-[90%] bg-cover p-12 rounded-2xl shadow-xl text-white"
          style={{ backgroundImage: `url(${image})` }}
        >
          <div className="flex justify-between mb-6">
            <div className="font-semibold text-lg">Search</div>
          </div>
          <div className="relative">
            <input
              type="text"
              ref={searchtext}
              placeholder="Enter the book name :"
              className="w-full p-4 pl-5 bg-gray-600 rounded-full focus:outline-none opacity-75 placeholder-white"
            />
            <p className="text-red-700 m-2 font-semibold">{error}</p>
          </div>
          <div className="flex space-x-4 mt-6">
            <button
              className={`px-4 py-2 rounded-full focus:outline-none hover:bg-gray-500 opacity-85 ${
                toggleView ? "bg-red-500" : "bg-gray-600"
              }`}
              onClick={handleGptSearchClick}
            >
              Get summaries
              <FontAwesomeIcon icon={faSearch} className="text-gray-300 pl-2" />
            </button>
            <button
              className={`px-4 py-2 rounded-full focus:outline-none hover:bg-gray-500 opacity-85 ${
                !toggleView ? "bg-red-500" : "bg-gray-600"
              }`}
              onClick={handlerecommnedation}
            >
              Personalized book suggestions
            </button>
          </div>
          {results && toggleView && (
            <div className="mt-6 bg-slate-500 p-6 rounded-2xl opacity-75 ">
              <div className=" text-white font-semibold">{results}</div>
            </div>
          )}
          {searchresult.length > 0 && !toggleView && (
            <div className="mt-6 bg-slate-500 p-6 rounded-2xl opacity-75 ">
              <div className=" text-white font-semibold">
                {/* {searchresult?.split(",").map((index, book) => {
                  <li key={index}>{book}</li>;
                })} */}
                {/* {searchresult} */}
                <ul>
                  {searchresult.map((book, index) => (
                    <div className=" flex" key={index}>
                      {index + 1}:
                      <li key={index} className=" pl-2">
                        {book}
                      </li>
                    </div>
                  ))}
                </ul>
              </div>
            </div>
          )}
          {loading && (<div className="flex justify-center items-center w-full h-full">
          <ThreeDots
            visible={true}
            height="80"
            width="80"
            color="#ff0000"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
          </div>)}
         
        </div>
      </div>
    </div>
    
  );
};

export default Gpt;