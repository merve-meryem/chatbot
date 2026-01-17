import React from "react";
import PersonIcon from "@mui/icons-material/Person";

function User({ text }) {
  return (
    <div className="border rounded-lg p-4">
      <p className="font-bold mb-2">
        <PersonIcon className="inline mr-2 text-red-500" />{" "}
        <span className="text-red-500">You</span> {text}
      </p>
    </div>
  );
}

export default User;
