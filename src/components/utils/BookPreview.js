// import React, { useState, useEffect, useRef } from "react";
// import { useSelector } from "react-redux";

// // const BookPreview = ({ isbn }) => {
// //   const viewerRef = useRef(null); // Reference to the container element
// //   const [isScriptLoaded, setIsScriptLoaded] = useState(false); // Track script loading
// //   let script;
// //   useEffect(() => {
// //     const loadViewerScript = async () => {
// //       if (!isScriptLoaded) {
// //         // Load the Google Books API script only once
// //         const script = document.createElement('script');
// //         script.src = 'https://www.google.com/jsapi';
// //         script.async = true;
// //         script.onload = () => {
// //           setIsScriptLoaded(true);
// //           //google.load('books', '0'); // Load the Embedded Viewer API
// //           //google.books.setOnLoadCallback(createViewer);
// //         };
// //         document.body.appendChild(script);
// //       }
// //     };

// //     const createViewer = () => {
// //       const viewerOptions = {
// //         showLinkChrome: false, // Hide link to Google Books
// //       };
// //       //const viewer = new google.books.DefaultViewer(viewerRef.current, isbn, viewerOptions);
// //     };

// //     loadViewerScript();

// //     return () => {
// //       // Clean up script when component unmounts (optional)
// //       if (script) {
// //         document.body.removeChild(script);
// //       }
// //     };
// //   }, [isbn]); // Run effect only when isbn changes

// //   return (
// //     <div ref={viewerRef}></div>
// //   );
// // };

// const BookPreview = ({ isbn }) => {
//   // Obtain ISBN number of user's current book
//   // const ISBN_num = useSelector(
//   //   (state) => state.currentBookReducer.currentBook.book.ISBN_number
//   // );
//   const ISBN_num = isbn;
//   const canvasRef = useRef();

//   // Initialize loaded state as false
//   const [loaded, setLoaded] = useState(false);
//   // Create alert message if book not found in Google Database
//   function alertNotFound() {
//     alert("could not embed the book!");
//   }
//   // Add a Google Books script tag and event listener if the tag has loaded
//   useEffect(() => {
//     const scriptTag = document.createElement("script");
//     scriptTag.src = "https://www.google.com/books/jsapi.js";
//     scriptTag.addEventListener("load", () => setLoaded(true));
//     scriptTag.id = "google-script";
//     document.body.appendChild(scriptTag);
//   }, []);
//   // Once Google Books has loaded, then create new instance of Default viewer and load book's information to viewer
//   useEffect(() => {
//     if (!loaded) return;
//     else {
//       if (window.viewer) {
//         let viewer = new window.google.books.DefaultViewer(canvasRef.current);
//         viewer.load("ISBN:" + ISBN_num, alertNotFound);
//       } else {
//         window.google.books.load();
//         window.google.books.setOnLoadCallback(() => {
//           let viewer = new window.google.books.DefaultViewer(canvasRef.current);
//           window.viewer = viewer;
//           viewer.load("ISBN:" + ISBN_num, alertNotFound);
//         });
//       }
//     }
//   }, [loaded]);
//   console.log(loaded + " load ");
//   return (
//     <div>
//       {loaded ? (
//         <div>
//           <div ref={canvasRef} id="viewerCanvas">
//             ghjgjgjghj
//           </div>
//         </div>
//       ) : (
//         "Script not loaded"
//       )}
//     </div>
//   );
// };

// export default BookPreview;

// BookPreview.js
import React, { useEffect } from 'react';


const BookPreview = ({ bookId }) => {
  useEffect(() => {
    embedBookPreview(bookId);
  }, [bookId]);

  const embedBookPreview = (bookId) => {
    const iframe = document.createElement('iframe');
    iframe.width = '600';
    iframe.height = '400';
    iframe.src = `https://books.google.com/books?id=${bookId}&lpg=PP1&pg=PA1&output=embed`;
    iframe.frameBorder = '0';
    iframe.allowFullScreen = true;

    document.getElementById('bookPreviewContainer').innerHTML = '';
    document.getElementById('bookPreviewContainer').appendChild(iframe);
  };

  return <div id="bookPreviewContainer" className='flex items-center'></div>;
};

export default BookPreview;

