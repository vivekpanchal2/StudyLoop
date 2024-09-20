import { useSelector } from "react-redux";
import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm";
import CourseInformationForm from "./CourseInformation/CourseInformationForm";
import PublishCourse from "./PublishCourse";

export default function RenderSteps() {
  const { step } = useSelector((state) => state.course);

  console.log(step);
  const steps = [
    {
      id: 1,
      title: "Course Information",
    },
    {
      id: 2,
      title: "Course Builder",
    },
    {
      id: 3,
      title: "Publish",
    },
  ];

  return (
    <div className=" my-4">
      <p className="text-lg font-semibold  text-white">
        Step {step}/{steps.length}:{" "}
        <span className="text-indigo-600">{steps[step - 1].title}</span>
      </p>
      {/* Render specific component based on current step */}
      {step === 1 && <CourseInformationForm />}
      {step === 2 && <CourseBuilderForm />}
      {step === 3 && <PublishCourse />}
    </div>
  );
}
