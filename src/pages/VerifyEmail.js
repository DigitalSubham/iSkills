import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OTPInput from "react-otp-input";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../services/operations/auth";
import { sendOTP } from "../services/operations/auth";

const VerifyEmail = () => {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const signUpData = useSelector((state) => state.auth.signUpData);
  const navigate = useNavigate();

  useEffect(() => {
    if (!signUpData) {
      navigate("/signup");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const {
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = signUpData;

    dispatch(
      signUp(
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
        navigate
      )
    );
  };

  return (
    <div className="text-white flex justify-center items-center w-[30%] mx-auto my-[10%]">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div>
          <h1 className="text-richblack-5 text-2xl font-semibold">
            Verify email
          </h1>
          <p className="text-richblack-100 text-lg py-2">
            A verification code has been sent to you. Enter the code below
          </p>
          <form onSubmit={handleOnSubmit}>
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span>-</span>}
              renderInput={(props) => <input {...props} />}
            />
            <button
              type="submit"
              className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
            >
              Verify Email
            </button>
          </form>
          <div>
            <div>
              <Link
                to="/login"
                className="flex items-center gap-2 py-2 text-richblack-50 hover:text-yellow-200 w-fit"
              >
                <MdOutlineKeyboardDoubleArrowLeft />
                Back to login
              </Link>
            </div>
            <button
              onClick={() => dispatch(sendOTP(signUpData.email, navigate))}
            >
              Resent it
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
