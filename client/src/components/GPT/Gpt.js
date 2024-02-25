import React, { useRef, useState } from "react";
import { openai } from "../utils/openai";
import Sidebar2 from "../MainBody/SideBar/Sidebar2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import image from "../../assets/background-pic-1.webp";

const Gpt = () => {
  const searchtext = useRef(null);
  const [results, setresult] = useState(null);

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

  return (
    <div className=" flex bg-[#6c34af] h-screen">
      {/* 
      <div className="ml-10 w-[86%] mr-10 ">
        <div>
            BookGPT
        </div>
        <div className="pt-[35%] md:pt-[10%] flex-col justify-center">
          <form
            className="w-full md:w-1/2  grid grid-cols-12"
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
        </div>
      </div> */}
      <div className=" w-[13%]">
        <Sidebar2 />
      </div>
      <div className=" min-h-screen flex items-center justify-center w-screen">
        <div
          className="bg-gray-700 p-12 rounded-2xl shadow-xl text-white"
          
        >
          <div className="flex justify-between mb-6">
            <div className="font-semibold text-lg">Search</div>
            {/* <div className="font-semibold text-lg">Book</div>
            <div className="font-semibold text-lg">Lean</div>
            <div className="font-semibold text-lg">Semmies</div> */}
          </div>
          <div className=" flex items-center">
            <input
              type="text"
              placeholder="Book name"
              className="w-full p-4 pl-4 bg-gray-600 rounded-full focus:outline-none"
            />
            <button className=" top-0 left-0 mt-3 ml-4" onClick={handleGptSearchClick}>
              <FontAwesomeIcon icon={faSearch} className="text-gray-300" />
            </button>
          </div>
          <div className="flex space-x-4 mt-6">
            <button className="bg-gray-600 px-4 py-2 rounded-full focus:outline-none hover:bg-gray-500">
              Get get summaries
            </button>
            <button className="bg-gray-600 px-4 py-2 rounded-full focus:outline-none hover:bg-gray-500">
              Personalized book suggestions
            </button>
          </div>
          <div className="mt-6">
            {/* <img
              src={image}
              alt="Decorative image placeholder for book search feature"
              className="w-full h-screen bg-gray-600 rounded-xl"
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gpt;
