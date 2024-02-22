import React, { useEffect, useState } from "react";

const RequirementField = ({
  name,
  label,
  register,
  setValue,
  getValues,
  errors,
}) => {
  const [requirement, setRequirement] = useState("");
  const [requirementList, setRequirementList] = useState([]);
  const handleAddRequirement = () => {
    if (requirement) {
      setRequirementList([...requirementList, requirement]);
      setRequirement("");
    }
  };
  const handleRemoveRequirement = (index) => {
    const updateRequirementList = [...requirementList];
    updateRequirementList.splice(index, 1);
    setRequirementList(updateRequirementList);
  };

  useEffect(() => {
    register(name, {
      required: true,
      validate: (value) => value.length > 0,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //   useEffect(() => {
  //     setValue(name, requirementList);
  //   }, [requirementList]);

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <div>
        <input
          type="text"
          id={name}
          value={requirement}
          placeholder="Enter Course Requirements"
          onChange={(e) => setRequirement(e.target.value)}
          className="w-full"
        />
        <button
          type="button"
          onClick={handleAddRequirement}
          className="font-semibold text-yellow-50"
        >
          Add
        </button>
      </div>
      {requirementList.length > 0 && (
        <ul>
          {requirementList.map((requirement, index) => (
            <li key={index} className="flex items-center text-richblack-5">
              <span>{requirement}</span>
              <button
                type="button"
                onClick={() => handleRemoveRequirement(index)}
                className="text-xs text-pure-greys-300"
              >
                clear
              </button>
            </li>
          ))}
        </ul>
      )}
      {errors[name] && <span>{label} is required</span>}
    </div>
  );
};

export default RequirementField;
