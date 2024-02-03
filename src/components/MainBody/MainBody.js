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

  return (
    <>
      <Sidebar
        onSignOut={onSignOut}
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      <SearchBar />
      <div
        className="ml-20 bg-[#6c34af]"
        //className={`content ${
        //   sidebarOpen ? "slider-back" : ""
        // }${sidebarOpen ? "ml-30" : ""}`}
      >
        <Test />
        <BookSearch />
      </div>
    </>
  );
};

export default MainBody;