// BookPreview.js
// import React, { useEffect } from 'react';

// const BookPreview2 = ({ bookId }) => {
//   useEffect(() => {
//     embedBookPreview(bookId);
//   }, [bookId]);

//   const embedBookPreview = (bookId) => {
//     const iframe = document.createElement('iframe');
//     iframe.width = '800';
//     iframe.height = '600';
//     iframe.src = `https://books.google.com/books?id=${bookId}&lpg=PP1&pg=PA1&output=embed`;
//     iframe.frameBorder = '0';
//     iframe.allowFullScreen = true;

//     document.getElementById('bookPreviewContainer').innerHTML = '';
//     document.getElementById('bookPreviewContainer').appendChild(iframe);
//   };

//   return <div id="bookPreviewContainer" className='flex items-center'></div>;
// };

// export default BookPreview2;
// BookPreview2.js


import React, { useEffect, useState } from "react";

const BookPreview2 = ({ bookId, show }) => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  useEffect(() => {
    embedBookPreview(bookId);
  }, [bookId]);

  // const embedBookPreview = (bookId) => {
  //   const iframe = document.createElement('iframe');
  //   iframe.width = '1200';
  //   iframe.height = '550';
  //   iframe.src = `https://books.google.com/books?id=${bookId}&lpg=PP1&pg=PA1&output=embed`;
  //   iframe.frameBorder = '0';
  //   iframe.allowFullScreen = true;

  //   document.getElementById('bookPreviewContainer').innerHTML = '';
  //   document.getElementById('bookPreviewContainer').appendChild(iframe);
  // };

  
  const embedBookPreview = (bookId) => {
    const container = document.getElementById("bookPreviewContainer");

    if (container) {
      const iframe = document.createElement("iframe");
      iframe.width = "1200";
      iframe.height = "550";
      iframe.src = `https://books.google.com/books?id=${bookId}&lpg=PP1&pg=PA1&output=embed`;
      iframe.frameBorder = "0";
      iframe.allowFullScreen = true;

      container.innerHTML = ""; // Clear previous content
      container.appendChild(iframe);
    } else {
      console.error("Element with ID 'bookPreviewContainer' not found");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    show();
  };

  const openSecondModal = () => {
    setIsSecondModalOpen(true);
  };

  return (
    <div>
      {/* The modal */}
      {isModalOpen && (
        <div
          id="bookPreviewModal"
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 "
        >
          <div className="bg-white p-4 rounded-lg shadow-lg w-[70%]">
            {/* Close button */}

            {/* Book preview component */}
            <div id="bookPreviewContainer" className="flex items-center"></div>
            <div className="flex justify-between">
              <button
                onClick={closeModal}
                className="py-2 mt-6 px-4 bg-red-500 text-white font-semibold rounded-lg shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              >
                Close
              </button>
              <button
                onClick={openSecondModal}
                className="py-2 mt-6 px-4 bg-red-500 text-white font-semibold rounded-lg shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              >
                Write Notes
              </button>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
};

export default BookPreview2;
