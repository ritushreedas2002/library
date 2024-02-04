// import { useEffect, useState } from "react";
// import BookSearch from "../utils/BookSearch";
// import Sidebar from "./SideBar/Sidebar";
// import Test from "./Test";
// import SearchBar from "./SearchBar";
// import GrayBox from "./SideBar/GrayBox";
// import { auth } from "../utils/Firebase";

// const MainBody = ({ onSignOut }) => {
//   const [sidebarOpen, setSidebarOpen] = useState(true);

  

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   return (
//     <>
//       <div className="bg-[#6c34af] flex">
        
//         <div className="w-[250px] z-150 relative">
//           {/* <Sidebar
//             onSignOut={onSignOut}
//             isOpen={sidebarOpen}
//             toggleSidebar={toggleSidebar}
//           /> */}
//           <GrayBox/>
//         </div>
//         <div
//           className=" ml-10  relative w-full "
//           //className={`content ${
//           //   sidebarOpen ? "slider-back" : ""
//           // }${sidebarOpen ? "ml-30" : ""}`}
//         >
//           <SearchBar />
//           <Test />
//           <BookSearch />
//         </div>
      
//       </div>
//     </>
//   );
// };

// export default MainBody;

import { useState } from "react";
import BookSearch from "../utils/BookSearch";
import Sidebar from "./SideBar/Sidebar";
import Test from "./Test";
import SearchBar from "./SearchBar";
import Sidebar2 from "./SideBar/Sidebar2";

const MainBody = ({ onSignOut }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const [clicked, setClicked] = useState(false);

  const width = clicked ? 200 : 80;
  console.log(width);

  return (
    <div className="h-screen flex bg-[#6c34af] ">
      <div className="h-full bg-[#6c34af] w-[13%]">
        {/* <div
          onClick={() => setClicked(!clicked)}
          className={`h-full w-[13%] bg-blue-400 transition-all duration-500 `}
          style={{  position: "fixed" }}
          // style={{
          //   width: ${width}px,
          //   height: "550px",
          //   backgroundColor: "lightblue",
          //   transition: "width 0.5s",
          // }}
        >
          Click me
        </div> */}
        {/* <Sidebar
          onSignOut={onSignOut}
          isOpen={sidebarOpen}
          toggleSidebar={toggleSidebar}
        /> */}
        <Sidebar2/>
      </div>

      <div
        className="  bg-[#6c34af] w-[87%] "
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