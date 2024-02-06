import React from "react";
import { HiMiniChatBubbleLeftRight } from "react-icons/hi2";
import { BsGlobeCentralSouthAsia } from "react-icons/bs";
import { MdCall } from "react-icons/md";
import ContactFormSection from "../components/core/About/ContactFormSection";

const Contact = () => {
  return (
    <div className="flex justify-around text-richblack-5 my-10   ">
      <div className="bg-richblack-700 h-fit rounded-md p-7">
        <div className="p-2">
          <div className="flex items-start justify-start gap-3">
            <HiMiniChatBubbleLeftRight color="#999DAA" size={20} />
            <h2 className="text-[18px]">Chat on us</h2>
          </div>
          <p className="text-[14px] text-richblack-400 pl-8">
            Our friendly team is here to help.
          </p>
          <p className="text-[14px] text-richblack-400 pl-8">
            iskill@mail address
          </p>
        </div>
        <div className="p-2">
          <div className="flex items-start  justify-start gap-3">
            <BsGlobeCentralSouthAsia color="#999DAA" size={20} />
            <h2 className="text-[18px]">Visit us</h2>
          </div>
          <p className="text-[14px] text-richblack-400 pl-8">
            Come and say hello at our office HQ.
          </p>
          <p className="text-[14px] text-richblack-400 pl-8">
            Here is the location/ address
          </p>
        </div>
        <div className="p-2">
          <div className="flex items-start  justify-start gap-3">
            <MdCall color="#999DAA" size={20} />
            <h2 className="text-[18px]">Call us</h2>
          </div>
          <p className="text-[14px] text-richblack-400 pl-8">
            Mon - Fri From 8am to 5pm
          </p>
          <p className="text-[14px] text-richblack-400 pl-8">+123 456 7890</p>
        </div>
      </div>
      <div>
        <ContactFormSection />
      </div>
    </div>
  );
};

export default Contact;
