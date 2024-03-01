import Body from "./Body";
import Navbar from "./Navbar";

const MainContainer = () => {
  return (
    <div
      className="flex flex-col justify-center h-screen p-4"
      style={{
        backgroundImage:
          "linear-gradient(90deg, rgba(239,219,26,1) 0%, rgba(245,236,139,1) 52%, rgba(239,241,204,1) 100%, rgba(159,184,88,1) 100%)",
      }}
    >
      <Navbar />
      <Body />
    </div>
  );
};
export default MainContainer;
