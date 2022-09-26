import {motion} from "framer-motion"
import React, {useContext} from "react"
import SharedStateContext from "./shared-state-context"
import imageMenu from "../assets/images/menu.jpg"
import Link from "next/link";

const LinkMenu = ({children, to, sidebar}) => {
    const menuItemVariants = {
        hidden: {opacity: 0, y: 10, transition: {type: "tween "}},
        shown: {opacity: 1, y: 0, transition: {type: "tween "}},
    }

    const {setSidebarShown, lang} = useContext(SharedStateContext)

    if (sidebar) {
        return (
            <motion.button
                variants={menuItemVariants}
                whileHover={{color: "#800000"}}
                onClick={() => {
                    setSidebarShown(false)
                }}
            >
                <p className="mt-3 font-semibold text-xs uppercase">{children}</p>
            </motion.button>
        )
    } else {
        return (
            <>
                <Link href={to}>
                    <motion.button
                    >
                        <div className="containerItemMenu">
                            <img className="imageMenu" src={imageMenu.src}/>
                            <div className="textMenu">{children}</div>
                        </div>
                    </motion.button>
                </Link>
                <style jsx="true">{`
                  .containerItemMenu {
                    position: relative;
                  }

                  .imageMenu {
                    border-radius: 25px;
                    height: 70px !important;
                    width: 200px !important;
                    object-fit: cover;
                  }

                  .textMenu {
                    margin-left: auto;
                    margin-right: auto;
                    left: 0;
                    right: 0;
                    text-align: center;
                    position: absolute;
                    font-weight: bold;
                    color: white;
                    bottom: 30%;
                    text-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
                  }

                  @media (max-width: 768px) {
                    .textMenu {
                      font-size: 12px;
                    }

                    .imageMenu {
                      height: 70px !important;
                      width: 165px !important;
                    }
                  }
                `}</style>
            </>
        )
    }
}

export default LinkMenu
