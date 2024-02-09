import React, { useState } from "react";
import { Document, Page } from "react-pdf";

const PdfViewer = ({ pdf }) => {
  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const renderPages = () => {
    const pages = [];
    for (let i = 1; i <= numPages; i++) {
      pages.push(
        <div key={i} className="pdf-page">
          <Page
            scale={1.0}
            pageNumber={i}
            renderTextLayer={false}
            renderAnnotationLayer={false}
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
    <div className="flex ">
      <div
        className="pdf-div flex justify-center"
        style={{ width: "1080px", height: "600px", overflowY: "auto" }}
      >
        <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
          {numPages && renderPages()}
        </Document>
      </div>
    </div>
  );
};

export default PdfViewer;
