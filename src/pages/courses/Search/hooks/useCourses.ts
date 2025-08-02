import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import { courseService } from "@entities/course";
import type { IGetCourseResponse } from "@entities/course/types/responses/GetCourse";
import { useProvidersStore } from "@entities/provider/store/provider";
import { prepareOptions } from "../utils/prepareOptions";

export const useCourses = () => {
  const { category, subCategory } = useParams();
  const [searchParams] = useSearchParams();

  const [courses, setCourses] = useState<IGetCourseResponse>({
    count: 0,
    next: null,
    previous: null,
    results: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const getProviders = useProvidersStore((state) => state.getProviders);

  const page = (() => {
    const value = searchParams.get("page");
    if (!value) {
      return 0;
    }
    return +value;
  })();

  useEffect(() => {
    const getCourses = async () => {
      try {
        setIsLoading(true);
        setError("");

        const options = prepareOptions(
          category,
          subCategory,
          searchParams,
          page
        );

        const courses = await courseService.get(options);
        setCourses(courses);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    getCourses();
  }, [searchParams, category, subCategory, page]);

  useEffect(() => {
    getProviders();
  }, [getProviders]);

  return {
    courses,
    isLoading,
    error,
    page,
  };
};
