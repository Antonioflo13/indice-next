import mex from "../assets/images/mex.svg"
import map from "../assets/images/map.svg"
import call from "../assets/images/call.svg"

const Incons = intl => {
  return [
    {
      id: 0,
      name: "chiamata",
      text: intl.formatMessage({ id: "modal.call" }),
      iconSrc: call,
      alt: "icona chiamata",
    },
    {
      id: 1,
      name: "indcazioni",
      text: intl.formatMessage({ id: "modal.maps" }),
      iconSrc: map,
      alt: "icona mapp",
    },
    {
      id: 2,
      name: "whatapp",
      text: intl.formatMessage({ id: "modal.whatapp" }),
      iconSrc: mex,
      alt: "icona whatapp",
    },
  ]
}

export default Incons
