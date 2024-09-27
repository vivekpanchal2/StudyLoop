import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import HighlightText from "../components/core/HomePage/HighlightText";
import CTAbutton from "../components/core/HomePage/CTAbutton";
import Banner from "../assets/Images/homeBanner.png";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import TimelineSection from "../components/core/HomePage/TimelineSection";
import Footer from "../components/common/Footer.jsx";
import { TypeAnimation } from "react-type-animation";
import ExploreMore from "../components/core/HomePage/ExploreMore.jsx";
import ReviewSlider from "../components/common/ReviewSlider.jsx";

function Home() {
  return (
    <div>
      <div className=" relative mx-auto flex max-w-maxContent flex-col items-center w-11/12   text-white justify-between font-inter">
        <h1 className="lg:text-4xl md:text-3xl text-2xl  font-bold text-center mt-20 mb-5 ">
          <>
            Learn{" "}
            <TypeAnimation
              sequence={[
                "JavaScript",
                2000,
                "Python",
                2000,
                "AI-ML",
                2000,
                "React",
                2000,
                "Node.js",
                2000,
                "SQL",
                2000,
                "Docker",
                2000,
              ]}
              wrapper="span"
              cursor={true}
              repeat={Infinity}
              className="text-blue-600"
            />{" "}
          </>
          <>with StudyLoop!</>
        </h1>

        <div className="flex flex-col-reverse lg:flex-row my-5">
          <div className="lg:w-[55%] flex flex-col  justify-center lg:px-0">
            <div className="text-3xl font-bold text mt-10">
              <HighlightText text={"StudyLoop "} />
              Learning Beyond Limits
            </div>
            <div className="mt-3 text text-lg font-light text-richblack-300 w-[80%]">
              "Welcome to StudyLoop, your go-to platform for coding and tech
              learning. Whether you're starting out or refining your skills, our
              interactive courses and hands-on projects will help you grow. Join
              a community of learners and take your coding journey to the next
              level with StudyLoop!"
            </div>

            <div className="flex flex-col lg:flex-row gap-7 mt-10">
              <CTAbutton active={true} linkTo={"/signup"}>
                Learn More
              </CTAbutton>
              <CTAbutton active={false} linkTo={"/login"}>
                Book demo
              </CTAbutton>
            </div>
          </div>
          <div className="lg:w-[40%] flex justify-center items-center px-4 lg:px-0">
            <img
              src={Banner}
              alt="StudyLoop Banner"
              className="lg:w-full w-[70%]   h-auto"
            />
          </div>
        </div>
      </div>

      {/* section-2 */}

      <div className="relative mx-auto my-10 flex max-w-screen-xl flex-col items-center w-11/12 text-white justify-between font-inter">
        <ExploreMore />
        {/* Explore Full Catagory Section */}

        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 px-4 mt-10">
          <div className="flex flex-col lg:flex-row  gap-7 text-white lg:mt-14">
            <CTAbutton active={true} linkto={"/signup"}>
              <div className="flex items-center gap-2">
                Explore Full Catalog
                <FaArrowRight />
              </div>
            </CTAbutton>
            <CTAbutton active={false} linkto={"/login"}>
              Learn More
            </CTAbutton>
          </div>
        </div>
      </div>

      {/* section-3 */}

      <div className="relative mx-auto flex max-w-maxContent flex-col items-center w-11/12 text-white justify-between font-inter lg:mb-0 mb-20">
        <div>
          <CodeBlocks
            position={"lg:flex-row-reverse flex-col-reverse"}
            heading={
              <div className="w-[100%] lg:text-4xl text-3xl font-semibold lg:w-[100%]">
                Jumpstart Your
                <HighlightText text={"Coding Journey"} />
              </div>
            }
            subheading={
              "Jump into coding right away! Our interactive learning platform ensures you’ll be writing real code from the very first lesson. Experience hands-on learning that helps you grasp programming concepts quickly and effectively. Get started now and see how easy it is to dive into coding with StudyLoop!"
            }
            ctabtn1={{
              btnText: "Continue Lesson",
              link: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              link: "/signup",
              active: false,
            }}
            codeColor={"text-white"}
            codeblock={`import React from "react";\n import CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
            backgroundGradient={<div className="codeblock absolute"></div>}
          />
        </div>
      </div>

      {/* section-3 */}

      <div className="relative mx-auto flex max-w-maxContent flex-col items-center w-11/12 text-white justify-between font-inter">
        <div className="mb-10 mt-[-100px] flex flex-col justify-between gap-7 lg:mt-20 lg:flex-row lg:gap-0">
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

      <div className="bg-richblack-900 text-white my-24 ">
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8">
          <div className="text-4xl font-bold text-center my-10">
            Unlock <HighlightText text={"Skills "} />
            for the Jobs of
            <HighlightText text={"Tomorrow"} />
          </div>
          <TimelineSection />
        </div>
      </div>

      <div className="mt-14 w-11/12 mx-auto max-w-maxContent flex-col items-center justify-between gap-8 first-letter bg-richblack-900 text-white">
        <h1 className="text-center text-3xl lg:text-4xl font-semibold mt-8 flex justify-center items-center gap-x-3">
          Reviews from other learners{" "}
        </h1>
        <ReviewSlider />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
