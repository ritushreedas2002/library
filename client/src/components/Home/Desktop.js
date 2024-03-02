import { RxArrowTopRight } from "react-icons/rx";
import { Link } from "react-router-dom";

const Desktop = () => {
  return (
    <div
      className="relative w-screen h-screen overflow-hidden bg-cover bg-no-repeat bg-top text-white font-inter"
      style={{ backgroundImage: "url('/images/library.jpg')" }}
    >
      <div className=" flex flex-col h-full justify-center items-center ">
        <div
          className=" p-14 pt-8 rounded-3xl  opacity-90 "
          style={{ backdropFilter: "blur(8px)" }}
        >
          <div className="text-[100px] text-center m-0">READ IT</div>
          <div className=" text-3xl ">
            Read it; feel it, live it—every story matters.
          </div>

          <button className=" w-full flex justify-center">
            <Link to="/Login">
              <div className="flex group items-center bg-blue-500 px-4 py-2 mt-4 -mb-4 rounded-2xl text-xl font-semibold transition-transform duration-100 hover:scale-110">
                Get Started
                <RxArrowTopRight className="ml-2 w-[35px] h-[35px] text-white hover:text-white group-hover:rotate-45 duration-100" />
              </div>
            </Link>
          </button>
        </div>
      </div>

      {/* Blur effect div */}
      <div
        className="absolute top-0 left-0 w-full flex justify-end h-[70px] opacity-79"
        style={{ backdropFilter: "blur(8px)" }}
      >
        {/* Buttons */}
        <button className="cursor-pointer rounded-full w-[155px] h-[67px] text-[22px] font-inter text-gray text-cente text-white">
          About Us
        </button>
        <Link to="/Login">
          <button className="cursor-pointer rounded-full w-[155px] h-[67px] text-[22px] font-inter text-gray text-center">
            Login
          </button>
        </Link>
      </div>

      {/* Image container */}
      {/* <div className="absolute top-[230px] left-[300px] w-[865px] h-[391px] bg-gainsboro">
    <img
      className="w-full h-full object-cover rounded-lg"
      alt=""
      src="/images/pexels.jpg"
    />
  </div> */}
    </div>
  );
};

export default Desktop;
