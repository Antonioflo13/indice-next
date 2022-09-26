import {
  FormattedMessage as OriginalFormattedMessage,
  FormattedNumber,
} from "react-intl"
import Label from "../components/label"
import "swiper/swiper-bundle.min.css"
import "swiper/swiper.min.css"
import SliderRelatedProducts from "../components/slider-related-products"
import React from "react"
import { stores } from "../data/stores"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons"
//COMPONENTS
import ProductIcon from "../components/product-icon"

const DesktopProduct = props => {
  const {
    shopifyProduct,
    buy,
    askForPrice,
    mainImage,
    relatedProducts,
    collectionHandle,
    accordion,
    setAccordion,
  } = props

  return (
    <>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-20 mt-4 customTemplate">
        <div className="flex flex-col justify-start items-center buyContainer">
          <div className="text-indice-red text-xs font-bold italic mackay noToHead mt-2">
            {shopifyProduct.vendor}
          </div>
          <div className="ml-1 text-xs uppercase font-bold mt-2">
            {shopifyProduct.title}
          </div>
          <div className="flex items-center text-sm flex-col mb-5">
            {shopifyProduct.availableForSale &&
            !shopifyProduct.tags.includes("nfs") &&
            shopifyProduct.variants[0].quantityAvailable > 0 ? (
              <>
                <FormattedNumber
                  style="currency" // eslint-disable-line
                  value={shopifyProduct.variants[0].priceV2.amount}
                  currency={shopifyProduct.variants[0].priceV2.currencyCode}
                  minimumFractionDigits={2}
                />

                <div className="button-price">
                  <Label onClick={buy}>
                    <FormattedMessage id="product.buy" />
                  </Label>
                </div>
              </>
            ) : (
              <>
                <div className="text-xs whitespace-pre-line product-description">
                  <FormattedMessage id="product.specialEdition" />
                </div>

                <div className="button-price">
                  <Label onClick={askForPrice}>
                    <FormattedMessage id="product.contact_us" />
                  </Label>
                </div>
              </>
            )}
          </div>
          <ProductIcon />
          <div
            className="hidden md:block my-4 text-xs whitespace-pre-line product-description"
            dangerouslySetInnerHTML={{
              __html: shopifyProduct.descriptionHtml,
            }}
          />
          <div style={{ alignSelf: "start", width: "100%" }}>
            <div className="text-xs my-5 mb-10">
              <div className="mb-3">
                <FormattedMessage id="product.available.stores" />
              </div>
              <div className="available-store-container">
                <div className="containerStoresPDP">
                  <img
                    className="available-store-img"
                    src={stores[1].image.src}
                  />
                  <div className="textStores">{stores[1].name}</div>
                </div>
                <div className="containerStoresPDP">
                  <img
                    className="available-store-img"
                    src={stores[1].image.src}
                  />
                  <div className="textStores">{stores[1].name}</div>
                </div>
                <div className="containerStoresPDP">
                  <img
                    className="available-store-img"
                    src={stores[1].image.src}
                  />
                  <div className="textStores">{stores[1].name}</div>
                </div>
              </div>
            </div>
            <div className="container-accordion-desktop">
              <div className="flex flex-col mb-2">
                <div
                  className="containerAccordion"
                  onClick={() =>
                    setAccordion({ ...accordion, size: !accordion.size })
                  }
                >
                  <div className="font-bold uppercase text-sm">
                    <FormattedMessage id="product.size.title" />
                  </div>
                  {accordion.size ? (
                    <FontAwesomeIcon icon={faMinus} className="containerIcon" />
                  ) : (
                    <FontAwesomeIcon icon={faPlus} className="containerIcon" />
                  )}
                </div>
                {accordion.size && (
                  <>
                    <div className="text-xs">
                      <FormattedMessage id="product.." />
                    </div>
                  </>
                )}
              </div>
              <div className="flex flex-col">
                <div
                  className="containerAccordion"
                  onClick={() =>
                    setAccordion({
                      ...accordion,
                      shipping: !accordion.shipping,
                    })
                  }
                >
                  <div className="font-bold uppercase text-sm">
                    <FormattedMessage id="product.shipping.title" />
                  </div>
                  {accordion.shipping ? (
                    <FontAwesomeIcon icon={faMinus} className="containerIcon" />
                  ) : (
                    <FontAwesomeIcon icon={faPlus} className="containerIcon" />
                  )}
                </div>
                {accordion.shipping && (
                  <>
                    <div className="text-xs">
                      <FormattedMessage id="product.." />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Other info and main image */}
        <div className="w-full flex flex-col-reverse md:flex-col imageContainer">
          <div className="hidden md:block">{mainImage}</div>
        </div>
      </div>
      <div className="md:hidden my-8 w-full flex items-center justify-center">
        {shopifyProduct.availableForSale &&
        !shopifyProduct.tags.includes("nfs") &&
        shopifyProduct.variants[0].quantityAvailable > 0 ? (
          <Label onClick={buy}>
            <FormattedMessage id="product.buy" />
          </Label>
        ) : (
          <Label onClick={askForPrice}>
            <FormattedMessage id="product.contact_us" />
          </Label>
        )}
      </div>
      <div
        className="md:hidden mt-12 text-xs whitespace-pre-line product-description"
        dangerouslySetInnerHTML={{ __html: shopifyProduct.descriptionHtml }}
      />

      <div className="my-20 text-xs text-center px-5">
        <FormattedMessage id="home.slider_monthly.text" />
      </div>
      {relatedProducts.length > 0 && (
        <SliderRelatedProducts
          relatedProducts={relatedProducts}
          collectionHandle={collectionHandle}
        />
      )}
      <style jsx="true">
        {`
          .buyContainer {
            width: 40%;
          }
          .imageContainer {
            width: 60%;
          }
          .customTemplate {
            display: flex;
            justify-content: center;
          }
        `}
      </style>
    </>
  )
}

export default DesktopProduct

const FormattedMessage = ({ values, ...props }) => (
  <OriginalFormattedMessage
    values={{
      b: chunk => <b>{chunk}</b>,
      r: chunk => <b className="text-indice-red">{chunk}</b>,
      ...values,
    }}
    {...props}
  />
)
