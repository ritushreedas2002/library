// BookPreview.js
import React, { useEffect } from 'react';

const BookPreview2 = ({ bookId }) => {
  useEffect(() => {
    embedBookPreview(bookId);
  }, [bookId]);

  const embedBookPreview = (bookId) => {
    const iframe = document.createElement('iframe');
    iframe.width = '800';
    iframe.height = '600';
    iframe.src = `https://books.google.com/books?id=${bookId}&lpg=PP1&pg=PA1&output=embed`;
    iframe.frameBorder = '0';
    iframe.allowFullScreen = true;

    document.getElementById('bookPreviewContainer').innerHTML = '';
    document.getElementById('bookPreviewContainer').appendChild(iframe);
  };

  return <div id="bookPreviewContainer" className='flex items-center'></div>;
};

export default BookPreview;
