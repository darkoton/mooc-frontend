import Header from "@widgets/app/Header";
import Footer from "@widgets/app/Footer";
import Courses from "@widgets/courses/Courses";

import s from "./Courses.module.scss";

export default function CoursesPage() {
  return (
    <div className={s.pageWrapper}>
      <Header />
      <Courses />
      <Footer />
    </div>
  );
}
