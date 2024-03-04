import BookSearch from "../Books/BookSearch";
import JoyRide from "react-joyride";
import Test from "./Test";
import SearchBar from "./SearchBar/SearchBar";
import Sidebar2 from "./SideBar/Sidebar2";
import { steps } from "../utils/constantsJoy";
import UserLogo from "../User/UserLogo";
import Chatbot from "../chatbot/Chatbot";
import Footer from "../Footer/Footer";


const MainBody = ({ onSignOut }) => {
  return (
    <div className="min-h-screen flex bg-[#6c34af] ">
      <div className="h-full bg-[#6c34af] w-[13%] " >
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
        <Sidebar2 /*onSignOut={onSignOut}*/ />
      </div>

      <div className="bg-[#a673e1] w-[87%] " id="search">
        <SearchBar />
        <Test />
        <Chatbot/>
        
        <div className="bg-[#a673e1]"> <BookSearch /></div>
        
      </div>
      <JoyRide
        continuous
        hideCloseButton
        scrollToFirstStep
        showProgress
        showSkipButton
        steps={steps}
      />
    </div>
  );
};

export default MainBody;
