import React, { useEffect, useState } from "react";

const BookPreview2 = ({ bookId,userId, show }) => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false);
  const [notes, setNotes] = useState('');
  const [notesExist, setNotesExist] = useState(false); // Track if notes exist on the server


  useEffect(() => {
    embedBookPreview(bookId);
    fetchNotes();
  }, [bookId, userId]);

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

  const openNotesModal = () => {
    setIsNotesModalOpen(true);
  };

  const closeNotesModal = () => {
    setIsNotesModalOpen(false);
  };

  const handleNoteChange = (e) => {
    setNotes(e.target.value);
  };

  const fetchNotes = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/booknotes/${userId}/${bookId}`);
      if (response.ok) {
        const data = await response.json();
        setNotes(data.content);
        setNotesExist(true); // Set to true because notes were successfully fetched
      } else {
        // This handles the case where there are no existing notes for the book
        setNotes('');
        setNotesExist(false); // Set to false because no notes were found
      }
    } catch (error) {
      console.error("Failed to fetch notes:", error);
      setNotesExist(false); // Ensure it's set to false in case of an error
    }
  };

  const saveNotes = async () => {
    const method = notesExist ? 'PUT' : 'POST'; // Use PUT if notes exist, otherwise POST
    const endpoint = notesExist?`http://localhost:5000/api/booknotes/${userId}/${bookId}`:`http://localhost:5000/api/notes/${userId}/${bookId}`;

    try {
      const response = await fetch(endpoint, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: notes }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      //setNotesExist(true); // After a successful save, assume notes now exist on the server
      fetchNotes();
      closeNotesModal();
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  return (
    <div>
      {isModalOpen && (
        <div id="bookPreviewModal" className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-[70%]">
            <div id="bookPreviewContainer" className="flex items-center"></div>
            <div className="flex justify-between">
              <button onClick={closeModal} className="py-2 mt-6 px-4 bg-red-500 text-white font-semibold rounded-lg shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">Close</button>
              <button onClick={openNotesModal} className="py-2 mt-6 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">{notesExist?"Update notes":"Write Notes"}</button>
            </div>
          </div>
        </div>
      )}

      {isNotesModalOpen && (
        <div id="notesModal" className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-[70%]">
            <textarea className="w-full h-64 p-2 border-2 border-gray-200 rounded-lg" value={notes} onChange={handleNoteChange}></textarea>
            <div className="flex justify-end mt-4">
              <button onClick={saveNotes} className="py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">Save Notes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookPreview2;
