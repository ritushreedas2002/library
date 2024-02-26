
import React, { useState } from "react";
import { SiWechat } from "react-icons/si";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  // Demo chat messages
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello, how can I help you?", type: "incoming" },
    { id: 2, text: "I need help with my account.", type: "outgoing" },
    { id: 3, text: "Sure, what issue are you experiencing?", type: "incoming" },
    { id: 4, text: "Sure, what issue are you experiencing?", type: "outgoing" },
    { id: 5, text: "Sure, what issue are you experiencing?", type: "incoming" },
    { id: 6, text: "Sure, what issue are you experiencing?", type: "outgoing" },
  ]);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
  
    <div className="relative">
  <button className="fixed bottom-5 right-5 bg-blue-500 text-white rounded-full p-3 shadow-xl z-10" onClick={toggleChatbot}>
    <SiWechat className="text-4xl text-white"/>
  </button>
  {isOpen && (
    <div className="fixed bottom-20 right-5 bg-white rounded-lg p-4 shadow-lg z-10 w-96 h-[390px]">
      <div className="bg-blue-500 text-white text-lg font-semibold p-2 rounded-t-lg absolute top-0 left-0 right-0 w-full flex justify-center">
        Let's Chat
      </div>
      <div className="overflow-auto p-2 space-y-2 no-scrollbar mt-8" style={{ height: 'calc(100% - 6rem)' }}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`p-2 text-sm rounded-lg ${message.type === "incoming" ? "bg-gray-200 text-black mr-auto" : "bg-blue-500 text-white ml-auto"} max-w-[70%]`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <input type="text" className="w-[70%] border border-gray-300 rounded-lg px-3 py-2 absolute bottom-5" placeholder="Type your message..." />
      <button className="bg-green-500 text-white rounded-lg px-4 py-2 hover:bg-red-600 absolute bottom-5 right-4" onClick={toggleChatbot}>
        Send
      </button>
    </div>
  )}
</div>
  );
};

export default Chatbot;
