import { AspectRatioBox } from "@shared/lib/AspectRatioBox/AspectRatioBox";
import Skeleton from "@shared/ui/Skeleton";

import s from "./BlogCardSkeleton.module.scss";

export default function BlogCardSkeleton() {
  return (
    <article className={s.article}>
      <AspectRatioBox
        aspectRatio="61 / 24"
        component="header"
        className={s.cardHeader}
      >
        <Skeleton height={"100%"} />
      </AspectRatioBox>
      <div className={s.cardBody}>
        <Skeleton
          width={"40%"}
          style={{ marginBottom: 16 }}
          className={s.title}
        />
        <Skeleton style={{ marginBottom: 8 }} className={s.description} />
        <Skeleton style={{ marginBottom: 16 }} />
        <Skeleton width={"80px"} height={15} />
      </div>
    </article>
  );
}
