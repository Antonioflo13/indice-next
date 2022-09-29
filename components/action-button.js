import { faPlay } from "@fortawesome/free-solid-svg-icons/faPlay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const ActionButton = () => (
  <div
    className="flex items-center justify-center w-6 h-6 rounded-full text-xs text-white bg-indice-red"
    style={{
      width: "1.75rem",
      height: "1.75rem",
      position: "absolute",
      zIndex: "99",
      top: "40vh",
      right: "15px",
      cursor: "pointer",
    }}
  >
    <FontAwesomeIcon style={{ marginLeft: "2px" }} icon={faPlay} />
  </div>
);

export default ActionButton;
