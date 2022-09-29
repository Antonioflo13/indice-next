import { faPlay } from "@fortawesome/free-solid-svg-icons/faPlay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const ActionButtonRight = ({ isProduct }) => (
  <div
    className="flex items-center justify-center w-6 h-6 rounded-full text-xs text-white bg-indice-red"
    style={{
      width: "2rem",
      height: "2rem",
      position: "absolute",
      zIndex: "99",
      top: `${isProduct ? "15vh" : "40vh"}`,
      right: `${isProduct ? "0" : "15px"}`,
      cursor: "pointer",
    }}
  >
    <FontAwesomeIcon style={{ marginLeft: "2px" }} icon={faPlay} />
  </div>
);

export default ActionButtonRight;
