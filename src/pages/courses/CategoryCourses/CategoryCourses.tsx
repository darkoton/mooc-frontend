import Header from "@widgets/app/Header";
import Footer from "@widgets/app/Footer";
import CategoryCourses from "@widgets/courses/CategoryCourses";

import s from "./CategoryCourses.module.scss";

export default function CategoryCoursesPage() {
  return (
    <div className={s.pageWrapper}>
      <Header />
      <CategoryCourses />
      <Footer />
    </div>
  );
}
