import mex from "../assets/images/mex.svg";
import map from "../assets/images/map.svg";
import call from "../assets/images/call.svg";

const Icons = intl => {
  return [
    {
      id: 0,
      name: "call",
      text: intl.formatMessage({ id: "modal.call" }),
      iconSrc: call,
      alt: "call-icon",
    },
    {
      id: 1,
      name: "indications",
      text: intl.formatMessage({ id: "modal.maps" }),
      iconSrc: map,
      alt: "map-icon",
    },
    {
      id: 2,
      name: "whatsapp",
      text: intl.formatMessage({ id: "modal.whatsapp" }),
      iconSrc: mex,
      alt: "whatsapp-icon",
    },
  ];
};

export default Icons;
