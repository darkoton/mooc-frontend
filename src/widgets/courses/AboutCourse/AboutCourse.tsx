import { type ICourse } from "@entities/course";
import CourseDetails from "@features/courses/CourseDetails";
import DiscoverCareers from "@features/courses/DiscoverCareers";
import DiscoverCourses from "@features/courses/DiscoverCourses";

export default function AboutCourse({
  isLoading,
  course,
}: {
  isLoading: boolean;
  course: ICourse | null;
}) {
  return (
    <>
      <CourseDetails isLoading={isLoading} course={course} />
      <DiscoverCourses isLoading={isLoading} course={course} />
      <DiscoverCareers />
    </>
  );
}
