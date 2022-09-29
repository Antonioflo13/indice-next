import { faPlay } from "@fortawesome/free-solid-svg-icons/faPlay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { transform } from "lodash";
import React from "react";

const ActionButtonLeft = ({ isProduct }) => (
  <div
    className="flex items-center justify-center w-6 h-6 rounded-full text-xs text-white bg-indice-red"
    style={{
      width: "2rem",
      height: "2rem",
      position: "absolute",
      zIndex: "99",
      top: `${isProduct ? "15vh" : "40vh"}`,
      left: `${isProduct ? "0" : "55px"}`,
      cursor: "pointer",
      transform: "rotate(180deg)",
    }}
  >
    <FontAwesomeIcon style={{ marginLeft: "2px" }} icon={faPlay} />
  </div>
);

export default ActionButtonLeft;
