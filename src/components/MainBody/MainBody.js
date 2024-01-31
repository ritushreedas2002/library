import Sidebar from "./SideBar/Sidebar";

const MainBody = ({ onSignOut }) => {
  return (
    <>
      <Sidebar onSignOut={onSignOut} />
    </>
  );
};

export default MainBody;
