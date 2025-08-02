import { useLingui } from "@lingui/react/macro";

import { routes } from "@app/router/routes";

import Footer from "@widgets/app/Footer";
import Header from "@widgets/app/Header";

import Container from "@shared/ui/Container/Container";
import Breadcrumbs from "@shared/ui/Breadcrumbs";

import ThreeDotsIcon from "@shared/assets/icons/pixelArtDots.svg?react";

import s from "./Career.module.scss";

export default function CareerPage() {
  const { t } = useLingui();

  const breadcrumbs = [
    {
      label: t`Home`,
      href: routes.HOME,
    },
    {
      label: `Information technology`,
      href: `${routes.CATEGORY_CAREERS}/1`,
    },
    {
      label: "Web app developer",
      href: `${routes.CAREER}/1`,
    },
  ];

  return (
    <div className={s.pageWrapper}>
      <Header />
      <main>
        <section>
          <div className={s.container}>
            <div className={s.left}>
              <div className={s.leftInner}>
                <img src={require("./assets/images/career.png")} alt="" />
              </div>
            </div>

            <div className={s.right}>
              <Container>
                <Breadcrumbs items={breadcrumbs} />
                <ThreeDotsIcon />
                <h1>What Does a Web App Developer Do?</h1>
                <p>
                  Today’s science fiction often translates into tomorrow’s
                  reality. The apps that abound today and those in the making
                  creatively use technology to bring alive facets of new and
                  seemingly impossible dreams and ambitions. The path of
                  continuous innovation is laid out by App Developers, who lend
                  their computer software expertise and commercial awareness to
                  meet various human needs from music and food to banking and
                  voter registration.
                </p>
                <div>
                  <p>Average salary</p>
                </div>
                <div>
                  <p>Skill you'll need</p>
                </div>
              </Container>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
