import React from "react";
//FORMATTED MESSAGES
import { FormattedMessage } from "react-intl";
//ICONS
import Badge from "../assets/images/product-page/badge.png";
import Delivery from "../assets/images/product-page/delivery.png";
import HandShake from "../assets/images/product-page/hand-shake.png";
import Transaction from "../assets/images/product-page/transaction.png";
import Worldwide from "../assets/images/product-page/worldwide.png";

const ProductIcon = () => {
  const icons = [
    {
      icon: Badge,
      position: "1",
      alt: "Badge",
      description: "product.icon.original.certified",
    },
    {
      icon: Delivery,
      position: "2",
      alt: "Badge",
      description: "product.trackable.orders",
    },
    {
      icon: Transaction,
      position: "3",
      alt: "Badge",
      description: "product.secure.payment",
    },
    {
      icon: HandShake,
      position: "4",
      alt: "Badge",
      description: "product.money.back",
    },
    {
      icon: Worldwide,
      position: "5",
      alt: "Badge",
      description: "product.icon.worldwide.shipping",
    },
  ];
  return (
    <>
      <div className="flex justify-between items-center w-full mt-4 mb-4">
        {icons.map((icon, index) => (
          <div
            key={index}
            className={`"flex flex-col justify-center items-center mx-2 order-${icon.position}`}
          >
            <div className="flex justify-center">
              <img
                className="icon"
                key={index}
                src={icon.icon.src}
                alt={icon.alt}
              />
            </div>
            <div className="text-container">
              <FormattedMessage id={icon.description} />
            </div>
          </div>
        ))}
      </div>
      <style jsx="true">{`
        .icon {
          width: 35px !important;
        }
        .text-container {
          font-size: 0.5rem;
          text-align: center;
        }

        @media (min-width: 768px) {
          .icon {
            width: 35px;
          }
          .text-container {
            font-size: 0.65rem;
          }
        }
      `}</style>
    </>
  );
};

export default ProductIcon;
