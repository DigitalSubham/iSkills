import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import RequirementField from "./RequirementField";
import IconBtn from "../../../../common/IconBtn";
import { setStep } from "../../../../../slices/courseSlice";
import { MdNavigateNext } from "react-icons/md";

const CourseInformation = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const { course, editCourse } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const [courseCategories, setCourseCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      const categories = await fetch("");
      if (categories.length > 0) {
        setCourseCategories(categories);
      }
      setLoading(false);
    };
    if (editCourse) {
      setValue("courseTitle", course.courseName);
      setValue("courseShortDesc", course.courseDescription);
      setValue("coursePrice", course.price);
      setValue("courseTags", course.tag);
      setValue("courseBenefits", course.whatYouWillLearn);
      setValue("courseCategory", course.category);
      setValue("courseRequirements", course.instructions);
      setValue("courseImage", course.thumbnail);
    }
    // getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isFormUpdated = () => {
    const currentValues = getValues();
    if (
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseDescription ||
      currentValues.coursePrice !== course.price ||
      // currentValues.courseTags.toString() !== course.tag.toString() ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      currentValues.courseCategory._id !== course.category._id ||
      currentValues.courseRequirements.toString() !==
        course.instructions.toString()
      // currentValues.courseImage !== course.thumbnail
    ) {
      return true;
    } else {
      return false;
    }
  };
  //handle next button click
  const onSubmit = async (data) => {
    const currentValues = getValues();
    const formData = new formData();
    formData.append("courseId", course._id);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-8  "
    >
      <div>
        <label htmlFor="courseTitle">Course Title</label>
        <input
          id="courseTitle"
          placeholder="Enter Course Title"
          {...register("courseTitle", { required: true })}
          className="w-full"
        />
        {errors.courseTitle && <span>Course title is required</span>}
      </div>
      <div>
        <label htmlFor="courseShortDesc">Course Short Description</label>
        <textarea
          id="courseShortDesc"
          placeholder="Enter Short Description"
          {...register("courseShortDesc", { required: true })}
          className="min-h-[140px] w-full"
        ></textarea>
        {errors.courseShortDesc && <span>Course description is required</span>}
      </div>
      <div className="relative">
        <label htmlFor="coursePrice">course Price</label>
        <input
          id="coursePrice"
          placeholder="Enter Course Price"
          {...register("coursePrice", { required: true })}
          className="w-full"
        />
        <HiOutlineCurrencyRupee
          className="absolute top-1/2 text-richblack-800"
          size={20}
        />
        {errors.coursePrice && <span>Course Price is required</span>}
      </div>
      <div>
        <label htmlFor="courseCategory">Course Category</label>
        <select
          id="courseCategory"
          defaultValue=""
          {...register("courseCategory", { required: true })}
        >
          <option value="" disabled>
            Choose a category
          </option>
          {!loading &&
            courseCategories.map((category, index) => (
              <option key={index} value={category?._id}>
                {category?.name}
              </option>
            ))}
        </select>
        {errors.courseCategory && <span>Course Category is required</span>}
      </div>
      {/* create a custom component for handling tags input */}
      {/* Thumbnail upload */}
      <div>
        <label htmlFor="courseBenefits">Benefits of the course</label>
        <textarea
          id="courseBenefits"
          placeholder="Enter Benefits of the course"
          {...register("courseBenefits", { required: true })}
          className="min-h-[140px] w-full"
        />{" "}
        {errors.courseBenefits && <span>Course Benefits is required</span>}
      </div>
      <RequirementField
        name="courseRequirements"
        label="Requirements/Instructions"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />
      <div>
        {editCourse && (
          <button
            onClick={() => dispatch(setStep(2))}
            className="flex items-center gap-x-2 bg-richblack-300"
          >
            Continue Without Saving
          </button>
        )}
        <IconBtn
          disabled={loading}
          text={!editCourse ? "Next" : "Save Changes"}
        >
          <MdNavigateNext />
        </IconBtn>
      </div>
    </form>
  );
};

export default CourseInformation;
