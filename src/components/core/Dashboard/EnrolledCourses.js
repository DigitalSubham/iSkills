import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserEnrolledCourses } from "../../../services/operations/profileApi";
import ProgressBar from "@ramonak/react-progress-bar";

const EnrolledCourses = () => {
  const token = useSelector((state) => state.auth.token);
  const [enrolledCourses, setEnrolledCourses] = useState(null);

  useEffect(() => {
    const getEnrolledCourses = async () => {
      try {
        const response = await getUserEnrolledCourses(token);
        setEnrolledCourses(response);
      } catch (error) {
        console.log("Unable to fetch enrolled courses", error);
      }
    };

    getEnrolledCourses(); // Call the function immediately
  }, [token]); // Add token to the dependency array

  return (
    <div className="text-white">
      <div>
        <h1>Enrolled Courses</h1>
        {!enrolledCourses ? (
          <div>Loading...</div>
        ) : !enrolledCourses.length ? (
          <p>You have not enrolled in any courses</p>
        ) : (
          <div>
            <div>
              <p>Course Name</p>
              <p>Duration</p>
              <p>Progress</p>
            </div>
            {/* Card started here */}
            {enrolledCourses.map((course, index) => (
              <div key={index}>
                <div>
                  <img src={course.thumbnail} alt={course.courseName} />
                  <div>
                    <p>{course.courseName}</p>
                    <p>{course.courseDescription}</p>
                  </div>
                </div>
                <div>{course?.totalDuration}</div>
                <div>
                  {" "}
                  <p>Progress: {course?.progressPercentage || 0}%</p>
                  <ProgressBar
                    completed={course?.progressPercentage || 0}
                    height="8px"
                    isLabelVisible={false}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EnrolledCourses;
