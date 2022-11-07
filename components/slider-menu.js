import React from "react";
import { FormattedMessage } from "react-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import LinkMenu from "../components/linkMenu";
import useMediaQuery from "../hooks/useMediaQuery";

const SliderMenu = () => {
  const isDesktop = useMediaQuery(1024);
  return (
    <>
      {isDesktop ? (
        <div className="sliderMenu">
          <div className="sliderMenu">
            <div className="containerSliderMenu">
              <LinkMenu to="/">
                <FormattedMessage id="sidebar.home" />
              </LinkMenu>
              <LinkMenu to="/collections">
                <FormattedMessage id="sidebar.designers" />
              </LinkMenu>
              <LinkMenu to="/boutiques">
                <FormattedMessage id="sidebar.botiques" />
              </LinkMenu>
              <LinkMenu to="/magazine">
                <FormattedMessage id="sidebar.magazine" />
              </LinkMenu>
              <LinkMenu to="/about">
                <FormattedMessage id="sidebar.about" />
              </LinkMenu>
              <LinkMenu to="/faq">
                <FormattedMessage id="sidebar.faq" />
              </LinkMenu>
            </div>
          </div>
        </div>
      ) : (
        <div className="sliderMenuMobile">
          <Swiper
            slidesPerView={2.2}
            centeredSlides={true}
            spaceBetween={5}
            loop={true}
          >
            <div style={{ cursor: "pointer" }}>
              <SwiperSlide>
                <LinkMenu to="/">
                  <FormattedMessage id="sidebar.home" />
                </LinkMenu>
              </SwiperSlide>
              <SwiperSlide>
                <LinkMenu to="/collections">
                  <FormattedMessage id="sidebar.designers" />
                </LinkMenu>
              </SwiperSlide>
              <SwiperSlide>
                <LinkMenu to="/botiques">
                  <FormattedMessage id="sidebar.botiques" />
                </LinkMenu>
              </SwiperSlide>
              <SwiperSlide>
                <LinkMenu to="/magazine">
                  <FormattedMessage id="sidebar.magazine" />
                </LinkMenu>
              </SwiperSlide>
              <SwiperSlide>
                <LinkMenu to="/about">
                  <FormattedMessage id="sidebar.about" />
                </LinkMenu>
              </SwiperSlide>
              <SwiperSlide>
                <LinkMenu to="/faq">
                  <FormattedMessage id="sidebar.faq" />
                </LinkMenu>
              </SwiperSlide>
            </div>
          </Swiper>
        </div>
      )}
      <style jsx="true">{`
        .sliderMenu {
          padding-bottom: 40px;
          max-width: 90rem;
          margin-left: auto;
          margin-right: auto;
          overflow-x: scroll;
          -ms-overflow-style: none; /* for Internet Explorer, Edge */
          scrollbar-width: none; /* for Firefox */
        }
        
        .sliderMenu::-webkit-scrollbar {
          display: none; /* for Chrome, Safari, and Opera */
        }

        .sliderMenuMobile {
          padding-bottom: 40px;
        }

        .containerSliderMenu {
          display: flex;
          cursor: pointer;
          justify-content: space-between;
          column-gap: 20px;
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

export default SliderMenu;
