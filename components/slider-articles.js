//REACT
import React from "react";
//NEXT
import Link from "next/link";
import Image from "next/image";
//HOOKS
import useMediaQuery from "../hooks/useMediaQuery";
//INTL
import { FormattedMessage as OriginalFormattedMessage } from "react-intl";
//SWIPER
import { Swiper, SwiperSlide } from "swiper/react";
import EffectCarousel from "../utils/effect-carousel.esm";
import { Autoplay } from "swiper";
//CSS
import mainClasses from "./scss/main.module.scss";

const SliderArticles = ({ articles }) => {
  const isDesktop = useMediaQuery(768);
  return (
    <>
      <div className={mainClasses.mtCustom}>
        <Swiper
          modules={[EffectCarousel, Autoplay]}
          effect="carousel"
          grabCursor={true}
          loop={true}
          loopedSlides={5}
          slidesPerView={"auto"}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
        >
          <div className={mainClasses.swiper}>
            <div className="swiper-wrapper">
              {articles?.map(article => (
                <SwiperSlide
                  className={`${mainClasses["swiper-slide"]} ${mainClasses["swiper-slideCustom"]}`}
                  key={article.id}
                  style={{ cursor: "pointer" }}
                >
                  <Link
                    href={{
                      pathname: "/magazine/[article]",
                      query: { article: article.handle },
                    }}
                    key={article.id}
                    className={mainClasses.linkSliderHomeArticle}
                  >
                    <div className="swiper-carousel-animate-opacity">
                      <div className="image-container">
                        <Image
                          className="object-cover rounded-md"
                          fill="true"
                          style={{ objectFit: "cover" }}
                          placeholder="blur"
                          blurDataURL={article.imageheader.url}
                          sizes="100%"
                          priority={true}
                          src={
                            isDesktop
                              ? article.imageheader.url
                              : article.imageheadermobile?.url
                          }
                          alt="magazine-image"
                        />
                      </div>
                      <div className={mainClasses["slide-content"]}>
                        <h2 className="text-white">{article.title}</h2>
                        <p className="text-white">{article.description}</p>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </div>
          </div>
        </Swiper>
      </div>
      <div className="ml-1 text-xs mt-6 mb-20 text-center px-5">
        <FormattedMessage id="home.slider_articles.text" />
      </div>
      <style jsx="true">{`
        .image-container {
        position: relative;
          height: 347px;
        }

        @media (max-width: 768px) {
          .image-container {
            height: 400px;
          }
        }
      `}</style>
    </>
  );
};

export default SliderArticles;

const FormattedMessage = ({ values, ...props }) => (
  <OriginalFormattedMessage
    values={{
      b: chunk => <b>{chunk}</b>,
      ...values,
    }}
    {...props}
  />
);
