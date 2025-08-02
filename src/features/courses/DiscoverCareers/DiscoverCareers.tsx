import { Link } from "react-router-dom";

import Container from "@shared/ui/Container/Container";

import PixelArtDotsIcon from "@shared/assets/icons/pixelArtDots.svg?react";

import s from "./DiscoverCareers.module.scss";

export default function DiscoverCareers() {
  return (
    <section className={s.section}>
      <Container className={s.container}>
        <div className={s.left}>
          <h2 className={s.title}>
            <PixelArtDotsIcon />
            Discover the careers you’ll have access to
          </h2>
          <div className={s.careers}>
            <Link to="#" className={s.careerLink}>
              Developer
            </Link>
            <Link to="#" className={s.careerLink}>
              Community manager
            </Link>
            <Link to="#" className={s.careerLink}>
              Technician
            </Link>
            <Link to="#" className={s.careerLink}>
              Hacker
            </Link>
            <Link to="#" className={s.careerLink}>
              Analyst
            </Link>
          </div>
        </div>
        <div className={s.right}>
          <div className={s.imgWrapper}>
            <img
              src={require("./assets/images/decor.jpg")}
              alt="Усміхнена жінка у вишиванці показує жест 'клас' перед ноутбуком"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
