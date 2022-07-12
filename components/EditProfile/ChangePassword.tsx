import React from "react";

export default function ChangePassword() {
  function changePassword() {
    console.log("changePassword");
  }
  return (
    <div>
      <div
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
        onClick={changePassword}
      >
        Change Password
      </div>
    </div>
  );
}
