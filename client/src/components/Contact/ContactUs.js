import React from 'react';
import { AiFillHome } from "react-icons/ai";
import { Link } from 'react-router-dom';
import Footer from '../Footer/Footer';

const ContactUs = () => {
  return (
    <>
    <div className="flex min-h-screen  bg-yellow-300">
      {/* Left Side with Image */}
      <div className="w-1/2  m-14 bg-[url('https://images.theconversation.com/files/45159/original/rptgtpxd-1396254731.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=754&fit=clip')] bg-cover bg-no-repeat bg-center">
        {/* The image URL should be replaced with the path to your actual image */}
      </div>

      {/* Right Side with Contact Form */}
      <div className="w-1/2  flex flex-col justify-center px-16">
        <h1 className="text-4xl font-bold mb-10 mt-7">Contact Us</h1>
        <form className="space-y-6">
          <input type="text" placeholder="Full Name" className="w-full px-4 py-2 border-b-2 border-black bg-transparent outline-none" />
          <input type="email" placeholder="E-mail" className="w-full px-4 py-2 border-b-2 border-black bg-transparent outline-none" />
          <textarea placeholder="Message" className="w-full px-4 py-2 border-b-2 border-black bg-transparent outline-none" rows="4"></textarea>
          <button type="submit" className="w-full bg-black text-white px-4 py-2">Contact Us</button>
        </form>
        <div className="mt-6">
          <div className="mb-2">Contact: hi@fashion.com</div>
          <div className="mb-2">Based in San Francisco, California</div>
          <div className="flex space-x-4 mt-4 mb-3">
            <Link to="/"><AiFillHome  className="text-xl cursor-pointer" /></Link>
            
          </div>
        </div>
      </div>
      
    </div>
    <Footer/>
    </>
  );
};

export default ContactUs;
