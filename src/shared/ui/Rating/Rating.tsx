import ReactStars from "react-stars";

import s from "./Rating.module.scss";

type RatingProps = {
  value: number;
  onChange?: (newRating: number) => void;
  edit?: boolean;
  size?: number;
};

export default function Rating({
  onChange,
  value,
  edit = true,
  size = 40,
}: RatingProps) {
  return (
    <ReactStars
      edit={edit}
      value={value}
      count={5}
      size={size}
      color1="#ECEDEE"
      color2={"#EECD5E"}
      half={false}
      className={s.rating}
      onChange={onChange}
    />
  );
}
