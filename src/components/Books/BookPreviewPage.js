import React from "react";
import { useParams } from "react-router-dom";
import BookPreview2 from "../utils/BookPreview2";

const BookPreviewPage = () => {
  const bookid = useParams();
  return (
    // <div className="flex items-center justify-center">
     <BookPreview2 bookId={bookid} />
    // </div>
    // <div className="book-preview-container">
    //   <iframe
    //     title="Google Books Preview"
    //     src={`https://books.google.com/books?id=${bookid}&lpg=PP1&pg=PA1&output=embed`}
    //     sandbox="allow-scripts allow-same-origin"
    //     width="600"
    //     height="400"
    //     frameBorder="0"
    //     allowFullScreen
    //   ></iframe>
    //</div>
  );
};

export default BookPreviewPage;