import ReactStars from "react-stars";

import s from "./Rating.module.scss";

export default function Rating() {
  return (
    <ReactStars
      count={5}
      size={40}
      color1="#ECEDEE"
      color2={"#EECD5E"}
      half={false}
      className={s.rating}
    />
  );
}
