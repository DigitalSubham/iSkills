import React from "react";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteAccount } from "../../../services/operations/settingsApi";

const DeleteAccount = () => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleOnClick = async () => {
    try {
      dispatch(deleteAccount(token, navigate));
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
    }
  };
  return (
    <div className="flex border-pink-700 bg-pink-900 gap-x-5 my-10 rounded-lg p-8 ">
      <div className=" flex  aspect-square h-14 w-14 items-center justify-center rounded-full bg-pink-700">
        <MdDelete className="text-3xl text-pink-200" />
      </div>
      <div className="space-y-2">
        <h2 className="text-lg font-bold text-richblack-5">Delete Account</h2>
        <div className="w-3/5 text-pink-25">
          <p>Would you like to delete account?</p>
          <p>
            This account contains Paid Courses. Deleting your account will
            remove all the contain associated with it.
          </p>
        </div>
        <button
          type="button"
          className="w-fit cursor-pointer italic text-pink-300"
          onClick={handleOnClick}
        >
          I want to delete my account.
        </button>
      </div>
    </div>
  );
};

export default DeleteAccount;
