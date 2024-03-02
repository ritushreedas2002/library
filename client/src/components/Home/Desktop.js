const Desktop = () => {
  return (
    // <div
    //   className="w-[1518px] h-[800px] overflow-hidden bg-cover bg-no-repeat bg-top text-left text-[100px] text-white font-inter"
    //   style={{ backgroundImage: "url('/images/desktop--1@3x.png')" }}
    // >
    //   <div className="absolute top-[100px] left-[570px] inline-block w-[431px] h-24">
    //     <p className="m-0">READ IT</p>
    //   </div>
    //   <div className="absolute top-[210px] left-[336px] text-[40px] inline-block w-[900px]">
    //     Read it; feel it, live it—every story matters.
    //   </div>
    //   <div
    //     className="h-[70px] bg-yellow-100"
    //     style={{ opacity: 0.79, backdropFilter: "blur(8px)" }}
    //   >
    //       <button className="cursor-pointer [border:none] p-0 bg-palegoldenrod absolute top-[0px] left-[0px] rounded-11xl w-[155px] h-[67px]" />
    //       <div className="absolute top-[11.8px] left-[29.2px] text-[22px] font-inter text-gray text-center inline-block w-[89px]">
    //         Contact Us
    //       </div>
    //     </button>
        
    //       <button className="cursor-pointer [border:none] p-0 bg-palegoldenrod absolute top-[0px] left-[0px] rounded-11xl w-[155px] h-[67px]" />
    //       <div className="absolute top-[14px] left-[33px] text-[28px] font-inter text-gray text-center inline-block w-[89px]">
    //         <p className="m-0">Login</p>
    //       </div>
    //     </button>
    //   </div>
    //   <div className="absolute top-[330px] left-[300px] w-[865px] h-[391px]">
    //     <div className="absolute top-[0px] left-[0px] bg-gainsboro w-[865px] h-[391px]" />
    //     <img
    //       className="absolute top-[0px] left-[0px] w-[865px] h-[391px] object-cover"
    //       alt=""
    //       src="/images/unsplashcxypfveiuis@2x.png"
    //     />
    //   </div>
    // </div>
    <div
  className="relative w-[1518px] h-[800px] overflow-hidden bg-cover bg-no-repeat bg-top text-white font-inter"
  style={{ backgroundImage: "url('/images/desktop--1@3x.png')" }}
>
  <div className="absolute top-[100px] left-[570px] w-[431px] h-24">
    <p className="text-[100px] m-0">READ IT</p>
  </div>
  <div className="absolute top-[210px] left-[336px] text-[40px] w-[900px]">
    Read it; feel it, live it—every story matters.
  </div>
  
  {/* Blur effect div */}
  <div
    className="absolute top-0 left-0 w-full h-[70px] bg-yellow-100 opacity-79"
    style={{ backdropFilter: "blur(8px)" }}
  >
    {/* Buttons */}
    <button className="cursor-pointer rounded-full w-[155px] h-[67px] text-[22px] font-inter text-gray text-center bg-black text-white">
      Contact Us
    </button>
    
    <button className="cursor-pointer bg-palegoldenrod absolute top-[0px] left-[200px] rounded-full w-[155px] h-[67px] text-[22px] font-inter text-gray text-center">
      Login
    </button>
  </div>
  
  {/* Image container */}
  <div className="absolute top-[330px] left-[300px] w-[865px] h-[391px] bg-gainsboro">
    <img
      className="w-full h-full object-cover"
      alt=""
      src="/images/unsplashcxypfveiuis@2x.png"
    />
  </div>
</div>

  );
};

export default Desktop;
