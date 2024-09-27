import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAllStudentsData } from "../../../services/operations/adminApi";
import { Table, Th, Thead, Tr, Td, Tbody } from "react-super-responsive-table";

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

const AllStudents = () => {
  const { token } = useSelector((state) => state.auth);
  const [allStudents, setAllStudents] = useState([]);
  const [studentsCount, setStudentsCount] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // fetch all Students Details
  useEffect(() => {
    const fetchAllStudents = async () => {
      setLoading(true);
      const { allStudentsDetails, studentsCount } = await getAllStudentsData(
        token
      );
      setAllStudents(allStudentsDetails);
      setStudentsCount(studentsCount);
      setLoading(false);
    };

    fetchAllStudents();
  }, [token]);

  return (
    <div className="">
      <div className="mb-14 flex items-center justify-between">
        <h1 className="text-4xl font-medium text-richblack-5 font-boogaloo text-center sm:text-left">
          All Students Details
        </h1>
      </div>

      <Table className="rounded-xl border-2 border-richblack-500 ">
        <Thead>
          <Tr className="flex gap-x-10 rounded-t-md border-b border-2 border-b-richblack-500 px-6 py-2">
            <Th className="flex-1 text-left text-sm font-medium uppercase text-richblack-100">
              Students: {studentsCount}
            </Th>
            <Th className="text-sm font-medium uppercase text-richblack-100">
              Enrolled Courses
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
          ) : !allStudents.length ? (
            <div className="text-5xl py-5 bg-yellow-800 text-white text-center">
              No Data Available
            </div>
          ) : (
            allStudents.map((student) => (
              <Tr
                key={student._id}
                className="flex gap-x-10 px-6 py-4 border-b border-b-richblack-500"
              >
                <Td className="flex flex-1 gap-x-2 items-center">
                  <img
                    src={
                      student.image !== "/"
                        ? student.image
                        : "https://i.ibb.co/KKLXw5d/image-2024-09-27-013011658.png"
                    }
                    alt="student"
                    className="h-[150px] w-[150px] rounded-full"
                  />
                  <div className="flex flex-col">
                    <p className="text-lg font-semibold text-richblack-5">
                      {student.firstName} {student.lastName}
                    </p>
                    <p className="text-sm text-richblack-300">
                      {student.email}
                    </p>
                    <p className="text-sm text-richblack-300">
                      Gender:{" "}
                      {student.additionalDetails.gender || "Not Defined"}
                    </p>
                    <p className="text-sm text-richblack-300">
                      Mobile No:{" "}
                      {student.additionalDetails.contactNumber || "No Data"}
                    </p>
                    <p className="text-sm text-richblack-300">
                      DOB: {student.additionalDetails.dateOfBirth || "No Data"}
                    </p>
                  </div>
                </Td>
                <Td>
                  <div className="grid grid-cols-1 gap-2">
                    {student.courses.length > 0 ? (
                      student.courses.map((course) => (
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
};

export default AllStudents;
