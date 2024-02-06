import React, { useState } from "react";
import { updatePersonalDetails } from "../../../services/operations/settingsApi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../common/IconBtn";

const genders = ["Male", "Female", "Other"];

const UpdatePersonalDetails = () => {
  const token = useSelector((state) => state.auth.token);
  // console.log(token);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    profession: "",
    dateOfBirth: "",
    gender: "",
    phoneNumber: "",
    about: "",
  });
  const { name, profession, dateOfBirth, gender, phoneNumber, about } =
    formData;

  // console.log(formData);

  const handleOnChange = (e) => {
    const updateValue = {
      ...formData,
      [e.target.name]: e.target.value,
    };
    setFormData(updateValue);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(updatePersonalDetails(token, formData));
  };

  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <div className="flex flex-col border-richblack-700 bg-richblack-800 mt-8 mb-4 rounded-md border-[1px] p-8 px-12 text-richblack-5">
          <p className="text-lg font-semibold text-richblack-5 pb-6">
            Profile Information
          </p>

          <div className="flex flex-col gap-5 lg:flex-row my-4">
            <div className="w-full">
              <p>
                Display Name <sup className="text-pink-200">*</sup>
              </p>
              <input
                required
                type="text"
                placeholder="Enter Display Name"
                name="name"
                value={name}
                onChange={handleOnChange}
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
              />
            </div>

            <div className="w-full">
              <p>
                Profession <sup className="text-pink-200">*</sup>
              </p>
              <input
                required
                type="text"
                placeholder="Enter Your Profession"
                name="profession"
                value={profession}
                onChange={handleOnChange}
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
              />
            </div>
          </div>
          {/* <p >Name entered above will be used for all issued certifies.</p> */}
          <div className="flex flex-col gap-5 lg:flex-row my-4">
            <div className="w-full">
              <p>
                Date of Birth <sup className="text-pink-200">*</sup>
              </p>
              <input
                type="date"
                required
                placeholder="Enter Date of Birth"
                name="dateOfBirth"
                value={dateOfBirth}
                onChange={handleOnChange}
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5 filter"
              />
            </div>
            <div className="w-full">
              <p>
                Gender <sup className="text-pink-200">*</sup>
              </p>
              {/* <input
                required
                placeholder="Enter Your Profession"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
              /> */}
              <select
                name="gender" // Add the name attribute
                value={gender} // Assuming you have a state variable 'selectedGender'
                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                onChange={handleOnChange}
              >
                {/* Add a default option with an empty value */}
                <option value="" disabled>
                  Select Gender
                </option>

                {/* Map through the genders array and create option elements */}
                {genders.map((ele, index) => (
                  <option key={index} value={ele}>
                    {ele}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-5 lg:flex-row my-4">
            <div className="w-full">
              <p>
                Phone Number <sup className="text-pink-200">*</sup>
              </p>
              <input
                name="phoneNumber"
                value={phoneNumber}
                onChange={handleOnChange}
                type="text"
                required
                placeholder="Enter phone number"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
              />
            </div>
            <div className="w-full">
              <p>
                About <sup className="text-pink-200">*</sup>
              </p>
              <input
                required
                placeholder="Enter About Yourself"
                type="text"
                name="about"
                value={about}
                onChange={handleOnChange}
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2 mb-6">
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

export default UpdatePersonalDetails;
