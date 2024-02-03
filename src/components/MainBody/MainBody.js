import { useState } from "react";
import BookSearch from "../utils/BookSearch";
import Sidebar from "./SideBar/Sidebar";
import Test from "./Test";
import SearchBar from "./SearchBar";

const MainBody = ({ onSignOut }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const [clicked, setClicked] = useState(false);

  const width = clicked ? 200 : 80;
  console.log(width);

  return (
    <div className="h-screen flex bg-[#6c34af]">
      <div className="h-full bg-[#6c34af] w-[10%]">
        {/* <div
          onClick={() => setClicked(!clicked)}
          className={`h-full w-[10%] bg-blue-400 transition-all duration-500 `}
          style={{  position: "fixed" }}
          // style={{
          //   width: `${width}px`,
          //   height: "550px",
          //   backgroundColor: "lightblue",
          //   transition: "width 0.5s",
          // }}
        >
          Click me
        </div> */}
        <Sidebar
          onSignOut={onSignOut}
          isOpen={sidebarOpen}
          toggleSidebar={toggleSidebar}
        />
      </div>

      <div
        className="  bg-[#6c34af] w-[90%] "
        //className={`content ${
        //   sidebarOpen ? "slider-back" : ""
        // }${sidebarOpen ? "ml-30" : ""}`}
      >
        <SearchBar />
        <div className="">
          <Test />
        </div>

        <BookSearch />
      </div>
    </div>
  );
};

export default MainBody;
