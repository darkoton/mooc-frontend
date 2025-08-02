import Skeleton from "@shared/ui/Skeleton";

import s from "./CareerCardSkeleton.module.scss";

export default function CareerCardSkeleton() {
  return (
    <article className={s.article}>
      <Skeleton height={200} style={{ borderRadius: 4, marginBottom: 8 }} />
      <Skeleton height={41} width={"60%"} style={{ marginBottom: 24 }} />
      <Skeleton height={24} width={"40%"} style={{ marginBottom: 8 }} />
      <Skeleton height={32} style={{ marginBottom: 24 }} />
      <Skeleton height={48} />
    </article>
  );
}
