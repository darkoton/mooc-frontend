import { Link } from "react-router-dom";
import { Trans, useLingui } from "@lingui/react/macro";

import Container from "@shared/ui/Container/Container";
import { routes } from "@app/router/routes";

import PixelArtDotsIcon from "@shared/assets/icons/pixelArtDots.svg?react";

import s from "./ChoosePath.module.scss";

export default function ChoosePath() {
  const { t } = useLingui();

  return (
    <section className={s.section}>
      <Container>
        <PixelArtDotsIcon className={s.pixelArtDotsIcon} />

        <h2 className={s.title}>
          <Trans>Choose a path</Trans>
        </h2>
        <p className={s.subtitle}>
          <Trans>
            Looking for a specific course or university? Choose your path
          </Trans>
        </p>

        <div className={s.linksWrapper}>
          <Link to={routes.COURSES} className={s.link}>
            <Trans>Explore courses</Trans>

            <div className={s.img1Wrapper}>
              <picture>
                <source
                  srcSet={`${require("./assets/icons/graduationCap_45x29.webp")} 1x, ${require("./assets/icons/graduationCap_45x29@2.webp")} 2x`}
                  media="(max-width: 600px)"
                  type="image/webp"
                />
                <source
                  srcSet={`${require("./assets/icons/graduationCap_45x29.png")} 1x, ${require("./assets/icons/graduationCap_45x29@2.png")} 2x`}
                  media="(max-width: 600px)"
                  type="image/png"
                />
                <source
                  srcSet={`${require("./assets/icons/graduationCap_105x67.webp")} 1x, ${require("./assets/icons/graduationCap_105x67@2.webp")} 2x`}
                  type="image/webp"
                />
                <source
                  srcSet={`${require("./assets/icons/graduationCap_105x67.png")} 1x, ${require("./assets/icons/graduationCap_105x67@2.png")} 2x`}
                  type="image/png"
                />
                <img
                  src={require("./assets/icons/graduationCap_105x67.png")}
                  alt={t`Black academic cap with yellow tassel`}
                />
              </picture>
            </div>
          </Link>
          <Link to="#" className={s.link}>
            <Trans>Discover universities</Trans>

            <div className={s.img2Wrapper}>
              <picture>
                <source
                  srcSet={`${require("./assets/icons/universityBuilding_55x45.webp")} 1x, ${require("./assets/icons/universityBuilding_55x45@2.webp")} 2x`}
                  media="(max-width: 600px)"
                  type="image/webp"
                />
                <source
                  srcSet={`${require("./assets/icons/universityBuilding_55x45.png")} 1x, ${require("./assets/icons/universityBuilding_55x45@2.png")} 2x`}
                  media="(max-width: 600px)"
                  type="image/png"
                />
                <source
                  srcSet={`${require("./assets/icons/universityBuilding_131x107.webp")} 1x, ${require("./assets/icons/universityBuilding_131x107@2.webp")} 2x`}
                  type="image/webp"
                />
                <source
                  srcSet={`${require("./assets/icons/universityBuilding_131x107.png")} 1x, ${require("./assets/icons/universityBuilding_131x107@2.png")} 2x`}
                  type="image/png"
                />
                <img
                  src={require("./assets/icons/universityBuilding_131x107.png")}
                  alt={t`A classic building with columns and a red flag`}
                />
              </picture>
            </div>
          </Link>
        </div>
      </Container>
    </section>
  );
}
