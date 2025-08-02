import { useLingui } from "@lingui/react/macro";

import Header from "@widgets/app/Header";
import Footer from "@widgets/app/Footer";
import Container from "@shared/ui/Container/Container";
// import Pagination from "@shared/ui/Pagination/Pagination";
import BlogCard from "./ui/BlogCard/BlogCard";
import PageTopSection from "@widgets/app/PageTopSection";
import BlogCardSkeleton from "./ui/BlogCardSkeleton/BlogCardSkeleton";
import { routes } from "@app/router/routes";
import { useBlog } from "./hooks/useBlog";

import s from "./Blog.module.scss";

function BlogPage() {
  const { t } = useLingui();

  const { blogs, isLoading } = useBlog();

  return (
    <div className={s.pageWrapper}>
      <Header />
      <main>
        <PageTopSection
          breadcrumbs={[{ href: routes.BLOG, label: t`Blog` }]}
          title={t`Blog`}
          className={s.topSection}
        />
        <section className={s.mainSection}>
          <Container>
            <div className={s.blogGrid}>
              {isLoading
                ? Array.from(Array(10)).map((_, i) => (
                    <BlogCardSkeleton key={i} />
                  ))
                : blogs.map((blog) => <BlogCard key={blog.id} {...blog} />)}
            </div>

            {/* {!isLoading && totalPages > 1 && (
              <Pagination
                pageCount={totalPages}
                forcePage={page - 1}
                onPageChange={handlePageChange}
              />
            )} */}
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default BlogPage;
