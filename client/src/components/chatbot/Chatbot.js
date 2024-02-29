

// import React, { useState } from "react";
// import { SiWechat } from "react-icons/si";

// const Chatbot = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [userInput, setUserInput] = useState(""); // State for user input
//   const [messages, setMessages] = useState([]); // Messages state for dynamic chat

//   const handleSendClick = async () => {
//     // Update messages with user's input immediately
//     const newUserMessage = {
//       id: messages.length + 1,
//       text: userInput,
//       type: "outgoing",
//     };
//     setMessages([...messages, newUserMessage]);

//     // Then call the backend for chatbot's response
//     await textQuery(userInput); // Pass userInput to textQuery
//     setUserInput(""); // Clear input field
//   };

//   const textQuery = async (userText) => {
//     try {
//       const response = await fetch("http://localhost:5000/text-query", {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           text: userText, // Use the text from user input
//           userId: "1234567",
//         })
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const data = await response.json();
//       // Assuming data contains the chatbot response in 'fulfillmentText'
//       const chatbotResponse = {
//         id: messages.length + 2, // Ensure unique ID
//         text: data.fulfillmentText, // Chatbot's response text
//         type: "incoming",
//       };
//       setMessages((prevMessages) => [...prevMessages, chatbotResponse]);
//     } catch (error) {
//       console.error("Error fetching data: ", error);
//     }
//   };

//   const toggleChatbot = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div className="relative">
//       <button onClick={toggleChatbot} className="fixed bottom-5 right-5 bg-blue-500 text-white rounded-full p-3 shadow-xl z-10">
//         <SiWechat className="text-4xl" />
//       </button>
//       {isOpen && (
//         <div className="fixed bottom-20 right-5 bg-white rounded-lg p-4 shadow-lg z-10 w-96 h-[390px]">
//           <div className="bg-blue-500 text-white text-lg font-semibold p-2 rounded-t-lg absolute top-0 left-0 right-0 w-full flex justify-center">
//             Let's Chat
//           </div>
//           <div className="overflow-auto p-2 space-y-2 no-scrollbar mt-8" style={{ height: 'calc(100% - 6rem)' }}>
//             {messages.map((message) => (
//               <div key={message.id} className={`inline-block p-2 text-sm rounded-lg ${message.type === "incoming" ? "bg-gray-200 text-black mr-auto" : "bg-blue-500 text-white ml-auto"} min-w-[40px]`} style={{ maxWidth: '70%' }}>
//                 {message.text}
//               </div>
//             ))}
//           </div>
//           <input
//             type="text"
//             value={userInput}
//             onChange={(e) => setUserInput(e.target.value)}
//             className="w-[70%] border border-gray-300 rounded-lg px-3 py-2 absolute bottom-5"
//             placeholder="Type your message..."
//             onKeyPress={(e) => e.key === 'Enter' && handleSendClick()} // Allow sending by pressing Enter
//           />
//           <button
//             onClick={handleSendClick}
//             className="bg-green-500 text-white rounded-lg px-4 py-2 hover:bg-red-600 absolute bottom-5 right-4"
//           >
//             Send
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Chatbot;

import React, { useState } from "react";
import { SiWechat } from "react-icons/si";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSendClick = async () => {
    const newUserMessage = {
      id: messages.length + 1,
      text: userInput,
      type: "outgoing",
    };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);

    // Simulate getting response after sending message
    await textQuery(userInput);
    setUserInput(""); // Clear input after sending
  };

  const textQuery = async (userText) => {
        try {
          const response = await fetch("http://localhost:5000/text-query", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              text: userText, // Use the text from user input
              userId: "1234567",
            })
          });
    
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
    
          const data = await response.json();
          // Assuming data contains the chatbot response in 'fulfillmentText'
          const chatbotResponse = {
            id: messages.length + 2, // Ensure unique ID
            text: data.fulfillmentText, // Chatbot's response text
            type: "incoming",
          };
          setMessages((prevMessages) => [...prevMessages, chatbotResponse]);
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      };

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="fixed bottom-5 right-5 bg-blue-500 text-white rounded-full p-3 shadow-xl z-10">
        <SiWechat className="text-4xl" />
      </button>
      {isOpen && (
        <div className="fixed bottom-20 right-5 bg-white rounded-lg p-4 shadow-lg z-10 w-96 h-[390px] flex flex-col">
          <div className="bg-blue-500 text-white text-lg font-semibold p-2 rounded-t-lg w-full flex justify-center absolute top-0 right-0 left-0">
            Chat with us!
          </div>
          <div className="overflow-auto no-scrollbar p-2 space-y-2 mt-8 flex flex-col" style={{ height: 'calc(100% - 6rem)' }}>
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === "incoming" ? "justify-start" : "justify-end"}`}>
                <div className={`inline-block p-2 text-sm rounded-lg ${message.type === "incoming" ? "bg-gray-200 text-black" : "bg-blue-500 text-white"} min-w-[40px]`}>
                  {message.text}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-auto flex">
            <input type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="Type your message..." />
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


