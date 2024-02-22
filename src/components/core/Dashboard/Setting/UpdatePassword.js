import React, { useState } from "react";
import { changePassword } from "../../../../services/operations/settingsApi";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import IconBtn from "../../../common/IconBtn";
import { useNavigate } from "react-router-dom";

const UpdatePassword = () => {
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const { oldPassword, newPassword } = formData;
  const handleOnChange = (e) => {
    const updatedData = {
      ...formData,
      [e.target.name]: e.target.value,
    };
    setFormData(updatedData);
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (!oldPassword && !newPassword) {
      toast.error("All Fields are required");
    }
    try {
      changePassword(token, formData);
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
    }
  };
  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <div className="border-richblack-700 bg-richblack-800 flex flex-col rounded-md border-[1px] p-8 px-12 text-richblack-5">
          <div className="  ">
            <p className="text-lg font-semibold text-richblack-5 pb-6">
              Change Password
            </p>
          </div>

          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="relative w-full">
              <p>
                Current Password<sup className="text-pink-200">*</sup>
              </p>
              <input
                required
                type={showOldPassword ? "text" : "password"}
                placeholder="Enter old Password"
                name="oldPassword"
                value={oldPassword}
                onChange={handleOnChange}
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
              />
              <span
                onClick={() => setShowOldPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {showOldPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            </div>
            <div className="relative w-full">
              <p>
                New Password<sup className="text-pink-200">*</sup>
              </p>
              <input
                required
                type={showNewPassword ? "text" : "password"}
                placeholder="Enter new Password"
                name="newPassword"
                value={newPassword}
                onChange={handleOnChange}
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
              />
              <span
                onClick={() => setShowNewPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {showNewPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2 my-3">
          <button
            onClick={() => {
              navigate("/dashboard/my-profile");
            }}
            className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
          >
            Cancel
          </button>
          <IconBtn type="submit" text="Update" />
        </div>
      </form>
    </div>
  );
};

export default UpdatePassword;
