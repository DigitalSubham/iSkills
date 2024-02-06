import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { profileEndPoints } from "../apis";

const { GET_USER_ENROLLED_COURSES_API } = profileEndPoints;

export async function getUserEnrolledCourses(token) {
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    const response = await apiConnector(
      "GET",
      GET_USER_ENROLLED_COURSES_API,
      null,
      { Authorization: `Bearer ${token}` }
    );
    console.log("GET_USER_ENROLLED_COURSES_API RESPONSE.......", response);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response.data.data;
  } catch (error) {
    console.log("GET_USER_ENROLLED_COURSES_API ERROR......", error);
    toast.error("Could Not Get Enrolled Courses");
  }
  toast.dismiss(toastId);
  return result;
}
