import React from "react";
import HighLightText from "../HomePage/HighLightText";

const Quote = () => {
  return (
    <div className="text-white">
      We are passionate about revolutionizing the way we learn. Our innovative
      platform <HighLightText text={"combines technology"} />
      <span className="bg-gradient-to-b from-[#FF512F] to-[#F09819] text-transparent bg-clip-text font-bold">
        , expertise
      </span>{" "}
      and community to create an{" "}
      <span className="bg-gradient-to-b from-[#E65C00] to-[#F9D423] text-transparent bg-clip-text font-bold">
        unparalleled educational experience.
      </span>
    </div>
  );
};

export default Quote;