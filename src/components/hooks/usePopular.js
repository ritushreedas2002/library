// import {
//   RxCrop,
//   RxDesktop,
//   RxPencil2,
//   RxReader,
//   RxRocket,
//   RxAccessibility,
// } from "react-icons/rx";

// import SpaceCity1 from "../assets/SpaceCity1.jpg";
// import SpaceCity5 from "../assets/SpaceCity5.jpeg";
// import SpaceCity6 from "../assets/SpaceCity6.jpeg";
// import SpaceCity7 from "../assets/SpaceCity7.jpeg";
// import SpaceCity8 from "../assets/SpaceCity8.jpeg";
// import SpaceCity9 from "../assets/SpaceCity9.jpeg";
// import useBooks from "./useBooks";
import { useEffect, useState } from "react";

const usePopular = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBooks = async () => {
    if (isLoading) {
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=bestsellers&startIndex=0&maxResults=10&key=AIzaSyBd5eK6KC9hXwSK5Gqu86oJdxFcm-FLBVQ`
        );
        const data = await response.json();
        console.log(data);
        setBooks((prevBooks) => [...prevBooks, ...data.items]);

        // Stop fetching if 30 books are reached
        if (books.length > 6) {
          console.log("30 books received");
          setIsLoading(false);
          return;
        }
      } catch (error) {
        setError(error);
        console.error("Error fetching books:", error);
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return books;
};

export default usePopular;

// export const ServiceData = [
//   {
//     icon: RxCrop,
//     title: "Development",
//     content: "Lorem ipsum dolor sit /amet, consectetur adipiscing elit.",
//     backgroundImage: SpaceCity9,
//   },
//   {
//     icon: RxPencil2,
//     title: "Branding",
//     content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//     backgroundImage: SpaceCity1,
//   },
//   {
//     icon: RxDesktop,
//     title: "Design",
//     content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//     backgroundImage: SpaceCity6,
//   },
//   {
//     icon: RxReader,
//     title: "Seo",
//     content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//     backgroundImage: SpaceCity7,
//   },
//   {
//     icon: RxAccessibility,
//     title: "Management",
//     content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//     backgroundImage: SpaceCity5,
//   },
//   {
//     icon: RxRocket,
//     title: "Production",
//     content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//     backgroundImage: SpaceCity8,
//   },
// ];
