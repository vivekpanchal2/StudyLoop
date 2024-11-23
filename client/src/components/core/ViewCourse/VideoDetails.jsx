import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import "video-react/dist/video-react.css";
import { BigPlayButton, Player } from "video-react";

import { markLectureAsComplete } from "../../../services/operations/courseDetailsAPI";
import { updateCompletedLectures } from "../../../slices/viewCourseSlice";
import { setCourseViewSidebar } from "../../../slices/sidebarSlice";

import IconBtn from "../../common/IconBtn";
import { HiMenuAlt1 } from "react-icons/hi";

const VideoDetails = () => {
  const { courseId, sectionId, subSectionId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const playerRef = useRef(null);
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);
  const { courseSectionData, courseEntireData, completedLectures } =
    useSelector((state) => state.viewCourse);

  const { courseViewSidebar } = useSelector((state) => state.sidebar);

  const [videoData, setVideoData] = useState(null);
  const [previewSource, setPreviewSource] = useState("");
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        if (!courseSectionData.length) return;
        if (!courseId || !sectionId || !subSectionId) {
          navigate(`/dashboard/enrolled-courses`);
          return;
        }

        const filteredSection = courseSectionData.find(
          (course) => course._id === sectionId
        );
        if (!filteredSection) return;

        const filteredVideoData = filteredSection.subSection.find(
          (data) => data._id === subSectionId
        );
        if (!filteredVideoData) return;

        setVideoData(filteredVideoData);
        setPreviewSource(courseEntireData.thumbnail);
        setVideoEnded(false);
      } catch (error) {
        console.error("Error fetching video data:", error);
      }
    };

    fetchVideoData();
  }, [
    courseSectionData,
    courseEntireData,
    courseId,
    sectionId,
    subSectionId,
    navigate,
    location.pathname,
  ]);

  const navigateToVideo = (sectionIndex, subSectionIndex) => {
    const section = courseSectionData[sectionIndex];
    const subSectionId = section.subSection[subSectionIndex]._id;

    navigate(
      `/view-course/${courseId}/section/${section._id}/sub-section/${subSectionId}`
    );
  };

  const isFirstVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (section) => section._id === sectionId
    );
    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ].subSection.findIndex((sub) => sub._id === subSectionId);

    return currentSectionIndex === 0 && currentSubSectionIndex === 0;
  };

  const isLastVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (section) => section._id === sectionId
    );
    const subSectionsCount =
      courseSectionData[currentSectionIndex].subSection.length;
    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ].subSection.findIndex((sub) => sub._id === subSectionId);

    return (
      currentSectionIndex === courseSectionData.length - 1 &&
      currentSubSectionIndex === subSectionsCount - 1
    );
  };

  const goToNextVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (section) => section._id === sectionId
    );
    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ].subSection.findIndex((sub) => sub._id === subSectionId);

    const subSectionsCount =
      courseSectionData[currentSectionIndex].subSection.length;

    if (currentSubSectionIndex < subSectionsCount - 1) {
      navigateToVideo(currentSectionIndex, currentSubSectionIndex + 1);
    } else if (currentSectionIndex < courseSectionData.length - 1) {
      navigateToVideo(currentSectionIndex + 1, 0);
    }
  };

  const goToPrevVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (section) => section._id === sectionId
    );
    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ].subSection.findIndex((sub) => sub._id === subSectionId);

    if (currentSubSectionIndex > 0) {
      navigateToVideo(currentSectionIndex, currentSubSectionIndex - 1);
    } else if (currentSectionIndex > 0) {
      const prevSection = courseSectionData[currentSectionIndex - 1];
      navigateToVideo(
        currentSectionIndex - 1,
        prevSection.subSection.length - 1
      );
    }
  };

  const handleLectureCompletion = async () => {
    setLoading(true);
    const res = await markLectureAsComplete(
      { courseId: courseId, subsectionId: subSectionId },
      token
    );

    if (res) dispatch(updateCompletedLectures(subSectionId));
    setLoading(false);
  };

  if (courseViewSidebar && window.innerWidth <= 640) return null;

  return (
    <div className="flex flex-col gap-5 text-white">
      <div
        className="sm:hidden text-white absolute left-7 top-3 cursor-pointer"
        onClick={() => dispatch(setCourseViewSidebar(!courseViewSidebar))}
      >
        {!courseViewSidebar && <HiMenuAlt1 size={33} />}
      </div>

      {!videoData ? (
        <img
          src={previewSource}
          alt="Preview"
          className="h-full w-full rounded-md object-cover"
        />
      ) : (
        <Player
          ref={playerRef}
          aspectRatio="16:9"
          playsInline
          autoPlay
          onEnded={() => setVideoEnded(true)}
          src={videoData.videoUrl}
        >
          <BigPlayButton position="center" />
          {videoEnded && (
            <div
              className="full absolute inset-0 z-[100] grid h-full place-content-center"
              style={{
                backgroundImage:
                  "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1))",
              }}
            >
              {!completedLectures.includes(subSectionId) && (
                <IconBtn
                  disabled={loading}
                  onclick={handleLectureCompletion}
                  text={loading ? "Loading..." : "Mark As Completed"}
                  customClasses="text-xl max-w-max px-4 mx-auto"
                />
              )}
              <IconBtn
                disabled={loading}
                onclick={() => {
                  if (playerRef.current) {
                    playerRef.current.seek(0);
                    setVideoEnded(false);
                  }
                }}
                text="Rewatch"
                customClasses="text-xl max-w-max px-4 mx-auto mt-2"
              />
              <div className="mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl">
                {!isFirstVideo() && (
                  <button
                    disabled={loading}
                    onClick={goToPrevVideo}
                    className="cursor-pointer rounded-md bg-richblack-800 px-[20px] py-[8px] font-mono text-richblack-5 hover:bg-richblack-5 hover:text-richblack-800 duration-300;"
                  >
                    Prev
                  </button>
                )}
                {!isLastVideo() && (
                  <button
                    disabled={loading}
                    onClick={goToNextVideo}
                    className="cursor-pointer rounded-md bg-richblack-800 px-[20px] py-[8px] font-mono text-richblack-5 hover:bg-richblack-5 hover:text-richblack-800 duration-300;"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          )}
        </Player>
      )}

      <h1 className="mt-4 text-3xl font-semibold">{videoData?.title}</h1>
      <p className="pt-2 pb-6">{videoData?.description}</p>
    </div>
  );
};

export default VideoDetails;
