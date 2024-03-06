
import React, { useEffect, useRef, useState } from "react";
import { SiWechat } from "react-icons/si";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([]);
  const dropdownRef = useRef(null);

  const intentToURL = {
    'favouritesPage': '/favourites',
    'bookmarkPage': '/bookmark',
    'CurrentReadPage':'/current-read',
    'ToAccount':'/User',
    'RecentBook':'/recent',
    'BookGpt':'/gpt',
    'Notes':'/Note',
    'Pdf':'/Pdf'

    // Add more intents and their corresponding URLs here
  };
  const fetchMessages = async () => {
    try {
      const userId = localStorage.getItem("uid"); // This should be dynamically set based on the logged-in user
      const response = await fetch(`http://localhost:5000/api/chat-messages/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };
  useEffect(() => {
    
  
    fetchMessages();
  
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      };
  
      // Add click event listener to the document
      document.addEventListener('click', handleClickOutside);
  
      return () => {
        // Remove click event listener from the document
        document.removeEventListener('click', handleClickOutside);
      };
    
  }, []);



  const handleSendClick = async () => {
    const newUserMessage = {
      text: userInput,
      type: "outgoing",
    };
  
    try {
      const userId = localStorage.getItem("uid"); // This should be dynamically set
      const response = await fetch('http://localhost:5000/api/chat-messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          ...newUserMessage,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to send message');
      }
  
      // Optionally, fetch updated messages list to include the new message
      const data = await response.json();
      setMessages(data.messages);
      await textQuery(userInput);
      setUserInput(""); // Clear input after sending
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  


  const textQuery = async (userText) => {
    try {
      const userId = localStorage.getItem("uid"); // Ensure this is dynamically set
      const response = await fetch("http://localhost:5000/text-query", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: userText, // Use the text from user input
          userId,
        })
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      const chatbotResponse = {
        text: data.fulfillmentText, // Assuming this is how you get the response
        type: "incoming",
      };
      // const path = intentToURL[data.name];
      // Now, save the chatbot response as an incoming message
      await fetch('http://localhost:5000/api/chat-messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          ...chatbotResponse,
        }),
      });
  
      // Fetch updated messages list to include the new incoming message
      fetchMessages(); // You should define fetchMessages to be reusable outside useEffect
      setTimeout(() => {
        const path = intentToURL[data.name];
        if (path) {
          window.location.href = path; // Use window.location.href to navigate after a 2-second delay
        } else {
          console.log("Intent doesn't have a corresponding URL");
        }
      }, 2000); // 2000 milliseconds = 2 seconds
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  

  return (
    <div className="relative" ref={dropdownRef} >
      <button onClick={() => setIsOpen(!isOpen)} className="fixed bottom-5 right-5 bg-blue-500 text-white rounded-full p-3 shadow-xl z-10" id="chatbot">
        <SiWechat className="text-4xl"  />
      </button>
      {isOpen && (
        <div className="fixed bottom-20 right-5 bg-white rounded-lg p-4 shadow-lg z-10 w-96 h-[390px] flex flex-col">
          <div className="bg-blue-500 text-white text-lg font-semibold p-2 rounded-t-lg w-full flex justify-center absolute top-0 right-0 left-0">
            Chat with us!
          </div>
          <div className="overflow-auto no-scrollbar p-2 space-y-2 mt-8 flex flex-col" style={{ height: 'calc(100% - 6rem)' }}>
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === "incoming" ? "justify-start" : "justify-end"}`}>
                <div className={`inline-block p-2 text-sm rounded-lg ${message.type === "incoming" ? "bg-gray-200 text-black" : "bg-blue-500 text-white"} min-w-[40px] max-w-[200px]`}>
                  {message.text}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-auto flex">
            <input type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' ? handleSendClick(e) : null}
 className="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="Type your message..." />
            <button onClick={handleSendClick} className="ml-2 bg-green-500 text-white rounded-lg px-4 py-2 hover:bg-green-700">
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;


