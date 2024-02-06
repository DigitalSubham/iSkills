const BASE_URL = "http://localhost:4000/api/v1";

export const categories = {
  CATEGORIES_API: BASE_URL + "/course/showAllCategories",
};

export const authentication = {
  sendOTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  RESETPASSWORDTOKEN_API: BASE_URL + "/auth/reset-password-token",
  RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
};

export const contactUsEndPoint = {
  CONTACT_US_API: BASE_URL + "/reach/contact",
};

export const settingEndPoints = {
  DELETE_ACCOUNT_API: BASE_URL + "/profile/deleteProfile",
  UPDATE_DISPLAY_PICTURE: BASE_URL + "/profile/updateDisplayPicture",
  CHANGE_PASSWORD_API: BASE_URL + "/auth/changepassword",
  UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
};

export const profileEndPoints = {
  GET_USER_ENROLLED_COURSES_API: BASE_URL + "/profile/getEnrolledCourses",
};
