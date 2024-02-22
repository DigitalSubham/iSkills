import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateDisplayPicture } from "../../../../services/operations/settingsApi";
import IconBtn from "../../../common/IconBtn";
import { FiUpload } from "react-icons/fi";

const UpdateDisplayPicture = () => {
  const { user } = useSelector((state) => state.profile);
  const token = useSelector((state) => state.auth.token);
  //   console.log(token);
  const [imageFile, setImageFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const dispatch = useDispatch();
  // when user click select button due to below code open the file picker dialog
  const handleClick = () => {
    fileInputRef.current.click();
    // console.log(fileInputRef);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (("file", file)) {
      setImageFile(file);
      previewFile(file);
    }
  };

  //when we just select image then it will preview in profile image section
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };
  //upload image to db
  const handleFileUpload = () => {
    try {
      console.log("uploading...");
      setLoading(true);
      const formData = new FormData();
      formData.append("displayPicture", imageFile);
      console.log("formdata", formData);
      dispatch(updateDisplayPicture(token, formData)).then(() => {
        setLoading(false);
      });
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
    }
  };
  //everytime imageFile data changes call previewFile function to preview image
  useEffect(() => {
    if (imageFile) {
      previewFile(imageFile);
    }
  }, [imageFile]);

  return (
    <>
      <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 text-richblack-5">
        <div className="flex items-center gap-x-4">
          <img
            src={previewSource || user?.image} //show user.image or just selected image
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[78px] rounded-full object-cover"
          />
          <div className="space-y-2">
            <p>Change Profile Picture</p>
            <div className="flex flex-row gap-3">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/png, image/gif, image/jpeg"
              />
              <button
                onClick={handleClick}
                disabled={loading}
                className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
              >
                Select
              </button>
              <IconBtn
                text={loading ? "Uploading..." : "Upload"}
                onclick={handleFileUpload}
              >
                {!loading && (
                  <FiUpload className="text-lg text-richblack-900" />
                )}
              </IconBtn>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateDisplayPicture;
