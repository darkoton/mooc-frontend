import ReactStars from "react-stars";

import s from "./Rating.module.scss";

type RatingProps = {
  value: number
  onChange: (newRating: number) => void
}

export default function Rating({ onChange, value }: RatingProps) {
  return (
    <ReactStars
      value={value}
      count={5}
      size={40}
      color1="#ECEDEE"
      color2={"#EECD5E"}
      half={false}
      className={s.rating}
      onChange={onChange}
    />
  );
}
