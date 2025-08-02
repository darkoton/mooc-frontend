import { Trans, useLingui } from "@lingui/react/macro";
import clsx from "clsx";
// import { useNavigate } from "react-router-dom";

import Container from "@shared/ui/Container/Container";
// import Input from "@shared/ui/Input";
// import IconButton from "@shared/ui/IconButton/IconButton";
// import { routes } from "@app/router/routes";

// import SearchIcon from "@shared/assets/icons/search.svg?react";

import s from "./Hero.module.scss";

export default function Hero() {
  // const navigate = useNavigate();
  const { t } = useLingui();

  return (
    <>
      <section className={s.section}>
        <Container className={s.container}>
          <h1 className={s.title}>
            <Trans>
              <span>Find your free study</span> path in Ukraine & beyond
            </Trans>
          </h1>
          <p className={s.subtitle}>
            <Trans>
              Search 15 000+ no‑cost learning opportunities worldwide
            </Trans>
          </p>
          {/* 
          <Input
            type="search"
            placeholder={t`Search 15 000+ no‑cost learning...`}
            endAdornment={
              <IconButton
                className={s.iconBtn}
                onClick={() => navigate(routes.COURSES)}
              >
                <SearchIcon />
              </IconButton>
            }
            wrapperClassName={s.input}
            name={t`Search course`}
            onClick={() => navigate(routes.COURSES)}
            onFocus={() => navigate(routes.COURSES)}
          /> */}

          <div className={clsx(s.imgWrapper, s.img1Wrapper)}>
            <picture>
              <source
                srcSet={`${require("./assets/images/img1_162x241.webp")} 1x, ${require("./assets/images/img1_162x241@2.webp")} 2x`}
                media="(max-width: 600px)"
                type="image/webp"
              />
              <source
                srcSet={`${require("./assets/images/img1_162x241.png")} 1x, ${require("./assets/images/img1_162x241@2.png")} 2x`}
                media="(max-width: 600px)"
                type="image/png"
              />
              <source
                srcSet={`${require("./assets/images/img1_251x375.webp")} 1x, ${require("./assets/images/img1_251x375@2.webp")} 2x`}
                type="image/webp"
              />
              <source
                srcSet={`${require("./assets/images/img1_251x375.png")} 1x, ${require("./assets/images/img1_251x375@2.png")} 2x`}
                type="image/png"
              />
              <img
                src={require("./assets/images/img1_251x375.png")}
                alt={t`A girl wearing a Ukrainian embroidered shirt gives a thumbs up in front of a laptop with a smile`}
              />
            </picture>
          </div>

          <div className={clsx(s.imgWrapper, s.img2Wrapper)}>
            <picture>
              <source
                srcSet={`${require("./assets/images/img2_251x375.webp")} 1x, ${require("./assets/images/img2_251x375@2.webp")} 2x`}
                type="image/webp"
              />
              <source
                srcSet={`${require("./assets/images/img2_251x375.png")} 1x, ${require("./assets/images/img2_251x375@2.png")} 2x`}
                type="image/png"
              />
              <img
                src={require("./assets/images/img2_251x375.png")}
                alt={t`A young woman working at a laptop in a modern room, looking at the camera`}
              />
            </picture>
          </div>

          <div className={clsx(s.imgWrapper, s.img3Wrapper)}>
            <picture>
              <source
                srcSet={`${require("./assets/images/img3_251x375.webp")} 1x, ${require("./assets/images/img3_251x375@2.webp")} 2x`}
                type="image/webp"
              />
              <source
                srcSet={`${require("./assets/images/img3_251x375.png")} 1x, ${require("./assets/images/img3_251x375@2.png")} 2x`}
                type="image/png"
              />
              <img
                src={require("./assets/images/img3_251x375.png")}
                alt={t`Smiling graduates in gowns and confederate caps hold their diplomas after the ceremony`}
              />
            </picture>
          </div>
        </Container>
      </section>
    </>
  );
}
