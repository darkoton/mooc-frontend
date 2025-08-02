import { Trans, useLingui } from "@lingui/react/macro";

import Footer from "@widgets/app/Footer";
import Header from "@widgets/app/Header";
import { useBlogItem } from "./hooks/useBlogItem";
import ImgWithFallback from "@shared/ui/ImgWithFallback/ImgWithFallback";
import Container from "@shared/ui/Container/Container";
import PageTopSection from "@widgets/app/PageTopSection";
import { routes } from "@app/router/routes";

import s from "./BlogItem.module.scss";

export default function BlogItemPage() {
  const { t } = useLingui();
  const { blog } = useBlogItem();

  if (!blog) {
    return (
      <p>
        <Trans>Article not found</Trans>
      </p>
    );
  }

  return (
    <div className={s.pageWrapper}>
      <Header />
      <main>
        <PageTopSection
          title={blog.title}
          breadcrumbs={[{ label: t`Blog`, href: routes.BLOG }]}
          className={s.topSection}
        />
        <section className={s.mainSection}>
          <Container className={s.container}>
            <ImgWithFallback
              src={blog.image}
              alt={blog.title}
              style={{
                aspectRatio: "16 / 9",
                width: "100%",
                objectFit: "cover",
                borderRadius: 8,
              }}
            />
            <div
              className={s.blogBody}
              dangerouslySetInnerHTML={{ __html: blog.body }}
            />
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
