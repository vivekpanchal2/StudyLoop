import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import { getAllInstructorDetails } from "../../../services/operations/adminApi";

const LoadingSkeleton = () => {
  return (
    <div className="flex p-5 flex-col gap-6 border-b border-2 border-b-richblack-500">
      <div className="flex flex-col sm:flex-row gap-5 items-center mt-7">
        <p className="h-[150px] w-[150px] rounded-full skeleton"></p>
        <div className="flex flex-col gap-2 ">
          <p className="h-4 w-[160px] rounded-xl skeleton"></p>
          <p className="h-4 w-[270px] rounded-xl skeleton"></p>
          <p className="h-4 w-[100px] rounded-xl skeleton"></p>
        </div>
      </div>
      <div className="flex gap-5">
        <p className="h-7 w-full sm:w-1/2 rounded-xl skeleton"></p>
        <p className="h-7 w-full sm:w-1/2 rounded-xl skeleton"></p>
        <p className="h-7 w-full sm:w-1/2 rounded-xl skeleton"></p>
      </div>
    </div>
  );
};

function AllInstructors() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [allInstructorDetails, setAllInstructorDetails] = useState([]);
  const [instructorsCount, setInstructorsCount] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchInstructorsData = async () => {
      setLoading(true);
      const { allInstructorsDetails, instructorsCount } =
        await getAllInstructorDetails(token);
      if (allInstructorsDetails) {
        setAllInstructorDetails(allInstructorsDetails);
        setInstructorsCount(instructorsCount);
      }
      setLoading(false);
    };

    fetchInstructorsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(allInstructorDetails);

  return (
    <div>
      <div className="mb-14 flex items-center justify-between text-white">
        <h1 className="text-4xl font-medium text-richblack-5 font-boogaloo text-center sm:text-left">
          All Instructors Details
        </h1>
      </div>

      <Table className="rounded-xl border-2 border-richblack-500 ">
        <Thead>
          <Tr className="flex gap-x-10 rounded-t-md border-b border-b-richblack-500 px-6 py-2">
            <Th className="flex-1 text-left text-sm font-medium uppercase text-richblack-100">
              Instructors: {instructorsCount}
            </Th>
            <Th className="text-sm font-medium uppercase text-richblack-100">
              Courses Created
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {loading ? (
            <>
              <LoadingSkeleton />
              <LoadingSkeleton />
              <LoadingSkeleton />
            </>
          ) : !allInstructorDetails.length ? (
            <div className="text-5xl py-5 bg-yellow-800 text-white text-center">
              No Data Available
            </div>
          ) : (
            allInstructorDetails.map((instructor) => (
              <Tr
                key={instructor._id}
                className="flex gap-x-10 px-6 py-4 border-b border-b-richblack-500"
              >
                <Td className="flex flex-1 gap-x-2 items-center">
                  <img
                    src={instructor.image}
                    alt="Instructor"
                    className="h-[150px] w-[150px] rounded-full"
                  />
                  <div className="flex flex-col">
                    <p className="text-lg font-semibold text-richblack-5">
                      {instructor.firstName} {instructor.lastName}
                    </p>
                    <p className="text-sm text-richblack-300">
                      {instructor.email}
                    </p>
                    <p className="text-sm text-richblack-300">
                      Gender:{" "}
                      {instructor.additionalDetails.gender || "Not Defined"}
                    </p>
                    <p className="text-sm text-richblack-300">
                      Mobile No:{" "}
                      {instructor.additionalDetails.contactNumber || "No Data"}
                    </p>
                    <p className="text-sm text-richblack-300">
                      DOB:{" "}
                      {instructor.additionalDetails.dateOfBirth || "No Data"}
                    </p>
                  </div>
                </Td>
                <Td>
                  <div className="grid grid-cols-1 gap-2">
                    {instructor.courses.length > 0 ? (
                      instructor.courses.map((course) => (
                        <div
                          key={course._id}
                          className="p-2 border border-richblack-500 rounded-md text-white bg-richblack-700"
                        >
                          <p className="text-sm font-semibold">
                            {course.courseName}
                          </p>
                          <p className="text-xs">Price: ₹{course.price}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-richblack-300">
                        Not Enrolled in Any Courses
                      </p>
                    )}
                  </div>
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
    </div>
  );
}

export default AllInstructors;
