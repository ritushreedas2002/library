import Sidebar2 from "../../MainBody/SideBar/Sidebar2";

const ShimmerBookDetail = () => {
  const MiniCard = () => {
    return (
      <div className="pt-2 pb-2 flex border-b-2 bg-gray-700 w-56 h-28 mb-11"></div>
    );
  };
  return (
    <div className="bg-gray-700 pl-52 pt-10 pb-10  flex">
      <Sidebar2 /> 
      <div className=" p-8  bg-gray-500 rounded-2xl w-[75%]">
        <div className="flex">
          <div className="w-72 h-96 mr-12 bg-gray-700 z-10 flex justify-center items-center"></div>
          <div></div>
        </div>
        <div className=" flex flex-col overflow-y-scroll h-[230px] no-scrollbar mt-5 bg-gray-600 rounded-xl p-4">
          <div className=" text-white text-xl font-semibold border-b-2">
            Description
          </div>
        </div>
      </div>
      <div className=" p-4 ml-5 bg-gray-500 rounded-2xl w-[22%] flex flex-col">
        <div className=" text-white text-2xl font-semibold mb-4 text-center">
          Related Books
        </div>
        <div className=" flex flex-col overflow-y-scroll h-[620px] no-scrollbar">
          <MiniCard />
          <MiniCard />
          <MiniCard />
          <MiniCard />
          <MiniCard/>
        </div>
      </div>
    </div>
  );
};

export default ShimmerBookDetail;
