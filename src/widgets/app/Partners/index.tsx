import { useState } from "react";
import clsx from "clsx";
import { Swiper, SwiperSlide } from "swiper/react";
import { Trans, useLingui } from "@lingui/react/macro";

import Container from "@shared/ui/Container/Container";

import style from "./style.module.scss";
import "../../../../node_modules/swiper/swiper.css";

type Slide = {
  img: string;
  logo: string;
  city: string;
};

const Partners = () => {
  const { t } = useLingui();

  const slides: Slide[] = [
    {
      img: require("./assets/images/slide-1.png"),
      logo: require("./assets/images/slide-1-logo.png"),
      city: t`Kyiv`,
    },
    {
      img: require("./assets/images/slide-2.png"),
      logo: require("./assets/images/slide-2-logo.png"),
      city: t`Kharkiv`,
    },
    {
      img: require("./assets/images/slide-3.png"),
      logo: require("./assets/images/slide-3-logo.png"),
      city: t`Lviv`,
    },
  ];

  const [currentSlide, setCurrentSlide] = useState<number>(1);

  return (
    <div className={style.partners}>
      <Container>
        <div className={style.body}>
          <img
            src={require("./assets/images/graphics.svg")}
            width={42}
            height={43}
            alt="Decor"
            className={style.decor}
          />

          <h2 className={`h2-bold-responsive ${style.title}`}>
            <Trans>Our partners</Trans>
          </h2>

          <p className={`p-responsive ${style.text}`}>
            <Trans>Access special courses and discounts</Trans>
          </p>

          <Swiper
            onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex)}
            slidesPerView={"auto"}
            initialSlide={1}
            centeredSlides={true}
            className={style.slider}
            breakpoints={{
              320: {
                spaceBetween: 79,
                centeredSlides: false,
              },
              640: {
                spaceBetween: 24,
                centeredSlides: true,
              },
            }}
          >
            {slides.map((slide) => (
              <SwiperSlide key={slide.city} className={style.slide}>
                <img
                  src={slide.img}
                  alt="Univer"
                  className={style.slideImg}
                  width={325}
                  height={263}
                />

                <div className={style.slideInfo}>
                  <img
                    src={slide.logo}
                    alt="Logo"
                    className={style.slideLogo}
                    width={"auto"}
                    height={40}
                  />

                  <div className={style.slideTexts}>
                    <h4 className="h4-responsive">
                      <Trans>University of</Trans>
                    </h4>
                    <h5 className="h3-bold-responsive">{slide.city}</h5>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className={style.pagination}>
            {slides.map((i, index) => {
              return (
                <div
                  key={i.city}
                  className={clsx(
                    style.paginationMark,
                    currentSlide === index && style.active
                  )}
                ></div>
              );
            })}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Partners;
