import React, { useRef, useState } from "react";
import Message from "../../assets/img-01.png";

import Sidebar2 from "../MainBody/SideBar/Sidebar2";
import emailjs from "@emailjs/browser";
import Notification from "../utils/Notification/Notification";
import { HiMiniArrowLongRight } from "react-icons/hi2";

const ContactUs = () => {
  const [message, setMessages] = useState("");
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_5fowasj", "template_a5d9ror", form.current, {
        publicKey: "t_T3sujISqn4wnljA",
      })
      .then(
        () => {
          setMessages("Mail has been sent successfully");
        },
        (error) => {
          setMessages("Failed to sent u the mail");
        }
      );
    e.target.reset();
    setTimeout(() => {
      setMessages("");
    }, 2000);
  };
  const onClose = () => {
    setMessages("");
  };

  const uid = localStorage.getItem("uid");
  return (
    <div>
      {uid && <Sidebar2 />}
      {message && <Notification message={message} onClose={onClose} />}
      <div className="bg-blue-100 flex items-center justify-center h-screen">
        <div className="flex bg-white rounded-lg shadow-lg w-2/3">
          {/* Image container */}
          <div className="w-1/2 flex justify-center items-center bg-blue-200 rounded-l-lg">
            <img
              src={
                Message
              } /*"https://placehold.co/100x100.png?text=Envelope+Icon&fontsize=25"*/
              alt="Envelope icon with motion lines, indicating fast sending message, placeholder image"
              className="animate-pulse"
            />
          </div>

          {/* Form container */}
          <div className="w-1/2 p-8">
            <h2 className="text-3xl font-bold text-center  text-gray-800 mb-8">
              Get in touch
            </h2>
            <form ref={form} className="space-y-4" onSubmit={sendEmail}>
              <div>
                <input
                  type="text"
                  placeholder="Name"
                  name="user_name"
                  className="w-full px-6 py-3  rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  name="user_email"
                  className="w-full px-6 py-3  rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
                />
              </div>
              {/* <div>
                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full px-6 py-3  rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
                />
              </div> */}
              <div>
                <textarea
                  placeholder="Message"
                  name="message"
                  className="w-full h-48 px-6 py-3  rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
                  rows="4"
                ></textarea>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="px-6 flex items-center py-3 bg-green-500 text-white rounded-full font-bold hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 transition-transform duration-100 hover:scale-110 cursor-pointer"
                >
                  Send Email{" "}
                  <HiMiniArrowLongRight className=" text-2xl ml-2 " />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
