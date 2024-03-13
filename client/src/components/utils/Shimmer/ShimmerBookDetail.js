

const ShimmerBookDetail = () => {
  const MiniCard = () => {
    return (
      <div className="flex">

      
      <div className="pt-2 pb-2 flex border-b-2 bg-orange-100 w-28 h-28 mb-11"></div>
      <div>
          <div className="w-20 h-3 bg-slate-500 ml-3 animate-pulse"></div>
          <div className="w-16 h-2 bg-slate-500 ml-5 mt-3 animate-pulse"></div>
      </div>
      </div>
    );
  };
  return (
    <div className="flex flex-grow mt-6 mr-8 bg-amber-100">
      <div className=" p-8  bg-orange-300 rounded-2xl w-[80%]">
        <div className="flex">
          <div className="w-72 h-96 mr-12 z-10 flex justify-center  bg-orange-100 items-center"></div>
          <div>
          <div className="w-40 h-4 bg-slate-500 ml-3"></div>
          <div className="w-32 h-2 bg-slate-500 ml-5 mt-3"></div>
          </div>
        </div>
        <div className=" flex flex-col overflow-y-scroll h-[230px] no-scrollbar mt-5 bg-orange-100 rounded-xl p-4">
          <div className=" text-white text-xl font-semibold border-b-2">
            Description
          </div>
        </div>
      </div>
      <div className=" p-4 ml-5 max-h-[630px] bg-orange-300 rounded-2xl w-[20%] flex flex-col">
        <div className=" text-white text-2xl font-semibold mb-4 text-center">
          Related Books
        </div>
        <div className=" flex flex-col overflow-y-scroll h-[620px] no-scrollbar">
          <MiniCard />
          <MiniCard />
          <MiniCard />
          <MiniCard />
          <MiniCard />
        </div>
      </div>
    </div>
  );
};

export default ShimmerBookDetail;
