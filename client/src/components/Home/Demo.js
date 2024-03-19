import background from "../../assets/background.jpg";
import back2 from "../../assets/back2.webp";
import CountUp from "react-countup";
import book2 from "../../assets/book2.jpg";
import { Link } from "react-router-dom";
import { RxArrowTopRight } from "react-icons/rx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
const ReviewCard = ({ review }) => {
  // Assuming review.rating is a number from 1 to 5
  const renderStars = () => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className="text-yellow-500">
          {i <= review.rating ? "★" : "☆"}
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="w-60 h-56 bg-black text-white mb-7 ml-8 rounded-xl p-4 text-center flex flex-col">
      <div className="flex justify-around">
        <img
          src={review.logo}
          alt="Logo"
          className="w-20 h-20 mx-auto rounded-full"
        />
        <div className="flex justify-center mt-10">{renderStars()}</div>
      </div>

      <div className="text-xs mt-5 w-48 h-40 overflow-y-auto no-scrollbar">
        {review.content}
      </div>
    </div>
  );
};
const reviews = [
  {
    id: 1,
    author: "Author Name 1",
    rating: 3,
    logo: "https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?size=626&ext=jpg&ga=GA1.1.735520172.1710720000&semt=ais",
    content:
      "Revolutionary and intuitive, this app redefines the way we experience literature—truly a game-changer for book lovers everywhere.",
  },
  {
    id: 2,
    author: "Author Name 2",
    rating: 4,
    logo: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    content:
      "From the intuitive note-taking to the social sharing features, this app creates a vibrant community of readers and thinkers.",
  },
  {
    id: 3,
    author: "Author Name 3",
    rating: 5,
    logo: "https://parrotprint.com/media/wordpress/7630543941b44634748ddea65e5a417c.jpg",
    content:
      "Transforms reading from a solitary activity into a shared experience, enriching lives one page at a time.",
  },
  {
    id: 4,
    author: "Author Name 3",
    rating: 4,
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpRaRN3bQfwDgA_-j92-q2HOIMZgYAeyg1KU4uJwHJS0hY2VVJY8cyqRAIa-XIQlZJA0Q&usqp=CAU",
    content:
      "A digital haven for bibliophiles, offering instant access to a treasure trove of stories and insightful summaries.",
  },
  // Add more reviews as needed
];

const Demo = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768, // Adjust breakpoints as needed
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 },
      },
    ],
  };
  return (
    <div className="bg-gray-300 max-w-full min-h-full">
      <nav className="bg-white py-4 shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between">
            <div className="flex space-x-4">
              <div className="flex items-center text-gray-700  text-3xl font-bold">
                NarrAIve
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-1">
              <a
                href="#"
                className="py-5 px-3 text-gray-700 hover:text-gray-900"
              >
                About Us
              </a>
              <a
                href="#"
                className="py-2 px-3 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
              >
                Login
              </a>
            </div>
          </div>
        </div>
      </nav>
      {/* Wrapping the text and new div in separate containers */}
      <div className="flex justify-between mb-10">
        {/* Text container */}
        <div className="ml-36 flex-1 relative">
          <div className="text-[110px] z-10 mt-6">Reading is</div>
          <div className="text-[140px] -mt-8">Fascinating</div>
        </div>
        {/* Image and new div container */}
        <div className="flex-1 flex mt-14">
          <div
            className="w-52 h-[300px] -ml-20 object-cover"
            style={{ backgroundImage: `url(${background})` }}
          />
          <div className="ml-10 w- h-72 object-cover">
            <img
              src={back2}
              alt="Background"
              style={{
                Width: "70%",
                width: "75%",
                objectFit: "contain",
              }}
            />
          </div>
        </div>
      </div>
      {/* Additional content including the new div */}
      <div className="text-6xl font-bold text-orange-500 ml-44">
        <CountUp start={0} end={100} duration={3} delay={0} />+{" "}
        <span className="text-gray-600">Books</span>
      </div>
      {/* New div with fixed height */}
      <div className="mt-14 flex justify-around">
        <div
          className="w-96 h-72 mb-6 bg-cover rounded-2xl mt-12 ml-14"
          style={{ backgroundImage: `url(${book2})` }}
        >
          {/* Content inside the new div */}
        </div>
        <div className="-ml-10">
          <p className=" text-3xl text-orange-400 font-inria-sans border-b-2 border-red-400 ">
            Read it, feel it, live it—every story matters.{" "}
            {/* <hr className="w-[600px] text-black h-32"></hr> */}
          </p>
          <div className="w-[600px] mt-8 text-[17px]">
            Welcome to Read It, your ultimate destination for diving into the
            enchanting world of books. Our mission is to connect readers with a
            vast universe of stories, insights, and knowledge, transcending
            boundaries and bringing together a community passionate about
            literature. At Read It, we believe that every book has the power to
            inspire, transform, and enlighten. Whether you're seeking to escape
            into fantastical realms, uncover the mysteries of the past, or gain
            new perspectives on the world around you, our carefully curated
            collection promises a companion for every journey. Join us in
            celebrating the timeless magic of reading and discover your next
            great adventure with Read It
          </div>
        </div>
      </div>
      <div className="flex ">
        <div className=" flex-col w-[50%] text-black mt-44 ml-14">
          <p className="text-4xl text-orange-600 font-bold">
            LitSphere: Where Every Story Is Personal
          </p>
          <p className="text-lg mt-7 ml-24 text-red-900 font-semibold">
            Discover, Save, and Share Your Literary Journey
          </p>
        </div>
        <div className=" flex flex-wrap w-[50%] mb-10 mt-14">
          <div className="w-48 h-48 m-2 text-black text-xs p-3 text-center">
            <p className="text-lg font-bold">Chatty:</p>
            With features that allow for easy navigation through vast
            collections of books, personalized reading recommendations, and
            interactive tools to jot down thoughts or discuss insights with
            fellow readers.
          </div>
          <div className="w-48 h-48 m-2 bg-black text-white p-2 text-xs text-center">
            <p className="text-lg font-bold">Notes:</p>
            Our book reading application is enhanced with a sophisticated
            note-taking feature, allowing readers to capture their thoughts,
            reflections, and analyses directly within the app as they journey
            through each story.
          </div>
          <div className="w-48 h-48 m-2 p-2 text-xs text-center">
            <p className="text-lg font-bold">Share:</p>
            Our book reading application introduces a seamless feature allowing
            users to share their favorite books, insightful summaries, and
            personal notes directly through WhatsApp. This integration fosters a
            sense of community and connection among book lovers.
          </div>
          <div className="w-48 h-48 m-2 bg-black text-white p-2 text-center text-xs">
            <p className="text-lg font-bold">BookGPT:</p>
            The capability that empower readers by offering concise summaries of
            books before they dive into reading, helping them decide if a book
            aligns with their interests or current mood.It's perfect for those
            looking to save time or get a quick grasp of a book's main themes.
          </div>
          <div className="w-48 h-48 m-2 p-2 text-xs text-center">
            <p className="text-lg font-bold">Share:</p>
            The powerful search engine not only provides instant, relevant
            results but also incorporates a smart search history feature. This
            feature remembers users' past searches, making it incredibly easy
            for them to revisit previously explored topics or books.
          </div>
          <div className="w-48 h-48 m-2 bg-black text-white p-2 text-center text-xs">
            <p className="text-lg font-bold">Favourites:</p>
            Empowers you to create a personalized collection of the books that
            touch your soul, spark your curiosity, and inspire your next
            adventure. This feature is more than just a bookmark; it's your
            private library of favorites.
          </div>
        </div>
      </div>
      <div className=" flex justify-between mt-9">
        <div className="flex-col mt-8">
          <div className="w-[480px] h-9 bg-black mb-4 ml-3"></div>
          <div className="w-[320px] h-9 bg-black mb-4 ml-3"></div>
        </div>
        <div className="mt-20 text-lg  font-semibold ml-5">
          Start exploring the most unique website full of books, where every
          click unfolds a new chapter in your literary adventure.
          <button className=" w-full flex justify-center mb-9">
            <Link to="/Login">
              <div className="flex group items-center bg-red-400 px-4 py-2 mt-4 -mb-4 rounded-2xl text-xl font-semibold transition-transform duration-100 hover:scale-110">
                Get Started
                <RxArrowTopRight className="ml-2 w-[35px] h-[35px] text-white hover:text-white group-hover:rotate-45 duration-100" />
              </div>
            </Link>
          </button>
        </div>
        <div className="flex-col mt-8">
          <div className="w-[480px] h-9 bg-orange-400 mb-4 mr-3"></div>
          <div className="w-[320px] h-9 bg-orange-400 mb-4 ml-40"></div>
        </div>
      </div>
      <div className="w-full mt-8 h-60 flex flex-col p-7">
        <div className=" mx-auto">
          <div className="text-black text-3xl mb-6 text-center">
            Most Trending Books
          </div>
          <div className="flex flex-wrap ">
            <img
              src="/bestsellers/ikigai.jpg"
              alt="book1"
              className="w-48 h-64 m-2 rounded-lg"
            />
            <img
              src="./bestsellers/ikigai.jpg"
              alt="book1"
              className="w-48 h-64 m-2 rounded-lg"
            />
            <img
              src="/bestsellers/ikigai.jpg"
              alt="book1"
              className="w-48 h-64 m-2 rounded-lg"
            />
            <img
              src="./bestsellers/ikigai.jpg"
              alt="book1"
              className="w-48 h-64 m-2 rounded-lg"
            />
            <img
              src="/bestsellers/ikigai.jpg"
              alt="book1"
              className="w-48 h-64 m-2 rounded-lg"
            />
            <img
              src="./bestsellers/ikigai.jpg"
              alt="book1"
              className="w-48 h-64 m-2 rounded-lg"
            />
            <img
              src="./bestsellers/ikigai.jpg"
              alt="book1"
              className="w-48 h-64 m-2 rounded-lg"
            />
          </div>
        </div>
      </div>

      <div className="mt-40">
        <div className="text-center text-4xl font-serif font-semibold">
          Reviews
        </div>
        <div className=" flex items-center mt-8 ml-80">
          <div className="w-[840px]">
            {" "}
            {/* This div will control the width of the slider */}
            <Slider {...settings}>
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo;
