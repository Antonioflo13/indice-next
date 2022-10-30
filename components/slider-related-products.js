import React from "react";
//SWIPER
import { Swiper, SwiperSlide } from "swiper/react";
import { FormattedMessage as OriginalFormattedMessage } from "react-intl";
import Link from "next/link";

const sliderRelatedProducts = props => {
  const { relatedProducts, collectionHandle } = props;
  return (
    <>
      <div>
        <div className="mt-16 text-2xs font-bold">
          <FormattedMessage id="product.related_products_title" />
        </div>
        <div>
          <Swiper
            id="swiper-related-products"
            slidesPerView={2}
            centeredSlides={true}
            spaceBetween={90}
            loop={true}
            breakpoints={{
              768: {
                slidesPerView: 4,
                spaceBetween: 90,
                centeredSlides: false,
                loop: true,
              },
            }}
          >
            <div></div>
            {/*{relatedProducts?.map(item => (*/}
            {/*  <SwiperSlide key={item.id}>*/}
            {/*    <Link*/}
            {/*      href={{*/}
            {/*        pathname: `/collections/[collection]/[product]`,*/}
            {/*        query: {*/}
            {/*          collection: collectionHandle,*/}
            {/*          product: item.handle,*/}
            {/*        },*/}
            {/*      }}*/}
            {/*    >*/}
            {/*      <div className="container-slider">*/}
            {/*        <img*/}
            {/*          className="img-product"*/}
            {/*          src={*/}
            {/*            item.variants.edges[0].node.product.images.nodes[0]*/}
            {/*              .originalSrc*/}
            {/*          }*/}
            {/*          alt="product"*/}
            {/*        />*/}
            {/*        <div className="text-indice-red text-xs font-bold italic mackay noToHead">*/}
            {/*          {item.vendor}*/}
            {/*        </div>*/}
            {/*        <div className="text-xs uppercase font-bold">*/}
            {/*          {item.title}*/}
            {/*        </div>*/}
            {/*      </div>*/}
            {/*    </Link>*/}
            {/*  </SwiperSlide>*/}
            {/*))}*/}
          </Swiper>
        </div>
      </div>
      <style jsx="true">{`
        .container-slider {
          cursor: pointer;
          width: 100%;
        }
        @media (max-width: 768px) {
          .container-slider {
            cursor: pointer;
            width: 160px;
          }
        }
        #swiper-related-products .sliderCollection {
          padding-bottom: 40px;
          max-width: 90rem;
          margin-left: auto;
          margin-right: auto;
        }

        #swiper-related-products .swiper-wrapper {
          transform: translate3d(-1328.28px, 0px, 0px);
        }

        #swiper-related-products .swiper-slide {
          text-align: center;
          font-size: 18px;
          background: #fff;
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

        #swiper-related-products .swiper-slide img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      `}</style>
    </>
  );
};

export default sliderRelatedProducts;

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
