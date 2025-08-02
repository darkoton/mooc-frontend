import { useEffect, useState } from "react";

import { courseService, ICourse } from "@entities/course";
import { useProvidersStore } from "@entities/provider/store/provider";
import { useHardcodedCategories } from "@entities/course/hooks/useHardcodedCategories";

export const useCourses = () => {
  const getProviders = useProvidersStore((state) => state.getProviders);

  const [allCourses, setAllCourses] = useState<ICourse[]>([]);
  const [coursesByCategories, setCoursesByCategories] = useState<ICourse[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const hardcodedCategories = useHardcodedCategories();

  useEffect(() => {
    const getCourses = async () => {
      try {
        setIsLoading(true);
        setError("");

        const category = hardcodedCategories.map(({ id }) => id).join(",");

        const [allCourses, coursesByCategories] = await Promise.all([
          courseService.get({ page_size: 3 }),
          courseService.get({ category, page_size: 12 }),
        ]);
        setAllCourses(allCourses.results);
        setCoursesByCategories(coursesByCategories.results);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    getCourses();
    getProviders();
  }, [getProviders]);

  return {
    allCourses,
    coursesByCategories,
    isLoading,
    error,
  };
};
