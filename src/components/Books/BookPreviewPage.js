import React from "react";
import { useParams } from "react-router-dom";
import BookPreview from "../utils/BookPreview2";
import BookPreview2 from "../utils/BookPreview2";

const BookPreviewPage = () => {
  const bookid = useParams();
  return (
    // <div className="flex items-center justify-center">
      <BookPreview2 bookId={bookid} />
    // </div>
  );
};

export default BookPreviewPage;
