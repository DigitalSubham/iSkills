import React from "react";
import HighLightText from "../HomePage/HighLightText";
import Button from "../HomePage/Button";

const LearningGridArray = [
  {
    order: -1,
    heading: "World-Class Learning for",
    highlightText: "Anyone, Anywhere",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
    BtnText: "Learn More",
    BtnLink: "/",
  },
  {
    order: 1,
    heading: "Curriculum Based on Industry Needs",
    description:
      "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
  },
  {
    order: 2,
    heading: "Our Learning Methods",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 3,
    heading: "Certification",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 4,
    heading: `Rating "Auto-grading"`,
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 5,
    heading: "Ready to Work",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
];

const LearningGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 mb-10  p-5">
      {LearningGridArray.map((card, index) => {
        return (
          <div
            key={index}
            className={`${index === 0 && "lg:col-span-2 md:h-64 p-5 md:w-fit"}
            ${
              card.order % 2 === 1
                ? "bg-richblack-700 h-[294px]"
                : card.order % 2 === 0
                ? "bg-richblack-800 h-[294px]"
                : "bg-transparent"
            }
          ${card.order === 3 && "md:col-start-2"}
         
           `}
          >
            {card.order < 0 ? (
              <div className="md:w-[90%] flex flex-col pb-5 gap-3">
                <div className="text-4xl font-semibold">
                  {card.heading}
                  <HighLightText text={card.highlightText} />
                </div>
                <p className="font-medium">{card.description}</p>
                <div className="w-fit mt-4">
                  <Button
                    active={true}
                    linkto={card.BtnLink}
                    children={"Learn More"}
                  />
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-8 p-7">
                <h1 className="text-richblack-5 text-lg">
                  {card.heading}
                  <HighLightText text={card.highlightText} />
                </h1>
                <p className="text-richblack-300 font-medium">
                  {card.description}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default LearningGrid;
