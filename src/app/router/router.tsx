import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

import { routes } from "./routes";
import { RootLayout } from "./rootLayout";

const HomePage = lazy(() => import("@pages/app/Home"));
const CoursePage = lazy(() => import("@pages/courses/Course"));
// const SearchPage = lazy(() => import("@pages/app/Search"));
const CoursesPage = lazy(() => import("@pages/courses/Courses"));
const CoursesSearchPage = lazy(() => import("@pages/courses/Search"));
const CategoryCoursesPage = lazy(
  () => import("@pages/courses/CategoryCourses")
);
const SignupPage = lazy(() => import("@pages/auth/Signup"));
const LoginPage = lazy(() => import("@pages/auth/Login"));
const BlogPage = lazy(() => import("@pages/blog/Blog"));
const BlogItemPage = lazy(() => import("@pages/blog/BlogItem"));
const FaqPage = lazy(() => import("@pages/faq/Faq"));
const CategoryCareersPage = lazy(
  () => import("@pages/careers/CategoryCareers")
);
const CareerPage = lazy(() => import("@pages/careers/Career"));

export const router = createBrowserRouter([
  {
    path: "*",
    element: <Navigate to={routes.HOME} />,
  },
  {
    element: <RootLayout />,
    children: [
      {
        path: routes.HOME,
        Component: HomePage,
      },
      // {
      //   path: routes.SEARCH,
      //   Component: SearchPage,
      // },
      {
        path: `${routes.COURSE}/:uuid`,
        Component: CoursePage,
      },
      {
        path: routes.COURSES,
        Component: CoursesPage,
      },
      {
        path: `${routes.CATEGORY_COURSES}/:category`,
        Component: CategoryCoursesPage,
      },
      {
        path: `${routes.COURSES_SEARCH}/:category?/:subCategory?`,
        Component: CoursesSearchPage,
      },
      {
        path: routes.SIGN_UP,
        Component: SignupPage,
      },
      {
        path: routes.LOGIN,
        Component: LoginPage,
      },
      {
        path: routes.BLOG,
        Component: BlogPage,
      },
      {
        path: `${routes.BLOG}/:id`,
        Component: BlogItemPage,
      },
      {
        path: routes.FAQ,
        Component: FaqPage,
      },
      {
        path: `${routes.CATEGORY_CAREERS}/:id`,
        Component: CategoryCareersPage,
      },
      {
        path: `${routes.CAREER}/:id`,
        Component: CareerPage,
      },
    ],
  },
]);
