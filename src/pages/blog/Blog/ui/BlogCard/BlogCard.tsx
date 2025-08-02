import { useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";

import { AspectRatioBox } from "@shared/lib/AspectRatioBox/AspectRatioBox";
import { useTranslationsStore } from "@entities/translations";
import { type IBlog } from "@entities/blog";
import { routes } from "@app/router/routes";

import s from "./BlogCard.module.scss";

export default function BlogCard({
  image,
  title,
  body,
  created_at,
  id,
}: IBlog) {
  const { locale } = useTranslationsStore();
  const [description, setDescription] = useState("");

  useLayoutEffect(() => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = body;
    setDescription(tempDiv.textContent || tempDiv.innerText);
  }, [body]);

  const date = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(created_at));

  return (
    <article className={s.card}>
      <AspectRatioBox
        aspectRatio="61 / 24"
        component="header"
        className={s.cardHeader}
      >
        <img src={image} alt={title} />
      </AspectRatioBox>
      <div className={s.cardBody}>
        <h5 className={s.cardTitle}>{title}</h5>
        <p className={s.cardDescription}>{description}</p>
        <footer className={s.cardDate}>{date}</footer>
      </div>

      <Link to={`${routes.BLOG}/${id}`} className={s.cardLink} />
    </article>
  );
}
