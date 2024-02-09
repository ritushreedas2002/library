import React, { useEffect, useState } from "react";
import useIndivBook from "../hooks/useIndivBook";
import { Link, useParams } from "react-router-dom";
import parse from "html-react-parser";
import BookPreview2 from "./BookPreview2";
//import useRelatedBooks from "../hooks/useRelatedBooks";
import ShimmerBookDetail from "../utils/Shimmer/ShimmerBookDetail";
import SearchBar from "../MainBody/SearchBar/SearchBar";
import Sidebar2 from "../MainBody/SideBar/Sidebar2";

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

const BookDetails = () => {
  const { bookid } = useParams();
  const bookInfo = useIndivBook(bookid);
  const [booklist, setBookList] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showPreview, setShowPreview] = useState(false);

  //console.log(bookInfo.volumeInfo);
  const category = bookInfo?.volumeInfo?.categories?.[0] ?? null;
  console.log(category);

  const toggleShowPreview = () => {
    setShowPreview(true);
  };
  const ShowPreview = () => {
    setShowPreview(false);
  };

  useEffect(() => {
    // Fetch related books only when the category is available
    if (category !== null) {
      // Call your useRelatedBooks hook here
      fetchBookDetail();
    }
  }, [category]);

  const fetchBookDetail = async () => {
    if (isLoading) {
      try {
        const response = await fetch(
          "https://www.googleapis.com/books/v1/volumes?q=" + category
        );
        const data = await response.json();
        console.log(data);
        setBookList(data?.items);
      } catch (error) {
        setError(error);
        console.error("Error fetching books:", error);
        setIsLoading(false);
      }
    }
  };
  console.log(booklist);

  if (bookInfo === null) return <ShimmerBookDetail />;
  //console.log(bookInfo.volumeInfo?.categories[0]);

  //const related = useRelatedBooks(bookInfo.volumeInfo?.categories[0]);
  return (
    <div className="bg-gray-700 pl-52  pb-10 flex">
      <Sidebar2 /> {/* Sidebar at the side */}
      <div className="flex flex-col flex-grow ml-6">
        <SearchBar />
        <div className="flex flex-grow mt-6 mr-11">
          <div className=" p-8 bg-gray-500 rounded-2xl w-[75%]">
            <div className="flex">
              {bookInfo?.volumeInfo === null ? (
                // <div className="w-[100px] mr-12 h-96 bg-gray-100"></div> //not working properly
                <div className="w-72 h-[600px] mr-12 bg-red-500 z-10 flex justify-center items-center text-white text-center">
                  <h1>pic unavailable</h1>
                </div>
              ) : (
                <img
                  className="mr-12 w-72 size-fit max-h-[400px]"
                  src={
                    bookInfo?.volumeInfo?.imageLinks?.small ||
                    bookInfo?.volumeInfo?.imageLinks?.thumbnail
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
              </div>
            </div>
            <div className=" flex flex-col overflow-y-scroll max-h-[230px] no-scrollbar mt-5 bg-gray-600 rounded-xl p-4">
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

            {/* <div className="w-[600px] h-[500px]">
          <Helmet>
            <script
              type="text/javascript"
              src="https://books.google.com/books/previewlib.js"
            ></script>
          </Helmet>
          <script type="text/javascript">
            GBS_insertEmbeddedViewer('ISBN:9781101514115',600,500);
          </script>
        </div> */}
          </div>
          <div className=" p-4 ml-5 max-h-[630px] bg-gray-500 rounded-2xl w-[22%] flex flex-col">
            <div className=" text-white text-2xl font-semibold mb-4 text-center">
              Related Books
            </div>
            <div className=" flex flex-col overflow-y-scroll max-h-[620px] no-scrollbar">
              {booklist?.map((book, index) => (
                <Link key={index} to={"/book/" + book.id}>
                  {/* link changing but page not updating */}
                  <MiniCard key={index} item={book} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
