
import React, { useState } from 'react';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import PdfViewer from './PdfViewer';

const PDFUpload = () => {
    const [pdf, setPdf] = useState(null);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setPdf(file);
        }
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) {
            setPdf(file);
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const close = () => {
        setPdf(null);
    };

    return (
        <div className="App flex flex-col items-center justify-center min-h-screen py-6 bg-gray-100" onDrop={handleDrop} onDragOver={handleDragOver}>
            <h1 className="text-3xl font-semibold mb-8">PDF Viewer</h1>
            <div className="flex items-center space-x-4 mb-4">
                <input type="file" accept=".pdf,.docx" onChange={handleFileUpload} className="py-2 px-4 border border-gray-300 rounded-lg bg-white text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                <button onClick={close} className="py-2 px-4 bg-red-500 text-white font-semibold rounded-lg shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">Close</button>
            </div>
           {!pdf &&( <div className="drag-drop-box border-dashed border-2 border-gray-300 rounded-lg p-12 text-gray-500 text-center mr-3">
                <p className="mb-4">Drag and drop your PDF files here</p>
            </div>)}
            {pdf && <PdfViewer pdf={pdf} />}
        </div>
    );
};

export default PDFUpload;



