import React from "react";
import CountUp from "react-countup";
import image from "../../assets/collage-about-childhood-concept-removebg-preview.png";
import { Link } from "react-router-dom";

const Body = () => {
  return (
    <>
    <div className="flex justify-between">
      <div className="ml-28 mb-10 mt-32" >
        <h2 className="text-6xl font-bold text-purple-700 mt-2 ml-6">Reading is fascinating</h2>
        <p className="text-purple-700 ml-32 text-xl mt-7">Read anywhere, anytime</p>
      </div>
      <img src={image} alt="hii" className="mt-20 transition-transform duration-500 ease-in-out transform hover:translate-y-[-10px]" />
    </div>
    <div className="relative w-1/2 rounded-full shadow-lg mb-8 -mt-44 ml-20">
      <input
        type="search"
        placeholder="Search books, authors, publishers"
        aria-label="Search books"
        className="w-full h-12 pl-6 pr-12 rounded-full text-lg"
      />
      <button
        type="submit"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-purple-500 hover:bg-purple-600 text-white rounded-full p-2"
        aria-label="Search"
      ><Link to="/Login">
        🔍
        </Link>
      </button>
    </div>
    <div className="flex items-center justify-between w-1/2 space-x-8 ml-28 mb-32">
      <div className="text-center">
        <span className="text-4xl font-bold text-gray-800"><CountUp start={0} end={100} duration={3} delay={0} />+</span>
        <p className="text-gray-600">Books</p>
      </div>
      <div className="text-center">
        <span className="text-4xl font-bold text-gray-800"><CountUp start={0} end={50} duration={3} delay={0} />+</span>
        <p className="text-gray-600">Active readers</p>
      </div>
    </div>
    </>
  );
}

export default Body;
