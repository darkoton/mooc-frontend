import { Trans } from "@lingui/react/macro";

import Container from "@shared/ui/Container/Container";
import style from "./style.module.scss";
import Button from "@shared/ui/NewButton";

import ArrowRightIcon from "./assets/images/arrowRight.svg?react";

const Touch = () => {
  return (
    <div className={style.touch}>
      <img
        className={style.decor}
        src={require("./assets/images/decor.svg")}
        alt="Decor"
      />

      <Container>
        <div className={style.body}>
          <h2 className={style.title}>
            <Trans>Get in touch</Trans>
          </h2>
          <p className={`h6 ${style.text}`}>
            <Trans>Get in contact with our client services</Trans>
          </p>

          <Button className={style.button}>
            <span>
              <Trans>GET STARTED</Trans>
            </span>
            <ArrowRightIcon className={style.ButtonArrow} />
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default Touch;
