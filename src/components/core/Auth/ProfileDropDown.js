import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { useDispatch } from "react-redux";
import { logout } from "../../../services/operations/auth";
import { useSelector } from "react-redux";

const ProfileDropDown = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userImage = useSelector((state) => state.profile.user.image);
  const dropDowns = [
    {
      title: "DashBoard",
      link: "dashboard/my-profile",
      action: () => navigate("dashboard/my-profile"),
    },
    {
      title: "Logout",
      link: "#", //when does not want to navigate
      action: () => dispatch(logout(navigate)),
    },
  ];
  return (
    <div className="flex items-center gap-2 group cursor-pointer relative">
      <img
        src={
          userImage
            ? userImage
            : "https://api.dicebear.com/5.x/initials/svg?seed=SunilKumar"
        }
        alt="pic"
        className="aspect-square w-[40px] rounded-full object-cover"
      />
      <IoIosArrowDown className="text-sm text-richblack-100" />
      <div className=" invisible absolute left-[50%] top-[50%] z-[1000] flex w-[100px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 py-4 mr-8 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[100px] ">
        <div className="absolute left-[25%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
        {dropDowns.length ? (
          dropDowns.map((dropDown, index) => {
            return (
              <Link
                to={`/${dropDown.link}`}
                key={index}
                className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                onClick={(e) => {
                  e.preventDefault();
                  dropDown.action();
                }}
              >
                <p>{dropDown.title}</p>
              </Link>
            );
          })
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default ProfileDropDown;
