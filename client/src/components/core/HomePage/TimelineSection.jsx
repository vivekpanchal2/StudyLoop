import TimeLineImage from "../../../assets/Images/TimelineImage.png";
import { RiGraduationCapFill } from "react-icons/ri";
import { FaChalkboardTeacher, FaHandsHelping, FaBrain } from "react-icons/fa";

const TimeLine = [
  {
    Logo: FaChalkboardTeacher,
    Heading: "Leadership",
    Description: "Fully committed to the success company",
  },
  {
    Logo: RiGraduationCapFill,
    Heading: "Responsibility",
    Description: "Students will always be our top priority",
  },
  {
    Logo: FaHandsHelping,
    Heading: "Flexibility",
    Description: "The ability to switch is an important skill",
  },
  {
    Logo: FaBrain,
    Heading: "Solve the problem",
    Description: "Code your way to a solution",
  },
];

const TimelineSection = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-20 mb-20 items-center">
      <div className="lg:w-[45%] flex flex-col gap-14 lg:gap-3">
        {TimeLine.map((ele, i) => {
          const IconComponent = ele.Logo;
          return (
            <div className="flex flex-col lg:gap-3" key={i}>
              <div className="flex gap-6">
                <div className="w-[52px] h-[52px] bg-white rounded-full flex justify-center items-center shadow-lg">
                  <IconComponent className="text-2xl text-caribbeangreen-600 text-rose-500" />
                </div>
                <div>
                  <h2 className="font-semibold text-[18px]">{ele.Heading}</h2>
                  <p className="text-base">{ele.Description}</p>
                </div>
              </div>
              <div
                className={`hidden ${
                  TimeLine.length - 1 === i ? "hidden" : "lg:block"
                }  h-14 border-dotted border-r border-richblack-100 bg-richblack-400/0 w-[26px]`}
              ></div>
            </div>
          );
        })}
      </div>

      <div className="relative w-fit h-fit shadow-lg">
        <div className="absolute lg:left-[50%] lg:bottom-0 lg:translate-x-[-50%] lg:translate-y-[50%] bg-caribbeangreen-700 flex lg:flex-row flex-col text-white uppercase py-5 gap-4 lg:gap-0 lg:py-10">
          {/* Section 1 */}
          <div className="flex gap-5 items-center lg:border-r border-caribbeangreen-300 px-7 lg:px-14">
            <h1 className="text-3xl font-bold w-[75px]">10</h1>
            <h1 className="text-caribbeangreen-300 text-sm w-[75px]">
              Years experiences
            </h1>
          </div>

          {/* Section 2 */}
          <div className="flex gap-5 items-center lg:px-14 px-7">
            <h1 className="text-3xl font-bold w-[75px]">250</h1>
            <h1 className="text-caribbeangreen-300 text-sm w-[75px]">
              Types of courses
            </h1>
          </div>
        </div>
        <img
          src={TimeLineImage}
          alt="timelineImage"
          className="shadow-white shadow-[20px_20px_0px_0px] object-cover h-[400px] lg:h-fit"
        />
      </div>
    </div>
  );
};

export default TimelineSection;
