// import React, { useState, useEffect, useCallback } from "react";
// import useIndivBook from "../../hooks/useIndivBook";
// import { Link } from "react-router-dom";
// import Sidebar2 from "../../MainBody/SideBar/Sidebar2";
// import BookPreview2 from "../../Books/BookPreview2";

// const CurrentRead = ({ uid }) => {
//   const [currentBookId, setCurrentBookId] = useState(null);
//   const [showPreview, setShowPreview] = useState(false);
//   const ShowPreview = () => {
//     setShowPreview(false);
//   };
//   const toggleShowPreview = () => {
//     setShowPreview(!showPreview);
//   }
//   function BookImage({ bookId }) {
//     const bookInfo = useIndivBook(bookId);

//     if (!bookInfo) {
//       return null; // or loading state if needed
//     }

//     return (
//       <div className="flex ">
//         <div className="h-64 w-48 m-6 flex items-center">
//           <div className="h-52 w-64">
//             <Link to={`/book/${bookId}`}>
//             <img
//                     className="mr-12 w-72 size-fit "
//                     src={
//                       bookInfo?.volumeInfo?.imageLinks?.large ||
//                       bookInfo?.volumeInfo?.imageLinks?.thumbnail ||
//                       bookInfo?.volumeInfo?.imageLinks?.smallThumbnail
//                     }
//                     alt=""
//                   />
//             </Link>
//             <div className="flex-col ml-80 -mt-80">
//               <div className="mb-10">
//                 <div className="text-5xl text-white font-bold w-96">
//                   {bookInfo.volumeInfo?.title}
//                 </div>
//                 <div className="mt-4 text-2xl text-white font-bold w-96">
//                   {bookInfo.volumeInfo?.authors.join(", ")}
//                 </div>
//               </div>
//               <button
//                 className="w-56 p-2 m-2 bg-blue-500 text-white font-semibold rounded-lg mt-13 text-xl"
//                 onClick={toggleShowPreview}
//               >
//                 {"See Preview"}
//               </button>

//             </div>

//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Function to fetch the current book ID from the backend
//   const fetchCurrentRead = async () => {
//     try {
//       // Make a GET request to your backend API
//       const response = await fetch(
//         `http://localhost:5000/api/current-read/${uid}`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             // Add any other headers if needed
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to fetch current read book");
//       }

//       // Parse the JSON response
//       const data = await response.json();

//       // Update the currentBookId state with the fetched book ID
//       setCurrentBookId(data.currentRead);
//     } catch (error) {
//       console.error("Error fetching current read book:", error.message);
//       // Handle error if needed
//     }
//   };

//   // useEffect hook to fetch current book ID when the component mounts
//   useEffect(() => {
//     fetchCurrentRead();
//   }, [uid]); // Dependency array is empty to run this effect only once when the component mounts

//   return (
//     <div className="flex bg-purple-400 w-screen h-screen">
//       <div>
//         <Sidebar2 />
//       </div>
//       <div className="ml-56 w-screen h-screen  bg-purple-400">
//         <h2 className="mt-7 text-3xl">Currently Reading</h2>
//         {currentBookId ? <p></p> : <p>No book currently being read</p>}
//         <div className="ml-10">
//         <BookImage bookId={currentBookId} />
//         {showPreview &&(<div className="flex items-center justify-center">
//             <BookPreview2 bookId={currentBookId} userId={uid} show={ShowPreview} />
//         </div>)}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CurrentRead;

import React, { useState, useEffect } from "react";
import useIndivBook from "../../hooks/useIndivBook";
import { Link } from "react-router-dom";
import Sidebar2 from "../../MainBody/SideBar/Sidebar2";
import BookPreview2 from "../../Books/BookPreview2";
import Chatbot from "../../chatbot/Chatbot";
import UserLogo from "../../User/UserLogo";

const BookImage = React.memo(({ bookId, toggleShowPreview }) => {
  const bookInfo = useIndivBook(bookId);

  if (!bookInfo) {
    return null; // or loading state if needed
  }

  return (
    <div className="flex">
      <div className="h-64 w-48 m-6 flex items-center">
        <div className="h-52 w-64">
          <Link to={`/book/${bookId}`}>
            <img
              className="mr-12 w-72 size-fit"
              src={
                bookInfo?.volumeInfo?.imageLinks?.large ||
                bookInfo?.volumeInfo?.imageLinks?.thumbnail ||
                bookInfo?.volumeInfo?.imageLinks?.smallThumbnail
              }
              alt=""
            />
          </Link>
          <div className="flex-col ml-80 -mt-80">
            <div className="mb-10">
              <div className="text-5xl text-white font-bold w-96">
                {bookInfo.volumeInfo?.title}
              </div>
              <div className="mt-4 text-2xl text-white font-bold w-96">
                {bookInfo.volumeInfo?.authors.join(", ")}
              </div>
            </div>
            <button
              className="w-56 p-2 m-2 bg-blue-500 text-white font-semibold rounded-lg mt-13 text-xl"
              onClick={toggleShowPreview}
            >
              {"See Preview"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

const CurrentRead = ({ uid }) => {
  const [currentBookId, setCurrentBookId] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const toggleShowPreview = () => setShowPreview(true);
  const closePreview = () => {
    setShowPreview(false);
  };
  useEffect(() => {
    const fetchCurrentRead = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/current-read/${uid}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch current read book");
        }

        const data = await response.json();
        setCurrentBookId(data.currentRead);
      } catch (error) {
        console.error("Error fetching current read book:", error.message);
      }
    };

    fetchCurrentRead();
  }, [uid]);

  return (
    <div className="flex bg-amber-100  h-screen">
      <UserLogo/>
      <div className="w-[13%]">
        <Sidebar2 />
      </div>

      <div className="ml-16 w-[86%] h-screen bg-amber-100">
        <h2 className="mt-7 text-3xl">Currently Reading</h2>
        {!currentBookId ? (
          <div className="flex justify-center items-center h-96 mt-10">
            <div className="text-3xl flex font-semibold items-center">
              There are no book that u are currently reading
            </div>
          </div>
        ) : (
          <>
            <BookImage
              bookId={currentBookId}
              toggleShowPreview={toggleShowPreview}
            />
            {showPreview && (
              <div className="flex items-center justify-center">
                <BookPreview2
                  bookId={currentBookId}
                  userId={uid}
                  show={closePreview}
                />
              </div>
            )}
          </>
        )}
      </div>
      <Chatbot />
    </div>
  );
};

export default CurrentRead;
