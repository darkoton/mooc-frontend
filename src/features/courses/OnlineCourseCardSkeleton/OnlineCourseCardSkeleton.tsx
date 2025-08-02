import s from "./OnlineCourseCardSkeleton.module.scss";

export default function OnlineCourseCardSkeleton() {
  return (
    <article className={s.article}>
      <div className={s.img} />
      <div className={s.providerRow} />
      <div className={s.title} />
      <div className={s.bottomRow} />
    </article>
  );
}
