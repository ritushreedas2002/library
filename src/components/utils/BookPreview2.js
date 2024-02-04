// BookPreview.js
import React, { useEffect } from 'react';
import axios from 'axios';

const BookPreview2 = ({ bookId }) => {
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

export default BookPreview2;

// import React, { useEffect } from 'react';
// import './styles.css';

// const BookPreview2 = ({ bookId }) => {
//   useEffect(() => {
//     const script = document.createElement('script');
//     script.src = 'https://www.google.com/books/api/js?&callback=initializeGoogleBooksAPI';
//     script.async = true;
//     document.body.appendChild(script);

//     script.onload = () => {
//       // When the script is loaded, initialize the Google Books API
//       window.gapi.load('books', initializeGoogleBooksAPI);
//     };

//     return () => {
//       document.body.removeChild(script);
//     };
//   }, [bookId]);

//   const initializeGoogleBooksAPI = () => {
//     // Ensure the 'google.books' namespace is available
//     if (window.gapi.books) {
//       const viewer = new window.gapi.books.DefaultViewer(document.getElementById('bookViewer'));
//       viewer.load(`ISBN:${bookId}`);
//     }
//   };

//   return <div id="bookViewer" className='flex'></div>;
// };

// export default BookPreview2;

