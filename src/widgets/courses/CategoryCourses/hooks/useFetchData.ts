import { useEffect, useState } from "react";

import { courseService, type ICourse } from "@entities/course";
import { useProvidersStore } from "@entities/provider/store/provider";

export const useFetchData = (
  subCategories: { id: number; name: string }[] | undefined
) => {
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const getProviders = useProvidersStore((state) => state.getProviders);

  useEffect(() => {
    const getCourses = async () => {
      try {
        if (!subCategories) {
          throw new Error("subcategories not found");
        }

        setIsLoading(true);
        setError("");

        const sub_category = subCategories
          .map((subCategory) => subCategory.id)
          .join(",");

        const courses = await courseService.get({
          sub_category,
          page_size: subCategories.length * 3,
        });
        setCourses(courses.results);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    getCourses();
    getProviders();
  }, [getProviders, subCategories]);

  return { courses, isLoading, error };
};
