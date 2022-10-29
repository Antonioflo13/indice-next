import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { data } from "../data/queryHomeCollection";
import { FormattedMessage as OriginalFormattedMessage } from "react-intl";
import Link from "next/link";

const SliderHomeCollection = () => {
  const products = data.shopifyCollection.products;

  return (
    <>
      <div className="ml-1 text-xs uppercase font-bold mt-2 text-center">
        <FormattedMessage id="home.slider_monthly.title" />
      </div>
      <div className="sliderCollection">
        <Swiper
          slidesPerView={2.3}
          centeredSlides={true}
          spaceBetween={90}
          loop={true}
          className="mySwiper"
          breakpoints={{
            768: {
              slidesPerView: 4,
              spaceBetween: 90,
              centeredSlides: false,
              loop: true,
            },
          }}
        >
          {products?.map(item => (
            <SwiperSlide key={item.id}>
                <Link
                    href={{
                        pathname: `/collections/[collection]/[product]`,
                        query: { collection: item.vendor, product: item.handle },
                    }}
                >
                <div className="container-slider">
                  <img
                    className="img-product"
                    src={item.images[0].originalSrc}
                    alt="product"
                  />
                  <div className="text-indice-red text-xs font-bold italic mackay noToHead">
                    {item.vendor}
                  </div>
                  <div className="text-xs uppercase font-bold">
                    {item.title}
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="ml-1 text-xs mt-6 mb-10 text-center px-5">
        <FormattedMessage id="home.slider_monthly.text" />
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
        .sliderCollection {
          padding-bottom: 40px;
          max-width: 90rem;
          margin-left: auto;
          margin-right: auto;
        }

        .swiper-wrapper {
          transform: translate3d(-1328.28px, 0px, 0px);
        }

        .swiper-slide {
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

        .swiper-slide img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      `}</style>
    </>
  );
};

export default SliderHomeCollection;

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
