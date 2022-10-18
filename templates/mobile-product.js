import React from "react";
//SWIPER
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
//NAVIGATE
import { FormattedNumber } from "react-intl";
//FORMAT MESSAGE
import { FormattedMessage as OriginalFormattedMessage } from "react-intl";
import BottomSheet from "./bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";
//ICON
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
//STORE BOUTIQUES
import { stores } from "../data/stores";
//ICONS
import RowLeft from "../assets/images/product-page/angle-left.png";
import RowRight from "../assets/images/product-page/angle-right.png";

//COMPONENTS
import Label from "../components/label";
import ProductIcon from "../components/product-icon";
import SliderRelatedProducts from "../components/slider-related-products";
import Footer from "../components/footer";

const MobileProductTemplate = props => {
  const {
    shopifyProducts,
    shopifyProduct,
    buy,
    askForPrice,
    relatedProducts,
    collectionHandle,
    accordion,
    setAccordion,
  } = props;
  //SWIPER NAVIGATION
  // const indexSlide = shopifyProducts.findIndex(
  //   product => product.handle === shopifyProduct.handle
  // );
  // const swipeToProduct = swiper => {
  //   let index = indexSlide;
  //   if (swiper.swipeDirection === "prev" || swiper === "prev") {
  //     index = indexSlide === 0 ? shopifyProducts.length - 1 : indexSlide - 1;
  //   } else if (swiper.swipeDirection === "next" || swiper === "next") {
  //     index = indexSlide === shopifyProducts.length - 1 ? 0 : indexSlide + 1;
  //   }
  //   // if (index < shopifyProducts.length) {
  //   //   navigate(
  //   //     `/en/collections/${collectionHandle}/products/${shopifyProducts[index].handle}`
  //   //   );
  //   // }
  // };
  return (
    <>
      <Swiper
        // initialSlide={indexSlide}
        // onActiveIndexChange={swipeToProduct}
        // loop={true}
        style={{ position: "relative" }}
      >
        {["title"].map((index, i) => (
          <SwiperSlide key={i}>
            <Swiper
              id="swiper-image-pdp"
              style={{ height: "55vh" }}
              className="bg-indice-grey"
              direction={"vertical"}
              loop={true}
              slidesPerView={1}
              pagination={true}
              modules={[Pagination]}
            >
              {shopifyProduct.variants.edges[0].node.product.images.nodes.map(
                (image, index) => (
                  <SwiperSlide key={index}>
                    <img src={image.originalSrc} alt={image.originalSrc} />
                  </SwiperSlide>
                )
              )}
            </Swiper>
          </SwiperSlide>
        ))}
      </Swiper>
      <button onClick={() => swipeToProduct("prev")}>
        <img className="rowLeft" src={RowLeft.src} width={12} alt="row-left" />
      </button>
      <button onClick={() => swipeToProduct("next")}>
        <img
          className="rowRight"
          src={RowRight.src}
          width={12}
          alt="row-right"
        />
      </button>
      <BottomSheet>
        <div className="customStyle mb-10">
          <div className="w-full flex flex-col justify-start items-center">
            <div className="text-indice-red text-xs font-bold italic mackay noToHead">
              {shopifyProduct.vendor}
            </div>
            <div className="ml-1 text-xs uppercase font-bold mt-2">
              {shopifyProduct.title}
            </div>
          </div>
          <div className="text-center text-sm mb-5 mt-2">
            {shopifyProduct.availableForSale &&
            !shopifyProduct.tags.includes("nfs") &&
            shopifyProduct.variants.edges[0].node.quantityAvailable > 0 ? (
              <>
                <FormattedNumber
                  style="currency" // eslint-disable-line
                  value={shopifyProduct.variants.edges[0].node.priceV2.amount}
                  currency={
                    shopifyProduct.variants.edges[0].node.priceV2.currencyCode
                  }
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
          <div className="mt-10">
            <ProductIcon />
          </div>
          <div
            className="md:hidden mt-6 text-xs whitespace-pre-line product-description"
            dangerouslySetInnerHTML={{
              __html: shopifyProduct.descriptionHtml,
            }}
          />
          <div className="text-xs my-5 mb-10">
            <div className="mb-3">
              <FormattedMessage id="product.available.stores" />
            </div>
            <div className="available-store-container">
              <div className="containerStoresPDP">
                <img
                  className="available-store-img"
                  src={stores[1].image.src}
                  alt={stores[1].image.src}
                />
                <div className="textStores">{stores[1].name}</div>
              </div>
              <div className="containerStoresPDP">
                <img
                  className="available-store-img"
                  src={stores[1].image.src}
                  alt={stores[1].image.src}
                />
                <div className="textStores">{stores[1].name}</div>
              </div>
              <div className="containerStoresPDP">
                <img
                  className="available-store-img"
                  src={stores[1].image.src}
                  alt={stores[1].image.src}
                />
                <div className="textStores">{stores[1].name}</div>
              </div>
            </div>
          </div>
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
          {/*{relatedProducts.length > 0 && (*/}
          {/*  <SliderRelatedProducts*/}
          {/*    relatedProducts={relatedProducts}*/}
          {/*    collectionHandle={collectionHandle}*/}
          {/*  />*/}
          {/*)}*/}
        </div>
        <Footer />
      </BottomSheet>

      <style jsx="true">{`
        #swiper-image-pdp .swiper {
          width: 100%;
          height: 100%;
        }

        #swiper-image-pdp .swiper-slide {
          text-align: center;
          font-size: 18px;
          /* Center slide text vertically */
          display: -webkit-box;
          display: -ms-flexbox;
          display: -webkit-flex;
          display: flex;
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          -webkit-justify-content: center;
          justify-content: center;
          -webkit-box-align: center;
          -ms-flex-align: center;
          -webkit-align-items: center;
          align-items: center;
        }

        #swiper-image-pdp .swiper-slide img {
          display: block;
          height: 300px;
          object-fit: cover;
        }

        #swiper-image-pdp .swiper-pagination-bullet {
          background-color: black;
        }

        .rowLeft {
          position: absolute;
          bottom: 18%;
          left: 20px;
          z-index: 2;
        }

        .rowRight {
          position: absolute;
          bottom: 18%;
          right: 20px;
          z-index: 2;
        }
      `}</style>
    </>
  );
};

export default MobileProductTemplate;

const FormattedMessage = ({ values, ...props }) => (
  <OriginalFormattedMessage
    values={{
      b: chunk => <b>{chunk}</b>,
      r: chunk => <b className="text-indice-red">{chunk}</b>,
      ...values,
    }}
    {...props}
  />
);
