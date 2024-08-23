import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import FoundingStory from "../assets/Images/FoundingStory.png";
import BannerImage1 from "../assets/Images/aboutus1.webp";
import BannerImage2 from "../assets/Images/aboutus2.webp";
import BannerImage3 from "../assets/Images/aboutus3.webp";
import logo from "../assets/Logo/Logo-studyLoop.png";
import { TypeAnimation } from "react-type-animation";

import ContactFormSection from "../components/core/AboutPage/ContactFormSection";
import LearningGrid from "../components/core/AboutPage/LearningGrid";
import Quote from "../components/core/AboutPage/Quote";
import StatsComponenet from "../components/core/AboutPage/Stats";
import HighlightText from "../components/core/HomePage/HighlightText";
// import ReviewSlider from "../components/common/ReviewSlider";
import Footer from "../components/common/Footer";

const About = () => {
  return (
    <div>
      <section className="bg-richblack-700">
        <div className="relative flex items-center justify-center flex-wrap gap-6 text-white p-4">
          <div className="text-6xl hidden md:block lg:text-9xl sm:text-5xl font-bold transform  opacity-75">
            {"<"}
          </div>
          <img
            src={logo}
            alt="StudyLoop Logo"
            className="h-32 w-auto lg:h-48 lg:w-auto md:h-40 object-contain"
          />
          <div className="text-6xl lg:text-9xl hidden md:block font-bold transform  opacity-75">
            {"/>"}
          </div>
        </div>

        <div className=" flex flex-row gap-2 text-white my-14 justify-center">
          <div className="text-3xl lg:text-4xl font-bold text-center">
            Where we
          </div>

          <HighlightText
            text={
              <TypeAnimation
                sequence={[
                  "innovate",
                  2000,
                  "learn",
                  2000,
                  "excel",
                  2000,
                  "grow",
                  2000,
                  "succeed",
                  2000,
                ]}
                wrapper="div"
                cursor={true}
                repeat={Infinity}
                className="text-3xl lg:text-4xl font-bold text-center"
              />
            }
          ></HighlightText>
        </div>

        <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-center text-white">
          <header className="mx-auto pb-20 md:text-3xl sm:text-2xl lg:text-4xl font-semibold lg:w-[70%]">
            Revolutionizing <HighlightText text={"education"} /> with smart
            solutions and a supportive community.
            <p className="mx-auto mt-6 text-center text-base font-medium text-richblack-300 lg:w-[95%]">
              At StudyLoop, we're passionate about transforming education
              through technology. We believe in the power of knowledge and
              strive to make learning accessible, engaging, and personalized for
              everyone.
            </p>
          </header>
          <div className="sm:h-[70px] lg:h-[150px]"></div>
          <div className="absolute bottom-0 left-[50%] grid w-[100%] translate-x-[-50%] translate-y-[30%] grid-cols-3 gap-3 lg:gap-5">
            <img src={BannerImage1} alt="" />
            <img src={BannerImage2} alt="" />
            <img src={BannerImage3} alt="" />
          </div>
        </div>
      </section>

      <section className="border-b border-richblack-700">
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-richblack-500">
          <div className="h-[100px] "></div>
          <Quote />
        </div>
      </section>

      <section>
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-richblack-500">
          <div className="flex flex-col items-center lg:gap-10 lg:flex-row justify-between">
            <div className="my-24 flex lg:w-[40%] flex-col gap-10">
              <h1 className="bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] ">
                Our Vision
              </h1>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                Driven by this vision, we embarked on a journey to transform the
                landscape of e-learning. Our passionate team of experts devoted
                countless hours to crafting a powerful and user-friendly
                platform. By merging state-of-the-art technology with
                captivating content, we've created an environment that
                encourages dynamic and interactive learning.
              </p>
            </div>
            <div className="my-24 flex lg:w-[40%] flex-col gap-10">
              <h1 className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text text-4xl font-semibold lg:w-[70%] ">
                Our Mission
              </h1>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                Our mission goes beyond just delivering courses online. We
                wanted to create a vibrant community of learners, where
                individuals can connect, collaborate, and learn from one
                another. We believe that knowledge thrives in an environment of
                sharing and dialogue, and we foster this spirit of collaboration
                through forums, live sessions, and networking opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      <StatsComponenet />

      <div className="mx-auto flex max-w-maxContent flex-col items-center w-11/12 text-white justify-between font-inter border-b border-richblack-700">
        <div className="my-10  flex flex-col justify-between gap-7 lg:mt-20 lg:flex-row lg:gap-0">
          <div>
            <div className="lg:text-4xl text-3xl font-semibold lg:w-[100%]">
              Become an
              <HighlightText text={"Instructor"} />
            </div>

            <div>
              <Link to={"/signup"}>
                <div className="group  mt-7 w-fit rounded-full bg-richblack-800 p-1 font-bold text-richblack-200 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-95 hover:drop-shadow-none">
                  <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900">
                    <p>Teach with Us</p>
                    <FaArrowRight />
                  </div>
                </div>
              </Link>
            </div>
          </div>
          <div className="flex flex-col items-start gap-10 lg:w-[50%]">
            <div className="text-thin text-richblack-300">
              Ready to share your expertise and inspire others? Join our team of
              instructors and help shape the future of learning. Whether you're
              passionate about coding, tech, or any other field, we value your
              knowledge and enthusiasm. As an instructor, you'll have the
              opportunity to create engaging courses, interact with eager
              learners, and contribute to a dynamic educational community. Make
              an impact and turn your expertise into a valuable learning
              experience for others
            </div>
          </div>
        </div>
      </div>

      <section className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white">
        {/* <LearningGrid /> */}
        <ContactFormSection />
      </section>

      {/* <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white"> */}
      {/* Reviws from Other Learner */}
      {/* <h1 className="text-center text-4xl font-semibold mt-8"> */}
      {/* Reviews from other learners */}
      {/* </h1> */}
      {/* <ReviewSlider /> */}
      {/* <ReviewSlider /> */}
      {/* </div> */}
      {/* <Footer /> */}
      <Footer />
    </div>
  );
};

export default About;
