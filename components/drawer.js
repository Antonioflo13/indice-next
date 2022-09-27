import React, { useContext, useState } from "react"
import { numberWithCommas, parserLineItems } from "../utils/parser"
import SharedStateContext from "./shared-state-context"
import { useIntl } from "react-intl"
import closeIcon from "../assets/images/cross.svg"
import { motion } from "framer-motion"
import { getCookie } from "../utils/cookie"
import paypal from "../assets/images/1.svg"
import mastercard from "../assets/images/2.svg"
import visa from "../assets/images/3.svg"
import amex from "../assets/images/4.svg"
import logo from "../assets/images/logo-black.png"

const getItems = cart => {
  if (cart) {
    const { lineItems } = cart
    return lineItems
  }
}

const sidebarVariants = {
  hidden: { x: "100%", transition: { type: "tween" } },
  shown: {
    x: "0",
    transition: { type: "tween", staggerChildren: 0.1, when: "beforeChildren" },
  },
}

const Drawer = ({ handleClose, setCart }) => {
  const [isVisible, setIsVisible] = useState(true)
  const intl = useIntl()
  const { shopifyClient, setShopifyCheckout } = useContext(SharedStateContext)

  const handleAddItem = async id => {
    const checkoutId = getCookie("checkoutId")
    const updatedCheckout = await shopifyClient.checkout.addLineItems(
      checkoutId,
      [
        {
          variantId: id,
          quantity: 1,
        },
      ]
    )
    const { lineItems, totalPrice } = updatedCheckout
    const cartContent = { lineItems, totalPrice }

    await setShopifyCheckout(updatedCheckout)
    setCart(cartContent)
  }
  const handleRemoveItem = async id => {
    const checkoutId = getCookie("checkoutId")
    const updatedCheckout = await shopifyClient.checkout.addLineItems(
      checkoutId,
      [
        {
          variantId: id,
          quantity: -1,
        },
      ]
    )
    const { lineItems, totalPrice } = updatedCheckout
    const cartContent = { lineItems, totalPrice }

    await setShopifyCheckout(updatedCheckout)
    setCart(cartContent)
  }
  const handleRemoveItems = async id => {
    const checkoutId = getCookie("checkoutId")
    const lineItemIdsToRemove = [id]
    const updatedCheckout = await shopifyClient.checkout.removeLineItems(
      checkoutId,
      lineItemIdsToRemove
    )
    const { lineItems, totalPrice } = updatedCheckout
    const cartContent = { lineItems, totalPrice }

    await setShopifyCheckout(updatedCheckout)
    setCart(cartContent)
  }
  const { shopifyCheckout } = useContext(SharedStateContext)
  // const goToCheckout = () => {
  //   window.open(shopifyCheckout.webUrl, "_self")
  //}
  const { cart } = useContext(SharedStateContext)

  const items = parserLineItems(getItems(cart))

  return (
    <>
      <motion.div
        variants={sidebarVariants}
        initial={"hidden"}
        animate={"shown"}
        exit={"hidden"}
        className="fixed top-0 right-0 h-full w-full md:w-1/2 bg-indice-grey z-50"
        style={{ maxWidth: 500 }}
      >
        {isVisible && (
          <div className="drawer-container">
            <div className="drawer-header">
              <div className="drawer-header-top">
                <button
                  className="close-menu"
                  onClick={() => {
                    handleClose()
                    setIsVisible(false)
                  }}
                >
                  <span>
                    <img src={closeIcon} width={10} alt="cart-icon" />
                  </span>
                </button>
                <img className="logoDrower" src={logo} alt="" />
              </div>
            </div>
            <div className="drawer-title text-indice text-l font-bold uppercase">
              {intl.formatMessage({ id: "drawer.title" })}
            </div>
            <div className="containerListItem">
              {items &&
                items.map((item, key) => {
                  return (
                    <div
                      className="drawer-product-container"
                      key={`${item.id}-${key}`}
                    >
                      <div className="drawer-product-image">
                        <img src={item.details.image.src}></img>
                      </div>
                      <div className="drawer-product-description">
                        {/* <div className="text-indice-red text-xs font-bold italic mackay noToHead mt-2">
                          {item.details.title}
                        </div> */}
                        <div className="text-xs uppercase font-bold">
                          {item.titleProduct}
                        </div>
                        <div>€ {item.details.price}</div>
                      </div>
                      <div className="drawer-product-actions">
                        <div className="icon-change-quantity">
                          <div
                            onClick={() =>
                              item.quantity == 1
                                ? handleRemoveItems(item.idLineItems)
                                : handleRemoveItem(item.id)
                            }
                          >
                            -
                          </div>
                        </div>
                        <div className="drawer-product-quantity">
                          {item.quantity}
                        </div>
                        <div className="icon-change-quantity">
                          <div onClick={() => handleAddItem(item.id)}>+</div>
                        </div>
                      </div>
                    </div>
                  )
                })}
            </div>
            <div className="drawer-recap">
              <div
                className="drawer-recap-description"
                style={{ placeContent: "center" }}
              >
                {/* <div className="drawer-recap-quantity">{totalQuantity}</div> */}
                <div className="font-bold">
                  {intl.formatMessage({ id: "drawer.total" }) +
                    "   " +
                    numberWithCommas(cart?.totalPrice ? cart?.totalPrice : 0)}
                </div>
              </div>
              <div className="drawer-recap-checkout mt-4">
                <motion.button
                  className="w-full rounded-full bg-indice-red pt-1 pb-px px-4 leading-5 text-white font-bold text-xs uppercase"
                  style={{ height: "45px" }}
                >
                  <div className="font-bold" onClick={goToCheckout}>
                    {intl.formatMessage({ id: "drawer.label_button" })}
                  </div>
                </motion.button>
              </div>
              <div className="flex mt-10 gap-10">
                <img src={paypal} width={30} alt="" />
                <img src={mastercard} width={30} alt="" />
                <img src={visa} width={30} alt="" />
                <img src={amex} width={30} alt="" />
              </div>
            </div>
          </div>
        )}
      </motion.div>
      <style jsx="true">{`
        .logoDrower {
          width: 8vh;
          cursor: pointer;
        }
        @keyframes slide-in {
          0% {
            transform: translatex(100%);
          }
          100% {
            transform: translatex(0vh);
          }
        }
        .drawer-container {
          position: initial;
          top: 0;
          right: 0;
          background-color: white;
          width: 100%;
          max-width: 500px;
          height: 100vh;
          z-index: 2;
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
        }
        .drawer-header-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }
        .close-button {
          cursor: pointer;
          border-radius: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .drawer-title {
          text-align: center;
          margin-top: 10px;
          margin-bottom: 10px;
        }
        .drawer-sub-title {
          font-size: 14px;
          font-family: "Artegra Sans", sans-serif;
          margin-bottom: 40px;
        }
        .drawer-product-image {
          width: 40%;
          padding-right: 20px;
        }
        .drawer-product-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          height: 5vh;
          margin-top: 30px;
        }
        .drawer-product-description {
          font-size: 12px;
          text-transform: lowercase;
          width: 40%;
          padding-right: 10px;
        }
        .drawer-product-description-title {
          font-weight: 600;
          text-transform: uppercase;
        }
        .drawer-product-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-right: 15px;
        }
        .icon-change-quantity {
          cursor: pointer;
        }
        .drawer-recap {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          position: initial;
          bottom: 2.5rem;
          width: 100%;
          background-color: white;
        }
        .drawer-recap-description {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          margin-top: 25px;
        }
        .drawer-recap-quantity {
          border-radius: 100%;
          background-color: lightgray;
          height: 40px;
          width: 40px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 10px;
        }
        .drawer-recap-checkout {
          width: 80%;
        }
        .containerListItem {
          overflow-y: auto;
          height: 100%;
        }

        @media (min-width: 768px) {
          .drawer-container {
            width: 30%%;
          }
          .drawer-recap {
            flex-direction: column;
          }
          .drawer-recap-description {
            justify-content: center;
            width: auto;
            margin: 0;
            margin-top: 25px;
          }
          .drawer-recap-checkout {
            width: 100%;
          }
          .drawer-recap-checkout button {
            height: 40px !important;
          }
          .drawer-product-container {
            height: 10vh;
          }
          .containerListItem {
            overflow-y: auto;
          }
        }
      `}</style>
    </>
  )
}

export default Drawer
