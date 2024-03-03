import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaGoogle, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-black text-white p-4">
      <div className="max-w-6xl mx-auto h-32 flex flex-col md:flex-row justify-between items-center">
        <div className="flex justify-center mb-4 md:mb-0">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="mx-2">
            <FaFacebookF />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="mx-2">
            <FaInstagram />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="mx-2">
            <FaTwitter />
          </a>
          <a href="https://google.com" target="_blank" rel="noopener noreferrer" className="mx-2">
            <FaGoogle />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="mx-2">
            <FaYoutube />
          </a>
        </div>
        <div className="flex justify-center mb-4 md:mb-0">
          <a href="/" className="mx-2 hover:text-gray-400 transition-colors">Home</a>
          <a href="/news" className="mx-2 hover:text-gray-400 transition-colors">News</a>
          <a href="/about" className="mx-2 hover:text-gray-400 transition-colors">About</a>
          <a href="/contact" className="mx-2 hover:text-gray-400 transition-colors">Contact Us</a>
          <a href="/team" className="mx-2 hover:text-gray-400 transition-colors">Our Team</a>
        </div>
        <div className="text-center md:text-right">
          <p>Copyright ©2022; Designed by FAHEEM</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
