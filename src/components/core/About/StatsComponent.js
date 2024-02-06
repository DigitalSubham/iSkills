import React from "react";

const stats = [
  { count: "5K", label: "Active Studnets" },
  { count: "10+", label: "Mentors" },
  { count: "200+", label: "Courses" },
  { count: "50+", label: "Awards" },
];
const StatsComponent = () => {
  return (
    <div>
      <div className="flex gap-x-6">
        {stats.map((data, index) => {
          return (
            <div key={index} className="">
              <h1>{data.count}</h1>
              <h2>{data.label}</h2>
            </div>
          );
        })}
      </div>{" "}
    </div>
  );
};

export default StatsComponent;
