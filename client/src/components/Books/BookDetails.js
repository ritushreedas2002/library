import React, { useEffect, useState } from "react";
import useIndivBook from "../hooks/useIndivBook";
import { Link, useParams } from "react-router-dom";
import parse from "html-react-parser";
import BookPreview2 from "./BookPreview2";
import ShimmerBookDetail from "../utils/Shimmer/ShimmerBookDetail";
import SearchBar from "../MainBody/SearchBar/SearchBar";
import Sidebar2 from "../MainBody/SideBar/Sidebar2";
import { CgHeart } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { FaHeart } from "react-icons/fa6";
import { BsBookmarkPlus } from "react-icons/bs";
import { FaBookmark } from "react-icons/fa6";

const DemoBookCard = () => {
  return (
    <div className="w-32 p-2 size-fit bg-gray-800 flex justify-center items-center ">
      <h1 className="text-white">pic unavailable</h1>
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
  const [bookmark,setbookmark]=useState(false);
  

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
    async function fetchbookmarkstatus(){
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
      } else {
        throw new Error("Failed to update favorite status");
      }
    } catch (error) {
      console.error("Error updating favorite status:", error.message);
    }
  };

  const togglebookmark=async ()=>{
    try {
      const method = toggle ? "DELETE" : "POST";
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
      } else {
        throw new Error("Failed to update favorite status");
      }
    } catch (error) {
      console.error("Error updating favorite status:", error.message);
    }
  }

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

  //if (bookInfo === null) return <ShimmerBookDetail />;
  return (
    <div className="bg-gray-700 pl-52  pb-10 flex min-h-screen">
      <Sidebar2 /> {/* Sidebar at the side */}
      <div className="flex flex-col flex-grow ml-6">
        <SearchBar />

        {bookInfo ? (
          <div className="flex flex-grow mt-6 mr-8">
            <div className=" p-8 bg-gray-500 rounded-2xl w-[80%]">
              <div className="flex">
                {bookInfo?.volumeInfo === null ? (
                  // <div className="w-[100px] mr-12 h-96 bg-gray-100"></div> //not working properly
                  <div className="w-72 h-[600px] mr-12 bg-red-500 z-10 flex justify-center items-center text-white text-center">
                    <h1>pic unavailable</h1>
                  </div>
                ) : (
                  <img
                    className="mr-12 w-72 size-fit "
                    src={
                      bookInfo?.volumeInfo?.imageLinks?.large ||
                      bookInfo?.volumeInfo?.imageLinks?.thumbnail ||
                      bookInfo?.volumeInfo?.imageLinks?.smallThumbnail
                    }
                    alt=""
                  />
                )}
                <div>
                  <div className=" text-5xl text-white font-bold">
                    {bookInfo.volumeInfo?.title}
                  </div>
                  <div className=" mt-4 text-2xl text-white font-bold">
                    {bookInfo.volumeInfo?.authors.join(", ")}
                  </div>
                  <div
                    className="text-4xl mt-6"
                    onClick={() => toggleFavorite()}
                  >
                    {toggle ? (
                      <FaHeart className="text-red-500" />
                    ) : (
                      <CgHeart />
                    )}
                  </div>
                </div>
                <div className=" flex flex-col">
                  <div
                    className="text-6xl  mr-4 -mt-10"
                    onClick={() => togglebookmark()}
                  >
                    {bookmark ? (
                      <FaBookmark className="text-white" />
                    ) : (
                      <BsBookmarkPlus />
                    )}
                  </div>
                  
                </div>
              </div>
              <div className=" flex flex-col overflow-y-scroll h-[230px] no-scrollbar mt-5 bg-gray-600 rounded-xl p-4">
                <div className=" text-white text-xl font-semibold border-b-2">
                  Description
                </div>
                <div className=" mt-4 text-base text-white">
                  {bookInfo.volumeInfo?.description
                    ? parse(bookInfo.volumeInfo?.description)
                    : null}
                </div>
              </div>
              {/* <Link to={"/book/preview/" + bookInfo.id}> */}
              <button
                className=" p-2 m-2 bg-blue-500 text-white font-semibold rounded-lg mt-6"
                onClick={toggleShowPreview}
              >
                {"See Preview"}
              </button>
              {/* </Link> */}
              {showPreview && (
                <div className="flex items-center justify-center">
                  <BookPreview2 bookId={bookInfo.id} show={ShowPreview} />
                </div>
              )}
            </div>
            <div className=" p-4 ml-5 max-h-[630px] bg-gray-500 rounded-2xl w-[20%] flex flex-col">
              <div className=" text-white text-2xl font-semibold mb-4 text-center">
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
      </div>
    </div>
  );
};

export default BookDetails;
