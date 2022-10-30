import React, { useEffect, useRef, useState } from "react";
//SWIPER
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, EffectCreative } from "swiper";
//NAVIGATE
import { FormattedNumber } from "react-intl";
//FORMAT MESSAGE
import { FormattedMessage as OriginalFormattedMessage } from "react-intl";
import BottomSheet from "./bottom-sheet";
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
import { css } from "emotion";

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
  console.log(relatedProducts);
  const [isExpanded, setIsExpanded] = useState(false);
  const indexSlide = relatedProducts.findIndex(
    product => product.handle === shopifyProduct.handle
  );
  let index = null;
  const swipeToProduct = swiper => {
    let index = indexSlide;
    if (swiper.swipeDirection === "prev" || swiper === "prev") {
      index = indexSlide === 0 ? relatedProducts.length - 1 : indexSlide - 1;
    } else if (swiper.swipeDirection === "next" || swiper === "next") {
      index = indexSlide === relatedProducts.length - 1 ? 0 : indexSlide + 1;
    }
    // if (index < shopifyProducts.length) {
    //   navigate(
    //     `/collections/${collectionHandle}/products/${shopifyProducts[index].handle}`
    //   );
    // }
  };
  const [heightPage, setHeightPage] = useState(0);
  useEffect(() => {
    setHeightPage(window.innerHeight);
  }, [window.innerHeight]);
  const bottomSheetRef = useRef();
  let bottomSheetScrollTop = bottomSheetRef.current?.scrollTop;
  useEffect(() => {
    bottomSheetScrollTop = 0;
  }, [isExpanded]);
  return (
    <div>
      <Swiper
        initialSlide={indexSlide}
        allowSlideNext={isExpanded}
        allowSlidePrev={isExpanded}
        onActiveIndexChange={swipeToProduct}
        loop={true}
        effect={"creative"}
        creativeEffect={{
          prev: {
            opacity: 0,
          },
          next: {
            opacity: 1,
          },
        }}
        modules={[EffectCreative]}
      >
        {relatedProducts.map(index => (
          <SwiperSlide key={index.id}>
            <Swiper
              id="swiper-image-pdp"
              style={{ height: "100vh", paddingTop: "30%" }}
              className="bg-indice-grey"
              direction={"vertical"}
              loop={true}
              slidesPerView={1}
              pagination={true}
              modules={[Pagination]}
            >
              {index.variants.edges[0].node.product.images.nodes.map(
                (image, index) => (
                  <SwiperSlide key={index}>
                    <img src={image.originalSrc} alt={image.originalSrc} />
                  </SwiperSlide>
                )
              )}
              <button onClick={() => swipeToProduct("prev")}>
                <img
                  className="rowLeft"
                  src={RowLeft.src}
                  width={12}
                  alt="row-left"
                />
              </button>
              <button onClick={() => swipeToProduct("next")}>
                <img
                  className="rowRight"
                  src={RowRight.src}
                  width={12}
                  alt="row-right"
                />
              </button>
            </Swiper>
            <div
              className={css`
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                pointer-events: none;
                z-index: 1;
              `}
            >
              <BottomSheet
                defaultMode="collapsed"
                height={heightPage}
                style={{ pointerEvents: "all" }}
                isExpanded={expanded => setIsExpanded(expanded)}
              >
                <div
                  ref={bottomSheetRef}
                  className="customStyle mb-10"
                  style={{
                    height: "100vh",
                    overflow: isExpanded ? "hidden" : "scroll",
                  }}
                >
                  <div
                    className="flex justify-center"
                    style={{ padding: "10px 0" }}
                  >
                    <div className="slide-icon"></div>
                  </div>
                  <div className="w-full flex flex-col justify-start items-center">
                    <div className="text-indice-red text-xs font-bold italic mackay noToHead">
                      {index.vendor}
                    </div>
                    <div className="ml-1 text-xs uppercase font-bold mt-2">
                      {index.title}
                    </div>
                  </div>
                  <div className="text-center text-sm mb-5 mt-2">
                    {index.availableForSale &&
                    !index.tags.includes("nfs") &&
                    index.variants.edges[0].node.quantityAvailable > 0 ? (
                      <>
                        <FormattedNumber
                          style="currency" // eslint-disable-line
                          value={index.variants.edges[0].node.priceV2.amount}
                          currency={
                            index.variants.edges[0].node.priceV2.currencyCode
                          }
                          minimumFractionDigits={2}
                        />

                        <div>
                          <Label style={{ width: "100%" }} onClick={buy}>
                            <FormattedMessage id="product.buy" />
                          </Label>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="text-xs whitespace-pre-line product-description">
                          <FormattedMessage id="product.specialEdition" />
                        </div>

                        <div>
                          <Label
                            style={{ width: "100%" }}
                            onClick={askForPrice}
                          >
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
                      __html: index.descriptionHtml,
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
                          src={stores[1].image.src.src}
                          alt={stores[1].image.src.src}
                        />
                        <div className="textStores">{stores[1].name}</div>
                      </div>
                      <div className="containerStoresPDP">
                        <img
                          className="available-store-img"
                          src={stores[1].image.src.src}
                          alt={stores[1].image.src.src}
                        />
                        <div className="textStores">{stores[1].name}</div>
                      </div>
                      <div className="containerStoresPDP">
                        <img
                          className="available-store-img"
                          src={stores[1].image.src.src}
                          alt={stores[1].image.src.src}
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
                        <FontAwesomeIcon
                          icon={faMinus}
                          className="containerIcon"
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faPlus}
                          className="containerIcon"
                        />
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
                        <FontAwesomeIcon
                          icon={faMinus}
                          className="containerIcon"
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faPlus}
                          className="containerIcon"
                        />
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
                  {relatedProducts.length > 0 && (
                    <SliderRelatedProducts
                      relatedProducts={relatedProducts}
                      collectionHandle={collectionHandle}
                    />
                  )}
                  <Footer />
                </div>
              </BottomSheet>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <style jsx="true">{`
        .slide-icon {
          border: 2px solid grey;
          width: 30px;
          border-radius: 10px;
        }
        .rowLeft {
          position: absolute;
          bottom: 35%;
          left: 20px;
          z-index: 2;
        }

        .rowRight {
          position: absolute;
          bottom: 35%;
          right: 20px;
          z-index: 2;
        }

        .textStores {
          width: 100px;
          margin: 0 auto;
        }

        .available-store-img {
          border-radius: 20px;
          height: 55px;
          margin: 0 auto;
          width: 100px;
          object-fit: fill;
        }

        .containerAccordion {
          display: flex;
          justify-content: space-between;
        }
        .available-store-container {
          display: flex;
          width: 100%;
          text-align: center;
          gap: 1rem;
        }
      `}</style>
    </div>
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
