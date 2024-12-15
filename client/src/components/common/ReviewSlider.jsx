import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import Img from "./Img";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import { FaStar } from "react-icons/fa";

import { apiConnector } from "../../services/apiconnector";
import { ratingsEndpoints } from "../../services/apis";

function ReviewSlider() {
  const [reviews, setReviews] = useState(null);
  const truncateWords = 15;

  useEffect(() => {
    (async () => {
      const response = await apiConnector(
        "GET",
        ratingsEndpoints.REVIEWS_DETAILS_API
      );

      if (response.data) {
        setReviews(response.data.allReviews);
      }
    })();
  }, []);

  const Shimmer = () => (
    <div className="flex flex-col gap-3 bg-richblack-800 p-3 text-[14px] text-richblack-25 min-h-[180px] max-h-[180px] glass-bg animate-pulse">
      <div className="flex items-center gap-4">
        <div className="h-9 w-9 rounded-full bg-gray-700"></div>
        <div className="flex flex-col gap-1 w-full">
          <div className="h-4 w-2/3 bg-gray-700 rounded"></div>
          <div className="h-3 w-1/3 bg-gray-600 rounded"></div>
        </div>
      </div>
      <div className="h-4 w-full bg-gray-700 rounded mt-2"></div>
      <div className="h-4 w-5/6 bg-gray-600 rounded"></div>
      <div className="h-4 w-2/3 bg-gray-700 rounded"></div>
      <div className="flex items-center gap-2 mt-2">
        <div className="h-4 w-6 bg-gray-700 rounded"></div>
        <div className="h-4 w-20 bg-gray-600 rounded"></div>
      </div>
    </div>
  );

  return (
    <div className="text-white">
      <div className="my-[50px] h-[184px] max-w-maxContentTab lg:max-w-maxContent">
        {reviews ? (
          <Swiper
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
            spaceBetween={25}
            loop={true}
            freeMode={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            className="w-full"
          >
            {reviews.map((review, i) => (
              <SwiperSlide key={i}>
                <div className="flex flex-col gap-3 bg-richblack-800 p-3 text-[14px] text-richblack-25 min-h-[180px] max-h-[180px] glass-bg">
                  <div className="flex items-center gap-4">
                    <Img
                      src={
                        review?.user?.image
                          ? review?.user?.image
                          : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                      }
                      alt=""
                      className="h-9 w-9 rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                      <h1 className="font-semibold text-richblack-5 capitalize">{`${review?.user?.firstName} ${review?.user?.lastName}`}</h1>
                      <h2 className="text-[12px] font-medium text-richblack-500">
                        {review?.course?.courseName}
                      </h2>
                    </div>
                  </div>
                  <p className="font-medium text-richblack-25">
                    {review?.review.split(" ").length > truncateWords
                      ? `${review?.review
                          .split(" ")
                          .slice(0, truncateWords)
                          .join(" ")} ...`
                      : `${review?.review}`}
                  </p>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-yellow-100">
                      {review.rating}
                    </h3>
                    <ReactStars
                      count={5}
                      value={parseInt(review.rating)}
                      size={20}
                      edit={false}
                      activeColor="#ffd700"
                      emptyIcon={<FaStar />}
                      fullIcon={<FaStar />}
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <Shimmer key={i} />
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ReviewSlider;
