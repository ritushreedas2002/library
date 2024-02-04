// BookPreview.js
import React, { useEffect } from 'react';
import axios from 'axios';

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
