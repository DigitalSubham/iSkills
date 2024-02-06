import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { apiConnector } from "../../services/apiConnector";
import { contactUsEndPoint } from "../../services/apis";
import countrycode from "../../data/countrycode.json";

const ContactUsForm = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const submitContactForm = async (data) => {
    console.log("logging contact form data", data);
    try {
      setLoading(true);
      const response = await apiConnector(
        "POST",
        contactUsEndPoint.CONTACT_US_API,
        data
      );
      console.log("Logging response", response);
      setLoading(false);
    } catch (error) {
      console.log("Error: ", error.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstName: "",
        lastName: "",
        message: "",
        phoneNumber: "",
        countryCode: "",
      });
    }
  }, [reset, isSubmitSuccessful]);
  return (
    <form
      className="flex flex-col gap-7  "
      onSubmit={handleSubmit(submitContactForm)}
    >
      <div className=" flex flex-col gap-2 ">
        <div className="flex flex-col gap-5">
          {" "}
          {/* firstName */}
          <div className="flex flex-col gap-2">
            <label className="text-[14px] text-richblack-5" htmlFor="firstName">
              First Name
            </label>
            <input
              className="form-style"
              type="text"
              name="firstName"
              placeholder="Enter First Name"
              id="firstName"
              {...register("firstName", { required: true })}
            />
            {errors.firstName && (
              <span className="-mt-1 text-[12px] text-yellow-100">
                Please Enter First Your Name
              </span>
            )}
          </div>
          {/* lastName */}
          <div className="flex flex-col gap-2">
            <label className="text-[14px] text-richblack-5" htmlFor="lastName">
              Last Name
            </label>
            <input
              className="form-style"
              type="text"
              name="lastName"
              placeholder="Enter Last Name"
              id="lastName"
              {...register("lastName")}
            />
          </div>
        </div>
        {/* email */}
        <div className="flex flex-col gap-2">
          <label className="text-[14px] text-richblack-5" htmlFor="email">
            Email Address
          </label>
          <input
            className="form-style"
            type="email"
            name="email"
            id="email"
            placeholder="Enter email address"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="-mt-1 text-[12px] text-yellow-100">
              Please Enter your email address
            </span>
          )}
        </div>
        {/* phone no */}
        <div className="flex flex-col gap-2">
          <label className="text-[14px] text-richblack-5" htmlFor="phoneNumber">
            Phone Number
          </label>
          <div className="flex gap-5">
            {/* dropdown */}
            <div className="flex w-[81px] flex-col gap-2 ">
              <select
                type="text"
                className="form-style"
                name="dropdown"
                id="dropdown"
                {...register("countryCode", { required: true })}
              >
                {countrycode.map((element, index) => {
                  return (
                    <option key={index} value={element.code}>
                      {element.code} - {element.country}
                    </option>
                  );
                })}
              </select>
            </div>
            {/* input number */}
            <div className="flex w-[calc(100%-90px)] flex-col gap-2">
              {" "}
              <input
                className="form-style"
                name="phoneNumber"
                id="phoneNumber"
                placeholder="12345 67890"
                {...register("phoneNumber", {
                  required: {
                    value: true,
                    message: "Please enter Phone Number",
                  },
                  maxLength: { value: 12, message: "Invalid Phone Number" },
                  minLength: { value: 10, message: "Invalid Phone Number" },
                })}
              />
            </div>
          </div>
          {errors.message && (
            <span className="-mt-1 text-[12px] text-yellow-100">
              {errors.phoneNumber.message}
            </span>
          )}
        </div>
        {/* message */}
        <div className="flex flex-col gap-2">
          <label className="text-[14px] text-richblack-5" htmlFor="message">
            Message
          </label>
          <textarea
            className="form-style"
            name="message"
            id="message"
            rows="5"
            cols="30"
            placeholder="Enter your message here"
            {...register("message", { required: true })}
          />
          {errors.message && (
            <span className="-mt-1 text-[12px] text-yellow-100">
              Please enter your message
            </span>
          )}
        </div>
      </div>
      <button
        disabled={loading}
        type="submit"
        className={`rounded-md bg-yellow-50 px-6 py-3 w-full mt-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
         ${
           !loading &&
           "transition-all duration-200 hover:scale-95 hover:shadow-none"
         }  disabled:bg-richblack-500 sm:text-[16px] `}
      >
        Send Message
      </button>
    </form>
  );
};

export default ContactUsForm;
