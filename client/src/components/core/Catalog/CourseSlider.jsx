import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import {
  Autoplay,
  FreeMode,
  Navigation,
  Pagination,
  Mousewheel,
  Keyboard,
} from "swiper/modules";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import CatalogCard from "./CatalogCard";

const CourseSlider = ({ Courses }) => {
  return (
    <>
      {Courses?.length ? (
        <Swiper
          mousewheel={{ enabled: true, forceToAxis: true }}
          keyboard={{ enabled: true, onlyInViewport: true }}
          slidesPerView={1}
          loop={false}
          spaceBetween={20}
          pagination={{ clickable: true }}
          modules={[
            Pagination,
            Navigation,
            FreeMode,
            Mousewheel,
            Keyboard,
            Autoplay,
          ]}
          className="mySwiper md:pt-5"
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          style={{ "--swiper-navigation-size": "20px" }}
          freeMode={true}
          navigation={true}
          breakpoints={{
            300: { slidesPerView: 2.1, spaceBetween: 10 },
            640: { slidesPerView: 2.2 },
            1024: { slidesPerView: 3.1 },
          }}
        >
          {Courses.map((course) => (
            <SwiperSlide key={course._id}>
              <CatalogCard course={course} Height={"lg:h-[250px] h-[100px]"} />
            </SwiperSlide>
          ))}
          <div className="swiper-button-next"></div>
          <div className="swiper-button-prev"></div>
        </Swiper>
      ) : (
        <div className="flex gap-4 overflow-hidden">
          {[...Array(3)].map((_, index) => (
            <SkeletonTheme
              key={index}
              baseColor="#2C333F"
              highlightColor="#161D29"
            >
              <div>
                <Skeleton className="md:h-[200px] lg:w-[400px] h-[100px] w-[200px] rounded-xl" />
                <Skeleton className="md:h-[20px] w-[70px] rounded-md" />
                <Skeleton className="md:h-[20px] md:w-[400px] rounded-md" />
                <Skeleton className="md:h-[20px] md:w-[400px] rounded-md" />
              </div>
            </SkeletonTheme>
          ))}
        </div>
      )}
    </>
  );
};

export default CourseSlider;
