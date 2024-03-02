
const FrameE = () => {
    return (
      <section className="w-[1272px] flex flex-row items-start justify-center max-w-full shrink-0 text-left text-81xl text-snow font-inter">
        <div className="w-[936px] flex flex-col items-start justify-start gap-[40px_0px] max-w-full mq750:gap-[40px_0px]">
          <div className="self-stretch flex flex-row items-start justify-start py-0 pr-0 pl-9 box-border max-w-full">
            <div className="flex-1 flex flex-col items-center justify-start gap-[34px_0px] max-w-full mq450:gap-[34px_0px]">
              <h1 className="m-0 w-[431px] h-24 relative text-inherit font-normal font-inherit inline-block shrink-0 max-w-full mq450:text-11xl mq1050:text-31xl">
                <p className="m-0">READ IT</p>
              </h1>
              <h3 className="m-0 self-stretch relative text-21xl font-normal font-inherit mq450:text-5xl mq1050:text-13xl">
                Read it; feel it, live it—every story matters.
              </h3>
            </div>
          </div>
          <div className="w-[865px] bg-gainsboro flex flex-row items-center justify-center max-w-full">
            <div className="self-stretch w-[865px] relative bg-gainsboro hidden max-w-full" />
            <img
              className="h-[391px] flex-1 relative max-w-full overflow-hidden object-cover z-[1]"
              loading="lazy"
              alt=""
              src="/mini.png"
            />
          </div>
        </div>
      </section>
    );
  };
  
  export default FrameE;