import React, { useEffect, useRef, useState } from "react";
import { openai } from "../utils/openai";
import Sidebar2 from "../MainBody/SideBar/Sidebar2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import image2 from "../../assets/b2.jpg";
import { ThreeDots } from "react-loader-spinner";
import Chatbot from "../chatbot/Chatbot";
import { FaMicrophone } from "react-icons/fa";
import { FaMicrophoneSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { GOOGLE_BOOK_API_KEY } from "../utils/constant";

const BookCard = ({ id, title, authors, thumbnail }) => {
  return (
    <Link to={`/book/${id}`}>
      <div className="ml-6 mb-5">
        <img className=" w-36 rounded-md h-48 " src={thumbnail} alt={title} />
        {/* <h3>{title}</h3>
      <p>{authors.join(", ")}</p> */}
      </div>
    </Link>
  );
};
const Gpt = () => {
  const [searchHistory, setSearchHistory] = useState([]);
  const [searchresult, setsearchresult] = useState([]);
  const [toggleView, setToggleView] = useState(true);
  const searchtext = useRef(null);
  const [results, setresult] = useState(null);
  const [error, seterror] = useState("");
  const [loading, isloading] = useState(false);
  const uid = localStorage.getItem("uid");
  const navigate = useNavigate();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const handleSpeechToggle = () => {
    if (isSpeaking) {
      // Stop the speech
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      // Start speaking
      const speechSynthesis = window.speechSynthesis;

      const speechMsg = new SpeechSynthesisUtterance(results);

      // Optional: Add an event listener to reset isSpeaking when speaking ends
      speechMsg.onend = () => {
        setIsSpeaking(false);
      };

      speechSynthesis.speak(speechMsg);
      setIsSpeaking(true);
    }
  };

  useEffect(() => {
    const fetchSearchHistory = async () => {
      try {
        const response = await fetch(
          `https://library-henna-two.vercel.app/api/search-history/${uid}`
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
    setToggleView(true);
    setresult(null);
    if (!searchtext.current.value) {
      // If search text is empty, show error message and return early
      //alert("Please enter the book name");
      setsearchresult([]);
      seterror("Please enter the book name");
      return;
    }
    seterror("");
    setsearchresult([]);
    //
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
    // searchtext.current.value = "";
  };

  const handlerecommnedation = async () => {
    setToggleView(false);
    searchtext.current.value = "";
    setsearchresult([]);
    if (searchHistory.length === 0) {
      setresult(null);
      seterror(
        "You have not performed any searches yet, start searching for books in Home to let us know about your interests."
      );
      return;
    }
    seterror("");
    setresult(null);
    isloading(true);
    const gptQuery = `Can you recommend exactly 12 books related to ${searchHistory} to read except this book? Provide me in json format containing books array with only title of the books. Don't include \`\`\`json\`\`\` in first`;

    try {
      // Making the API call
      const gptResults = await openai.chat.completions.create({
        messages: [{ role: "user", content: gptQuery }],
        model: "gpt-3.5-turbo",
      });

      // Checking if the
      if (gptResults.choices && gptResults.choices.length > 0) {
        const recommendationsJson = JSON.parse(
          gptResults.choices[0].message.content
        );
        console.log(recommendationsJson);
        if (recommendationsJson && recommendationsJson.books) {
          const bookTitles = recommendationsJson.books; // Assuming this is an array of book titles
          console.log(bookTitles);

          // Fetch details for each recommended book
          const bookDetailsPromises = bookTitles.map((title) =>
            fetch(
              `https://www.googleapis.com/books/v1/volumes?q=${title}&startIndex=0&maxResults=1&key=${GOOGLE_BOOK_API_KEY}`
            )
              .then((response) => response.json())
              .then((data) => {
                if (data.items && data.items.length > 0) {
                  const { volumeInfo } = data.items[0];
                  //console.log(data.items);
                  return {
                    id: data.items[0].id,
                    title: volumeInfo.title,
                    authors: volumeInfo.authors || ["No authors listed"],
                    thumbnail: volumeInfo.imageLinks
                      ? volumeInfo.imageLinks.thumbnail
                      : "placeholder_image_url",
                  };
                }
                return null;
              })
          );

          Promise.all(bookDetailsPromises).then((bookDetails) => {
            // Filter out any null responses (in case some books weren't found)
            const validBookDetails = bookDetails.filter(
              (detail) => detail !== null
            );
            console.log(validBookDetails);
            setsearchresult(validBookDetails);
            isloading(false);
          });
        } else {
          console.error("Books array not found in the recommendations");
          seterror("No books found in the recommendations.");
          isloading(false);
        }
      } else {
        console.error("No results found from GPT-3.");
        seterror("No results found.");
        isloading(false);
      }
    } catch (error) {
      console.error("Error handling the recommendation:", error);
      seterror(`Error handling the recommendation: ${error.message}`);
      isloading(false);
    }
  };

  return (
    <div className="flex bg-purple-400 min-h-screen">
      <div className="w-[13%]">
        <Sidebar2 />
      </div>

      <div className="bg-amber-100 min-h-screen flex items-center justify-center w-screen">
        <div
          className="bg-gray-700 mt-10 mb-12 w-[90%] min-h-[90%] bg-no-repeat  bg-cover p-12 rounded-2xl shadow-xl text-white"
          style={{ backgroundImage: `url(${image2})` }}
        >
          <div className="flex justify-between mb-6">
            <div className="font-semibold text-4xl -mt-4">BookGPT</div>
          </div>
          <div className="relative">
            <input
              type="text"
              ref={searchtext}
              placeholder="Enter the book name :"
              className="w-full p-4 pl-5 bg-gray-600 rounded-full focus:outline-none opacity-75 placeholder-white"
            />
            <p className="text-red-500 text-lg m-2 font-semibold -mb-3">
              {error}
            </p>
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
            <div className="mt-6 bg-slate-500 p-6 rounded-2xl opacity-85 overflow-y-auto no-scrollbar">
              <button
                onClick={handleSpeechToggle} // Corrected
                className="p-2 text-white  text-2xl rounded-lg  transition duration-300 ml-[1000px]"
              >
                {isSpeaking ? <FaMicrophone /> : <FaMicrophoneSlash />}
              </button>
              <div className=" text-white font-semibold">{results}</div>
              <div
                className=" ml-[500px] w-24 h-10 mb-4"
                onClick={() => {
                  navigate(`/search/${searchtext.current.value}`);
                }}
              >
                <button className=" m-5 w-36 h-10 text-lg bg-black text-white rounded-xl ml-96">
                  KNOW MORE
                </button>
              </div>
            </div>
          )}
          {searchresult.length > 0 && !toggleView && (
            <div className="mt-6 bg-slate-500 p-6 rounded-2xl opacity-90 overflow-y-auto no-scrollbar w-[1100px] h-[460px]">
              {/*<div className=" text-white font-semibold">
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
                  </div>*/}

              <div className="flex flex-wrap justify-between">
                {searchresult.map((book, index) => (
                  <BookCard
                    key={index}
                    id={book.id}
                    title={book.title}
                    authors={book.authors}
                    thumbnail={book.thumbnail}
                  />
                ))}
              </div>
            </div>
          )}
          {loading && (
            <div className="flex justify-center items-center w-full h-full">
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
            </div>
          )}
        </div>
      </div>
      <Chatbot />
    </div>
  );
};

export default Gpt;
