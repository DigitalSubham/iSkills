import React from "react";
import { FooterLink2 } from "../../data/footer-links";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaYoutube, FaLinkedin } from "react-icons/fa";
import Logo from "../../../src/assets/Logo/Logo-Full-Light.png";

const Footer = () => {
  return (
    <div className="flex flex-col w-11/12 items-center max-w-maxContent bg-[#2C333F] justify-between text-white ml-[90px] border-t border-richblack-600">
      <div className=" flex flex-row m-5 pb-5 border-b border-richblack-600">
        <div className="flex flex-row gap-10 pr-12  text-[14px] text-richblack-400 border-r  border-richblack-600  w-[50%] ">
          <div className=" ">
            <img src={Logo} className="w-[160px] h-[32px]" alt="logo" />
            <h2 className="text-[#AFB2BF] text-[16px] mt-2 mb-2">Company</h2>
            <p className="mb-2">About</p>
            <p className="mb-2">Careers</p>
            <p className="mb-2">Affiliates</p>
            <div className="flex flex-row gap-2">
              <FaFacebook size={20} />
              <FaTwitter size={20} />
              <FaYoutube size={20} />
              <FaLinkedin size={20} />
            </div>
          </div>
          <div>
            <div className="space-y-2">
              <h2 className="text-[#AFB2BF] text-[16px] mb-2">Resources</h2>
              <p className="mb-2">Articles</p>
              <p className="mb-2">Blog</p>
              <p className="mb-2">Chart Sheet</p>
              <p className="mb-2">Code challenges</p>
              <p className="mb-2">Docs</p>
              <p className="mb-2">Projects</p>
              <p className="mb-2">Videos</p>
              <p className="mb-2">Workspaces</p>
            </div>

            <div className="mt-5">
              <h2 className="text-[#AFB2BF] text-[16px] mb-2">Support</h2>
              <p className="mb-2">Help Center</p>
            </div>
          </div>
          <div className="">
            <div className="">
              <h2 className="text-[#AFB2BF] text-[16px]">Plans</h2>
              <p className="mb-2">Paid memberships</p>
              <p className="mb-2">For students</p>
              <p className="mb-2">Business solutions </p>
            </div>
            <div className="mt-5">
              <h2 className="text-[#AFB2BF] text-[16px] mb-2">Community</h2>
              <p className="mb-2">Forums</p>
              <p className="mb-2">Chapters</p>
              <p className="mb-2">Events</p>
            </div>
          </div>
        </div>
        <div className=" flex flex-row gap-20  w-[50%] ml-10">
          {FooterLink2.map((e, index) => {
            return (
              <div key={index}>
                <h2 className="text-[#AFB2BF] text-[16px]">{e.title}</h2>
                {e.links.map((link, index) => {
                  return (
                    <Link to={link.link} key={index}>
                      <p className="text-[14px] text-richblack-400 ">
                        {link.title}
                      </p>
                    </Link>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-row gap-[680px] mb-8 text-[14px] text-[#838894]">
        <div className="flex flex-row justify-start gap-2">
          <p>Privacy Policy</p>
          <p>Cookie Policy</p>
          <p>Terms</p>
        </div>

        <div>Made with ❤️ © 2024 iSkills</div>
      </div>
    </div>
  );
};

export default Footer;
