// Carousel.js
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import {
  Navigation,
  Pagination,
  EffectFade,
  Autoplay,
  FreeMode,
  EffectCoverflow,
} from "swiper/modules";
import "swiper/swiper-bundle.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/free-mode";
// import "swiper/css/effect-coverflow";

import { RxArrowTopRight } from "react-icons/rx";
import usePopular from "../hooks/usePopular";
import { useNavigate } from "react-router-dom";

// Install Swiper modules
SwiperCore.use([
  Navigation,
  Pagination,
  EffectFade,
  FreeMode,
  EffectCoverflow,
  Autoplay,
]);

const Test = () => {
  const popular = usePopular();
  console.log(popular);
  const navigate = useNavigate();
  const handleNavigate = (itemId) => {
    navigate(`/book/${itemId}`);
  };

  return (
    <div className="flex w-full items-center justify-center pt-32  flex-col h-[600px]">
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        breakpoints={{
          340: {
            // slidesPerView: 1,
            // spaceBetween: 15,
            effect: "coverflow",
            coverflowEffect: {
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              // slideShadows: true,
            },
          },
          // 640: {
          //   // slidesPerView: 2,
          //   // spaceBetween: 15,
          //   effect: "coverflow",
          //   coverflowEffect: {
          //     rotate: 50,
          //     stretch: 0,
          //     depth: 100,
          //     modifier: 1,
          //     slideShadows: false,
          //   },
          // },
          640: {
            slidesPerView: 3,
            // spaceBetween: 15,
            effect: "coverflow",
            coverflowEffect: {
              rotate: 0,
              stretch: 50,
              depth: 100,
              modifier: 2.5,
              slideShadows: false,
            },
          },
          1024: {
            slidesPerView: 3,
            // spaceBetween: 15,
            effect: "coverflow",
            coverflowEffect: {
              rotate: 0,
              stretch: 50,
              depth: 40,
              modifier: 4.5,
              slideShadows: false,
            },
          },
        }}
        loop={true}
        //autoplay={{ delay: 1000 }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        //freeMode={true}
        pagination={{
          // el: ".swiper-pagination",
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="max-w-[100%] mySwiper -mt-12 ml-10"
        /*lg:max-w-[80%]*/
      >
        {popular.map((item) => (
          <SwiperSlide key={item.id} onClick={() => handleNavigate(item.id)}>
            <div className="flex flex-col gap-6 mb-20 group relative shadow-none text-white rounded-xl px-6 py-8 h-[250px] w-[30%] lg:h-[400px] lg:w-[350px] overflow-hidden cursor-pointer ml-20">
              <div
                className=" absolute inset-0 bg-cover"
                style={{
                  backgroundImage: `url(${item.volumeInfo?.imageLinks?.thumbnail})`,
                }}
              />
              <div className="absolute inset-0 bg-black opacity-10 group-hover:opacity-50" />
              <RxArrowTopRight className="absolute bottom-5 left-5 w-[35px] h-[35px] text-white group-hover:text-blue-500 group-hover:rotate-45 duration-100" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* <div className="swiper-button-next" />
      <div className="swiper-button-prev" /> */}
    </div>
  );
};

export default Test;
