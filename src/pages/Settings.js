import React from "react";
import UpdatePersonalDetails from "../components/core/Dashboard/Setting/UpdatePersonalDetails";
import UpdatePassword from "../components/core/Dashboard/Setting/UpdatePassword";
import DeleteAccount from "../components/core/Dashboard/Setting/DeleteAccount";
import UpdateDisplayPicture from "../components/core/Dashboard/Setting/UpdateDisplayPicture";

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
