import React, { useState } from "react";
import { Document, Page , pdfjs} from 'react-pdf';

import { FaSquarePlus } from "react-icons/fa6";
import { FaMinusSquare } from "react-icons/fa";
import Chatbot from "../chatbot/Chatbot";
import UserLogo from "../User/UserLogo";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfViewer = ({ pdf }) => {
  const [numPages, setNumPages] = useState(null);
  const [scale, setScale] = useState(1.5);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const zoomIn = () => {
    if (scale < 2.5) setScale(scale + 0.1);
  };

  const zoomOut = () => {
    if (scale > 0.5) setScale(scale - 0.1); // Prevent scale from becoming too small
  };

  const renderPages = () => {
    const pages = [];
    for (let i = 1; i <= numPages; i++) {
      pages.push(
        <div key={i} className="pdf-page">
          <Page
            pageNumber={i}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            scale={scale}
          />
          <p className="flex justify-center">
            {i} of {numPages}
          </p>
        </div>
      );
    }
    return pages;
  };

  return (
    <div className="flex justify-center relative">
      
      <div
        className="pdf-div  justify-center relative"
        style={{ width: "1070px", height: "600px", overflowY: "auto" }}
      >
        <div className="buttons mb-8 flex items-center justify-end -mt-5  z-10 sticky top-0  ">
          <button
            onClick={zoomIn}
            className="zoom-in-button mr-4 bg-blue-600 text-white text-2xl px-2 -mt-10 rounded-lg "
          >
            <FaSquarePlus />
          </button>
          <button
            onClick={zoomOut}
            className="zoom-out-button bg-blue-600 text-white text-2xl px-2 -mt-10 rounded-lg"
          >
            <FaMinusSquare />
          </button>
        </div>
        <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
          {numPages && renderPages()}
        </Document>
      </div>
      <Chatbot/>
    </div>
  );
};

export default PdfViewer;
