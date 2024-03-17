import React, { useEffect, useState } from "react";
import useIndivBook from "../hooks/useIndivBook";
import { Link, useParams } from "react-router-dom";
import parse from "html-react-parser";
import BookPreview2 from "./BookPreview2";
import ShimmerBookDetail from "../utils/Shimmer/ShimmerBookDetail";
import SearchBar from "../MainBody/SearchBar/SearchBar";
import Sidebar2 from "../MainBody/SideBar/Sidebar2";
import { CgHeart } from "react-icons/cg";
import { FaHeart } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa6";
import { BsBookmarkPlusFill } from "react-icons/bs";
import Notification from "../utils/Notification/Notification";
import Chatbot from "../chatbot/Chatbot";
import { FaMicrophone } from "react-icons/fa";
import { FaMicrophoneSlash } from "react-icons/fa6";
import {
  EmailShareButton,
  FacebookShareButton,
  WhatsappShareButton,
  EmailIcon,
  FacebookIcon,
  WhatsappIcon,
} from "react-share";

const DemoBookCard = () => {
  return (
    <div className="w-32 h-28 p-2 size-fit bg-orange-100 flex justify-center items-center ">
      <h1 className="text-black">pic unavailable</h1>
    </div>
  );
};

const MiniCard = ({ item }) => {
  return (
    <div className="pt-2 pb-2 flex border-b-2">
      {item?.volumeInfo?.imageLinks?.smallThumbnail ? (
        <img
          src={item.volumeInfo?.imageLinks?.smallThumbnail}
          alt={item.volumeInfo?.title}
          className=" w-24  size-fit" // this is the best way to get uniform size images
        />
      ) : (
        <DemoBookCard />
      )}
      <div className="ml-2 text-white text-xl font-medium">
        <div className="line-clamp-2">{item.volumeInfo?.title}</div>
      </div>
    </div>
  );
};

const BookDetails = ({ uid }) => {
  const { bookid } = useParams();
  const bookInfo = useIndivBook(bookid);
  const [booklist, setBookList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showPreview, setShowPreview] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [bookmark, setbookmark] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);

  const category = bookInfo?.volumeInfo?.categories?.[0] ?? null;

  const fetchBookDetail = async () => {
    if (isLoading) {
      try {
        const response = await fetch(
          "https://www.googleapis.com/books/v1/volumes?q=" + category
        );
        const data = await response.json();
        setBookList(data?.items);
      } catch (error) {
        console.error("Error fetching books:", error);
        setIsLoading(false);
      }
    }
  };

  const recentViewed = async () => {
    try {
      // Make the POST request to update the recently viewed book
      const response = await fetch(
        `http://localhost:5000/api/recently-viewed`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: uid, // Assuming `uid` is the user ID
            bookId: bookid, // Assuming `bookid` is the ID of the book being viewed
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update recently viewed book");
      }
    } catch (error) {
      console.error("Error updating recently viewed book:", error.message);
    }
  };

  useEffect(() => {
    if (category !== null) {
      fetchBookDetail();
      recentViewed();
    }
  }, [category]);

  useEffect(() => {
    async function fetchFavoriteStatus() {
      try {
        const response = await fetch(
          `http://localhost:5000/api/favorites/${uid}/${bookid}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch favorite status");
        }
        const data = await response.json();
        setToggle(data.isFavorited);
      } catch (error) {
        console.error("Error fetching favorite status:", error.message);
      }
    }
    async function fetchbookmarkstatus() {
      try {
        const response = await fetch(
          `http://localhost:5000/api/bookmarks/${uid}/${bookid}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch favorite status");
        }
        const data = await response.json();
        setbookmark(data.isbookmarked);
      } catch (error) {
        console.error("Error fetching favorite status:", error.message);
      }
    }
    fetchbookmarkstatus();
    fetchFavoriteStatus();
  }, [uid, bookid]);

  const toggleFavorite = async () => {
    try {
      const method = toggle ? "DELETE" : "POST";
      const response = await fetch(
        `http://localhost:5000/api/favorites/${uid}/${bookid}`,
        {
          // Corrected URL
          method,
          headers: {
            "Content-Type": "application/json",
          },
          // body: JSON.stringify({
          //   bookId: bookid
          // })
        }
      );
      if (response.ok) {
        setToggle(!toggle);
        setNotificationMessage(
          toggle ? "Removed from favourites" : "Added to favourites"
        );
        setShowNotification(true);

        // Hide notification after 3 seconds
        setTimeout(() => {
          setShowNotification(false);
        }, 800);
      } else {
        throw new Error("Failed to update favorite status");
      }
    } catch (error) {
      console.error("Error updating favorite status:", error.message);
    }
  };

  const togglebookmark = async () => {
    try {
      const method = bookmark ? "DELETE" : "POST";
      const response = await fetch(
        `http://localhost:5000/api/bookmarks/${uid}/${bookid}`,
        {
          // Corrected URL
          method,
          headers: {
            "Content-Type": "application/json",
          },
          // body: JSON.stringify({
          //   bookId: bookid
          // })
        }
      );
      if (response.ok) {
        setbookmark(!bookmark);
        setNotificationMessage(
          bookmark ? "Removed from bookmarks" : "Added to bookmarks"
        );
        setShowNotification(true);

        // Hide notification after 3 seconds
        setTimeout(() => {
          setShowNotification(false);
        }, 800);
      } else {
        throw new Error("Failed to update favorite status");
      }
    } catch (error) {
      console.error("Error updating favorite status:", error.message);
    }
  };

  const toggleShowPreview = async () => {
    setShowPreview(true);
    try {
      const response = await fetch(`http://localhost:5000/api/current-read`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: uid,
          bookId: bookid,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to update current read book");
      }
    } catch (error) {
      console.error("Error updating current read book:", error.message);
    }
  };

  const ShowPreview = () => {
    setShowPreview(false);
  };

  const handleClick = () => {
    // window.location.href = "https://play.google.com/store/books/details?id=B3PgDwAAQBAJ&rdid=book-B3PgDwAAQBAJ&rdot=1&source=gbs_api";
    window.open(
      `https://play.google.com/store/books/details?id=` +
        bookid +
        `&rdid=book-` +
        bookid +
        `&rdot=1&source=gbs_api`,
      "_blank"
    );
  };

  const handleSpeechToggle = () => {
    if (isSpeaking) {
      // Stop the speech
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      // Start speaking
      const speechSynthesis = window.speechSynthesis;
      const descriptionText =
        bookInfo.volumeInfo?.description || "No description available.";
      const speechMsg = new SpeechSynthesisUtterance(descriptionText);

      // Optional: Add an event listener to reset isSpeaking when speaking ends
      speechMsg.onend = () => {
        setIsSpeaking(false);
      };

      speechSynthesis.speak(speechMsg);
      setIsSpeaking(true);
    }
  };

  const shareUrl = window.location.href;

  //if (bookInfo === null) return <ShimmerBookDetail />;
  return (
    <div className="bg-amber-100 pl-52  pb-10 flex min-h-screen">
      <Sidebar2 /> {/* Sidebar at the side */}
      <div className="flex flex-col flex-grow ml-6">
        <div className=" -ml-10 ">
          <SearchBar />
        </div>
        {bookInfo ? (
          <div className="flex flex-grow mt-6 mr-8">
            <div className=" p-8 bg-orange-300 rounded-2xl w-[80%]">
              <div className="flex">
                {bookInfo?.volumeInfo === null ? (
                  // <div className="w-[100px] mr-12 h-96 bg-gray-100"></div> //not working properly
                  <div className="w-72 h-[600px] mr-12 bg-orange-200 z-10 flex justify-center items-center text-white text-center">
                    <div>pic unavailable</div>
                  </div>
                ) : (
                  <img
                    className=" mr-12 w-72 size-fit rounded-xl"
                    src={
                      bookInfo?.volumeInfo?.imageLinks?.thumbnail ||
                      bookInfo?.volumeInfo?.imageLinks?.smallThumbnail
                    }
                    alt=""
                  />
                )}
                <div>
                  <div className=" text-5xl text-gray-600 font-bold w-96">
                    {bookInfo.volumeInfo?.title}
                  </div>
                  <div className=" mt-4 text-2xl text-white font-bold w-96">
                    {bookInfo.volumeInfo?.authors?.join(", ")}
                  </div>
                  <div>
                    <button
                      className="text-4xl text-white mt-6 flex items-center bg-gray-500 py-2 px-3 rounded-xl transition-transform duration-100 hover:scale-110"
                      onClick={() => toggleFavorite()}
                    >
                      {toggle ? (
                        <FaHeart className="text-red-500 " />
                      ) : (
                        <CgHeart />
                      )}
                    </button>
                    <button
                      className="mt-2 text-xl text-white font-semibold bg-red-500 py-2 px-3 rounded-xl transition-transform duration-100 hover:scale-110"
                      onClick={() => handleClick()}
                    >
                      Buy this book
                    </button>
                    <div className=" mt-4 ">
                      <EmailShareButton
                        url={shareUrl}
                        className="mr-4 transition-transform duration-100 hover:scale-125"
                      >
                        <EmailIcon size={44} round={true} />
                      </EmailShareButton>
                      <FacebookShareButton
                        url={shareUrl}
                        className="transition-transform duration-100 hover:scale-125"
                      >
                        <FacebookIcon size={44} round={true} />
                      </FacebookShareButton>
                      <WhatsappShareButton
                        url={shareUrl}
                        className="ml-4 transition-transform duration-100 hover:scale-125"
                      >
                        <WhatsappIcon size={44} round={true} />
                      </WhatsappShareButton>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div
                    className="text-6xl -mt-10 absolute left-28 transition-transform duration-100 cursor-pointer hover:scale-110"
                    onClick={() => togglebookmark()}
                  >
                    {bookmark ? (
                      <FaBookmark className="text-white" />
                    ) : (
                      <BsBookmarkPlusFill className=" text-gray-600" />
                    )}
                  </div>
                </div>
              </div>
              <div className=" flex flex-col overflow-y-scroll h-[230px] no-scrollbar mt-5 bg-orange-100 rounded-xl p-4">
                <div className=" text-gray-600 text-2xl font-bold border-b-2 border-black">
                  Description
                  <button
                    onClick={handleSpeechToggle} // Corrected
                    className="mt-4 p-2 text-black text-2xl rounded-lg  transition duration-300 ml-[700px]"
                  >
                    {isSpeaking ?  <FaMicrophone />:<FaMicrophoneSlash />}
                  </button>
                </div>
                <div className=" mt-4 text-base text-gray-800">
                  {bookInfo.volumeInfo?.description
                    ? parse(bookInfo.volumeInfo?.description)
                    : null}
                </div>
              </div>
              {/* <Link to={"/book/preview/" + bookInfo.id}> */}
              <button
                className=" p-2 m-2 bg-blue-600 text-white font-semibold rounded-lg mt-6 transition-transform duration-100 hover:scale-110"
                onClick={toggleShowPreview}
              >
                {"See Preview"}
              </button>
              {/* </Link> */}
              {showPreview && (
                <div className="flex items-center justify-center">
                  <BookPreview2
                    bookId={bookInfo.id}
                    userId={uid}
                    show={ShowPreview}
                  />
                </div>
              )}
            </div>
            <div className=" p-4 ml-5 max-h-[630px] bg-orange-300 rounded-2xl w-[20%] flex flex-col">
              <div className=" text-gray-600 text-2xl font-bold mb-4 text-center">
                Related Books
              </div>
              <div className=" flex flex-col overflow-y-scroll h-[620px] no-scrollbar">
                {booklist?.map((book, index) => (
                  <Link key={index} to={"/book/" + book.id}>
                    <MiniCard key={index} item={book} />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <ShimmerBookDetail />
        )}
        {showNotification && (
          <Notification
            message={notificationMessage}
            onClose={() => setShowNotification(false)}
          />
        )}
      </div>
      <Chatbot />
    </div>
  );
};

export default BookDetails;
