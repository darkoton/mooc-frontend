import Container from "@shared/ui/Container/Container";
import style from "./style.module.scss";
import { Link } from "react-router";
import { Trans } from "@lingui/react/macro";
import { routes } from "@app/router/routes";

const Footer = () => {
  return (
    <footer className={style.footer}>
      <Container>
        <div className={style.body}>
          <div className={style.main}>
            <Link to={"/"}>
              <img className={style.logo} src="/logo.svg" alt="logo" />
            </Link>

            <div className={style.contacts}>
              <Link to={"#"} className={style.contact}>
                <img src={require("./assets/icons/tiktok.png")} alt="" />
              </Link>
              <Link to={"#"} className={style.contact}>
                <img src={require("./assets/icons/instagram.png")} alt="" />
              </Link>
              <Link to={"#"} className={style.contact}>
                <img src={require("./assets/icons/telegram.png")} alt="" />
              </Link>
            </div>
          </div>
          <div className={style.col}>
            <Link className={style.link} to={routes.HOME}>
              <Trans>Home</Trans>
            </Link>
            <Link className={style.link} to={routes.COURSES}>
              <Trans>Courses</Trans>
            </Link>
            <Link className={style.link} to={"#"}>
              <Trans>Discover careers</Trans>
            </Link>
            <Link className={style.link} to={"#"}>
              <Trans>Contact</Trans>
            </Link>
            <Link className={style.link} to={"#"}>
              <Trans>Faq</Trans>
            </Link>
          </div>

          <div className={`${style.contacts} ${style.contactsMob}`}>
            <Link to={"#"} className={style.contact}>
              <img src={require("./assets/icons/tiktok.png")} alt="" />
            </Link>
            <Link to={"#"} className={style.contact}>
              <img src={require("./assets/icons/instagram.png")} alt="" />
            </Link>
            <Link to={"#"} className={style.contact}>
              <img src={require("./assets/icons/telegram.png")} alt="" />
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
