import React, { useState } from "react";
import Frame from "../../../assets/Images/frame.png";
import log from "../../../assets/Images/login.webp";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../../services/operations/auth";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email.toLowerCase(), password, navigate));
  };
  return (
    <div>
      <div className="mx-auto my-20 w-11/12 max-w-maxContent flex flex-row items-center justify-between">
        <div className="ml-32 w-[40%]">
          <div className="mt-8">
            <h2 className="text-4xl font-semibold text-richblack-5 mb-2">
              Welcome Back
            </h2>
            <p className="text-lg text-[#AFB2BF]">
              Build skills for today, tomorrow, and beyond.
            </p>
            <p className="text-lg text-blue-100 font-edu-sa">
              Education to future-proof your career.
            </p>
          </div>
          <div className="mt-8 w-[60%]">
            <form
              onSubmit={handleOnSubmit}
              className="flex flex-col text-base text-richblack-5"
            >
              <label>
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                  Email <sup className="text-pink-200">*</sup>
                </p>

                <input
                  className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5 "
                  autoComplete="username"
                  required
                  type="email"
                  placeholder="Enter email address"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                />
              </label>
              <label className="relative">
                <p className="mt-3 mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                  Password <sup className="text-pink-200">*</sup>
                </p>
                <input
                  required
                  autoComplete="current-password"
                  className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
                  type="password"
                  placeholder="Enter password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                />
              </label>
              <Link
                to="/forgot-password"
                className="text-[12px] text-blue-100 ml-[70%] -mt-1 mb-3 w-32"
              >
                Forgot Password
              </Link>
              <button
                type="submit"
                className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
              >
                Login
              </button>
            </form>
          </div>
        </div>
        <div className=" ">
          <img className="mr-32 w-[458px]" src={Frame} alt="Frame" />
          <img
            src={log}
            alt="login"
            className="w-[458px] relative -mt-[433px] right-5"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
