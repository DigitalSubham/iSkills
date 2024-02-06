import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPasswordResetToken } from "../services/operations/auth";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";

const ResetPassword = () => {
  const loading = useSelector((state) => state.auth.loading);
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  //   console.log(loading);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(getPasswordResetToken(email.toLowerCase(), setEmailSent));
  };
  return (
    <div className="text-white flex justify-center items-center w-[30%] mx-auto my-[10%]">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="p-2">
          <h1 className="text-richblack-5 text-2xl font-semibold">
            {!emailSent ? "Reset your password" : "Check Your Mail"}
          </h1>
          <p className="text-richblack-100 text-lg py-2">
            {!emailSent
              ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
              : `We have sent the reset email to ${email}`}
          </p>
          <form onSubmit={handleOnSubmit} className="flex flex-col">
            {!emailSent && (
              <label>
                <p className="text-sm text-richblack-50 pt-5">
                  Email Address <sup className="text-pink-200">*</sup>{" "}
                </p>
                <input
                  required
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full rounded-lg p-3 my-1  shadow-richblack-900 shadow-md bg-richblack-800 text-base  "
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                />
              </label>
            )}
            <button
              className="bg-yellow-5 text-base text-richblack-500 rounded-lg py-1 my-4 font-semibold"
              type="submit"
            >
              {!emailSent ? "Reset Password" : "Resend Email"}
            </button>
          </form>
          <div>
            <Link
              to="/login"
              className="flex items-center gap-2 py-2 text-richblack-50 hover:text-yellow-200 w-fit"
            >
              <MdOutlineKeyboardDoubleArrowLeft />
              Back to login
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
