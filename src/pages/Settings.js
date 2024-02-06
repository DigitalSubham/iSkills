import React from "react";
import UpdatePersonalDetails from "../components/core/Setting/UpdatePersonalDetails";
import UpdatePassword from "../components/core/Setting/UpdatePassword";
import DeleteAccount from "../components/core/Setting/DeleteAccount";
import UpdateDisplayPicture from "../components/core/Setting/UpdateDisplayPicture";

const Settings = () => {
  return (
    <div className="text-white">
      <UpdateDisplayPicture />
      <UpdatePersonalDetails />
      <UpdatePassword />
      <DeleteAccount />
    </div>
  );
};

export default Settings;
