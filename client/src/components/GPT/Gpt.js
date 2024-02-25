import React, { useRef } from 'react';
import { openai } from "../utils/openai";

const Gpt = () => {
    const searchtext = useRef(null);

    const handleGptSearchClick = async () => {
        console.log(searchtext.current.value);
        const gptQuery = "Act as a Book Summary system and suggest some gist summary of the book " +
            searchtext.current.value;
        //get the open ai call and get the movie results
        const gptResults = await openai.completions.create({
            messages: [{ role: 'user', content: gptQuery  }],
            model: 'gpt-3.5-turbo',
        });
        if (!gptResults.choices) {
            // TODO: Write Error Handling
            
        }
        console.log(gptResults);
    }

    return (
        <div className="pt-[35%] md:pt-[10%] flex justify-center">
            <form className="w-full md:w-1/2 bg-black grid grid-cols-12" onSubmit={(e) => e.preventDefault()}>
                <input
                    ref={searchtext}
                    type="text"
                    className="p-4 m-4 col-span-9"
                    placeholder="Enter the book name :"
                />
                <button className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg" onClick={handleGptSearchClick}>
                    Search
                </button>
            </form>
        </div>
    );
}

export default Gpt;
