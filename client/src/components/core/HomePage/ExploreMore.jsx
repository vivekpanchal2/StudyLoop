import React, { useEffect, useState } from "react";
import { HomePageExplore } from "../../../data/homepage-explore";

import CourseCard from "./CourseCard";
import HighlightText from "./HighlightText";

export default function ExploreMore() {
  const [currentTab, setCurrentTab] = useState(HomePageExplore[0].tag);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(courses[0].heading);

  const handleTabChange = (tag) => {
    setCurrentTab(tag);
    const result = HomePageExplore.filter((course) => course.tag === tag);

    setCourses(result[0].courses);
    setCurrentCard(result[0].courses[0].heading);
  };

  return (
    <div className="w-full px-4">
      {/* Explore more section */}
      <div>
        <div className="text-4xl md:text-4xl font-semibold text-center my-10">
          Unlock the
          <HighlightText text={"Power of Code"} />
          <p className="text-center text-richblack-300 text-base md:text-lg font-semibold mt-1">
            Learn to Build Anything You Can Imagine
          </p>
        </div>
      </div>

      <div className="hidden lg:flex gap-5 mt-5 mx-auto w-max bg-richblack-800 text-richblack-200 p-1 rounded-full font-medium drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]">
        {HomePageExplore.map((Topic, index) => {
          return (
            <div
              className={`text-[16px] flex flex-row items-center gap-2 
                ${
                  currentTab === Topic.tag
                    ? "bg-richblack-900 text-richblack-5 font-medium"
                    : "text-richblack-200"
                } px-7 py-[7px] rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5`}
              onClick={() => handleTabChange(Topic.tag)}
            >
              {Topic.tag}
            </div>
          );
        })}
      </div>

      <div className=" gap-10 justify-center lg:gap-0 flex lg:justify-between flex-wrap w-full  text-black  px-3 mt-10">
        {courses.map((ele, index) => {
          return (
            <CourseCard
              key={index}
              cardData={ele}
              currentCard={currentCard}
              setCurrentCard={setCurrentCard}
            />
          );
        })}
      </div>
    </div>
  );
}
