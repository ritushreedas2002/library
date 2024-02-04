// // import React from "react";
// // import { useParams } from "react-router-dom";
// // import BookPreview from "../utils/BookPreview2";
// // import BookPreview2 from "../utils/BookPreview2";

// // const BookPreviewPage = () => {
// //   const bookid = useParams();
// //   return (
// //     // <div className="flex items-center justify-center">
// //       <BookPreview2 bookId={bookid} />
// //     // </div>
// //   );
// // };

// // export default BookPreviewPage;
// // import React, { useState } from "react";
// // import { useParams } from "react-router-dom";
// // import Modal from 'react-modal';
// // import BookPreview2 from "../utils/BookPreview2";

// // const BookPreviewPage = () => {
// //   const { bookId } = useParams();
// //   const [modalIsOpen, setModalIsOpen] = useState(true);

// //   const closeModal = () => {
// //     // Add any additional logic you may need before closing the modal
// //     setModalIsOpen(false);
// //   };

// //   return (
// //     <Modal
// //       isOpen={modalIsOpen}
// //       onRequestClose={closeModal}
// //       contentLabel="Book Preview Modal"
// //     >
// //       <div className="flex items-center justify-between">
// //         <h2>Book Preview</h2>
// //         <button onClick={closeModal}>Close</button>
// //       </div>
// //       <div>
// //         <BookPreview2 bookId={bookId} />
// //       </div>
// //     </Modal>
// //   );
// // };

// // export default BookPreviewPage;

// // BookPreviewPage.js
// import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';
// import BookPreview2 from '../utils/BookPreview2';

// const BookPreviewPage = () => {
//   const { bookId } = useParams();
//   const [isModalOpen, setIsModalOpen] = useState(true);

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     // Optionally, you can also navigate back or perform other actions
//   };

//   return (
//     <div>
//       {/* Your other page content goes here */}
//       {/* For example, a button to open the modal */}
//       <button onClick={() => setIsModalOpen(true)}>Open Book Preview Modal</button>

//       {/* The modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
//           <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//             {/* Close button */}
//             <button
//               className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
//               onClick={handleCloseModal}
//             >
//               Close
//             </button>
            
//             {/* Book preview component */}
//             <BookPreview2 bookId={bookId} />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BookPreviewPage;


