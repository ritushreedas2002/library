import Sidebar2 from "../../MainBody/SideBar/Sidebar2";

const ShimmerSearch = () => {
  const DemoCard = () => {
    return (
      <div className="w-48 h-48 m-2 bg-gray-400">
        {/* <h2>{book.volumeInfo.title}</h2> */}
      </div>
    );
  };
  return (
    <div>
      <div className=" bg-slate-600 flex flex-wrap justify-start pl-32 h-full">
        <DemoCard />
        <DemoCard />
        <DemoCard />
        <DemoCard />
        <DemoCard />
        <DemoCard />
        <DemoCard />
        <DemoCard />
        <DemoCard />
        <DemoCard />
        <DemoCard />
        <DemoCard />
        <DemoCard />
        <DemoCard />
        <DemoCard />
      </div>
    </div>
  );
};
export default ShimmerSearch;
