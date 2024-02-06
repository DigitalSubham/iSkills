import React, { useState } from "react";
import Frame from "../../../assets/Images/frame.png";
import signup from "../../../assets/Images/signup.webp";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Tab from "../../common/Tab";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSignUpData } from "../../../slices/authSlice";
import { sendOTP } from "../../../services/operations/auth";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log(navigate);
  const tabsName = ["Student", "Instructor"];
  const [accountType, setAccountType] = useState(tabsName[0]);
  // console.log("type", currentTab);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { firstName, lastName, email, password, confirmPassword } = formData;

  //set all input data to formData
  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  //
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!firstName && !lastName && !email && !password && !confirmPassword) {
      toast.error("All Fields are required");
    }
    if (password !== confirmPassword) {
      toast.error("Passwords are not same");
    }
    const signUpData = {
      ...formData,
      accountType,
    };
    //save signUp Data to state
    dispatch(setSignUpData(signUpData));
    //send an otp to user's email
    dispatch(sendOTP(formData.email, navigate));
  };

  return (
    <div>
      <div className="mx-auto my-20 w-11/12 max-w-maxContent flex flex-row items-center justify-between">
        <div className="ml-9 w-[40%]">
          <div className="">
            <h2 className="text-4xl font-semibold text-richblack-5 mb-2">
              Join the millions learning to code with iSkils for free
            </h2>
            <p className="text-lg text-[#AFB2BF]">
              Build skills for today, tomorrow, and beyond.
            </p>
            <p className="text-lg text-blue-100 font-edu-sa">
              Education to future-proof your career.
            </p>
          </div>

          <div className="mt-8 w-[90%]">
            <form
              onSubmit={handleOnSubmit}
              className="flex w-full flex-col gap-y-4 text-base text-richblack-5"
            >
              <Tab
                tabsName={tabsName}
                currentTab={accountType}
                setCurrentTab={setAccountType}
              />
              <div className="flex gap-x-4">
                <label>
                  <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                    First Name <sup className="text-pink-200">*</sup>
                  </p>

                  <input
                    className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                    type="text"
                    placeholder="Enter First Name"
                    name="firstName"
                    value={firstName}
                    onChange={handleOnChange}
                    style={{
                      boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                  />
                </label>
                <label>
                  <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                    Last Name <sup className="text-pink-200">*</sup>
                  </p>

                  <input
                    className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                    type="text"
                    name="lastName"
                    placeholder="Enter Last Name"
                    value={lastName}
                    onChange={handleOnChange}
                    style={{
                      boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                  />
                </label>
              </div>

              <label>
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                  Email Address <sup className="text-pink-200">*</sup>{" "}
                </p>
                <input
                  className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                  type="email"
                  placeholder="Enter email address"
                  name="email"
                  value={email}
                  onChange={handleOnChange}
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                />
              </label>
              <div className="flex gap-x-4">
                <label className="relative">
                  <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                    Create Password <sup className="text-pink-200">*</sup>
                  </p>
                  <input
                    required
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={handleOnChange}
                    placeholder="Enter Password"
                    style={{
                      boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
                  />
                  <span
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                    ) : (
                      <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                    )}
                  </span>
                </label>
                <label className="relative">
                  <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                    Confirm Password <sup className="text-pink-200">*</sup>
                  </p>
                  <input
                    required
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleOnChange}
                    placeholder="Confirm Password"
                    style={{
                      boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
                  />
                  <span
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                  >
                    {showConfirmPassword ? (
                      <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                    ) : (
                      <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                    )}
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
              >
                Create Account
              </button>
            </form>
          </div>
        </div>

        {/* image section */}
        <div className=" ">
          <img className="mr-5 w-[458px]" src={Frame} alt="Frame" />
          <img
            src={signup}
            alt="signup"
            className="w-[458px] relative -mt-[433px] right-5"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
