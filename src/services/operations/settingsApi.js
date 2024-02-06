import toast from "react-hot-toast";
import { setLoading } from "../../slices/authSlice";
import { apiConnector } from "../apiConnector";
import { settingEndPoints } from "../apis";
import { logout } from "./auth";
import { setUser } from "../../slices/profileSlice";

const {
  DELETE_ACCOUNT_API,
  UPDATE_DISPLAY_PICTURE,
  CHANGE_PASSWORD_API,
  UPDATE_PROFILE_API,
} = settingEndPoints;

export function updateDisplayPicture(token, formData) {
  return async (dispatch) => {
    try {
      const response = await apiConnector(
        "PUT",
        UPDATE_DISPLAY_PICTURE,
        formData,
        {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }
      );
      console.log(
        "UPDATE_DISPLAY_PICTURE_API API RESPONSE............",
        response
      );
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Display Picture Updated Successfully");
      dispatch(setUser(response.data.data));
      localStorage.setItem("user", JSON.stringify(response.data.data));
      // console.log(response.data.data);
    } catch (error) {
      console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error);
      toast.error("Could Not Update Display Picture");
    }
  };
}

export function updatePersonalDetails(token, formData) {
  // console.log(token, formData);
  return async (dispatch) => {
    try {
      const response = await apiConnector("PUT", UPDATE_PROFILE_API, formData, {
        Authorization: `Bearer ${token}`,
      });
      console.log("UPDATE_PROFILE_API RESPONSE....", response);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Profile Updated Successfully");
      dispatch(setUser({ ...response.data.updatedUserDetails }));
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.updatedUserDetails)
      );
    } catch (error) {
      console.log("UPDATE_PROFILE_API ERROR............", error);
      toast.error(error.response.data.message);
    }
  };
}

export async function changePassword(token, formData) {
  // console.log(token, formData);
  try {
    const response = await apiConnector("POST", CHANGE_PASSWORD_API, formData, {
      Authorization: `Bearer ${token}`,
    });
    console.log("CHANGE_PASSWORD_API RESPONSE ............", response);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    toast.success("Password Changed Successfully");
  } catch (error) {
    console.log("CHANGE_PASSWORD_API ERROR............", error);
    toast.error(error.response.data.message);
  }
}

export function deleteAccount(token, navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("DELETE", DELETE_ACCOUNT_API, null, {
        Authorization: `Bearer ${token}`,
      });
      console.log("DELETE_PROFILE_API API RESPONSE............", response);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Account deleted successfully");
      dispatch(logout(navigate));
    } catch (error) {
      console.log("DELETE_PROFILE_API API ERROR............", error);
      toast.error("Could Not Delete Profile");
    }
    dispatch(setLoading(false));
  };
}
