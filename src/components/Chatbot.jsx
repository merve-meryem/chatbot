import React from "react";
import ComputerIcon from "@mui/icons-material/Computer";

function Chatbot({ text }) {
  return (
    <>
      <div className="border rounded-lg p-4">
        <p className="font-bold mb-2">
          <ComputerIcon className="inline mr-2 text-red-500" />{" "}
          <span className="text-red-500">AI:</span> {text}
        </p>
      </div>
      <div></div>
    </>
  );
}

export default Chatbot;
