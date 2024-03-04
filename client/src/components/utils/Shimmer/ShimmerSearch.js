
import React from 'react';


const ShimmerSearch = () => {
  const DemoCard = () => {
    return (
      <div className="w-48 h-48 m-2 bg-orange-300">
        {/* <h2>{book.volumeInfo.title}</h2> */}
      </div>
    );
  };

  // Assuming you want to repeat 5 times
  const repeatElements = Array(10).fill(0); // Creates an array with 5 elements, all are 0

  return (
    <div className="bg-amber-100 flex">
      <div>
        <div className="bg-amber-100 flex flex-wrap justify-start mt-4 ml-28">
          {repeatElements.map((_, index) => (
            <div key={index} className="flex w-96">
              <DemoCard />
              
              <div className="w-48 pt-3 mr-10">
                <div className="font-semibold mb-1 w-20 h-2 bg-gray-400"></div>
                <div className=" text-sm mb-1 w-16 h-2 bg-gray-400"></div>
               <div className="text-sm mb-1 w-10 h-2 bg-gray-400"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShimmerSearch;

