import React from "react";

const Tab = ({ tabsName, currentTab, setCurrentTab }) => {
  return (
    <div className="flex flex-row rounded-full bg-richblack-800 mb-5 mt-5 border-richblack-100 px-2 py-2 w-fit">
      {tabsName.map((element, index) => {
        return (
          <div
            className={`text-[16px] flex flex-row items-center gap-2 ${
              currentTab === element
                ? "bg-richblack-900 text-richblack-5 font-medium"
                : "text-richblack-200"
            } rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5 px-5 py-2 `}
            key={index}
            onClick={() => setCurrentTab(element)}
          >
            {element}
          </div>
        );
      })}
    </div>
  );
};

export default Tab;
