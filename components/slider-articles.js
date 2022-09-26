import React from "react"
import {FormattedMessage as OriginalFormattedMessage} from "react-intl"
import {Swiper, SwiperSlide} from 'swiper/react';
import {useMediaQuery} from "react-responsive"
import EffectCarousel from "../utils/effect-carousel.esm"
import {Autoplay} from "swiper"
import Link from "./LanguagesLink"
import mainClasses from "./css/main.module.scss"
import classesEffect from "./css/effect-carousel.module.css"

const SliderArticles = ({data}) => {
    console.log(data);
    const isDesktop = useMediaQuery({query: "(min-width: 768px)"})

    return (
        <>
            <div className={`${mainClasses.mtCustom} ${mainClasses.containerSliderArticles}`}>
                <Swiper
                    className={mainClasses.swiperCarousel}
                    modules={[EffectCarousel, Autoplay]}
                    grabCursor={true}
                    loop={true}
                    loopedSlides={5}
                    slidesPerView={"auto"}
                    autoplay={{delay: 5000, disableOnInteraction: false}}
                >
                    <div className="swiper">
                        <div className="swiper-wrapper">
                            <SwiperSlide>ciao</SwiperSlide>
                            {/*{data.allDatoCmsArticle.edges.map(article => (*/}
                            {/*  <SwiperSlide*/}
                            {/*    className="swiper-slide swiper-slideCustom"*/}
                            {/*    key={article.node.id}*/}
                            {/*    style={{ cursor: "pointer" }}*/}
                            {/*  >*/}
                            {/*    <Link*/}
                            {/*      to={`/magazine/${article.node.handle}`}*/}
                            {/*      key={article.node.id}*/}
                            {/*      className="linkSliderHomeArticle"*/}
                            {/*    >*/}
                            {/*      <div className="swiper-carousel-animate-opacity w-100/100">*/}
                            {/*        <img*/}
                            {/*          className="object-cover w-100/100"*/}
                            {/*          src={*/}
                            {/*            isDesktop*/}
                            {/*              ? article.node.imageheader.url*/}
                            {/*              : article.node.imageheadermobile.url*/}
                            {/*          }*/}
                            {/*          alt=""*/}
                            {/*        />*/}
                            {/*        <div className="slide-content">*/}
                            {/*          <h2 className="text-white">{article.node.title}</h2>*/}
                            {/*          <p className="text-white">{article.node.description}</p>*/}
                            {/*        </div>*/}
                            {/*      </div>*/}
                            {/*    </Link>*/}
                            {/*  </SwiperSlide>*/}
                            {/*))}*/}
                        </div>
                    </div>
                </Swiper>
            </div>
            <div className="ml-1 text-xs mt-6 mb-20 text-center px-5">
                <FormattedMessage id="home.slider_articles.text"/>
            </div>
        </>
    )
}

export default SliderArticles

const FormattedMessage = ({values, ...props}) => (
    <OriginalFormattedMessage
        values={{
            b: chunk => <b>{chunk}</b>,
            ...values,
        }}
        {...props}
    />
)
