// PDFUpload.js
import React, { useState } from 'react';

import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import PdfViewer from './PdfViewer';


const PDFUpload = () => {
    const [pdf, setPdfUrl] = useState(null);

    const handleFileUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        setPdfUrl(file);
      }
    };
  
    return (
      <div className="App">
        <h1>PDF Viewer</h1>
        <input type="file" accept=".pdf" onChange={handleFileUpload} />
        {pdf && <PdfViewer pdf={pdf} />}
      </div>
    );
};

export default PDFUpload;
