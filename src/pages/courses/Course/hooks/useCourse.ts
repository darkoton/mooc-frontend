import { useEffect, useState } from "react";

import { courseService, type ICourse } from "@entities/course";
import { isAbortErr } from "@shared/utils/isAbortErr";
import { useProvidersStore } from "@entities/provider/store/provider";

export const useCourse = (uuid: string | undefined) => {
  const [isLoading, setIsLoading] = useState(true);
  const [course, setCourse] = useState<ICourse | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const getCourse = async () => {
      if (!uuid) {
        return;
      }

      try {
        setIsLoading(true);
        setError("");

        const response = await courseService.getOne(uuid, { signal });
        setCourse(response);
      } catch (err) {
        if (!isAbortErr(err)) {
          setError(err instanceof Error ? err.message : String(err));
          console.error(err);
        }
      } finally {
        setIsLoading(false);
      }
    };

    getCourse();

    return () => {
      controller.abort();
    };
  }, [uuid]);

  const getProviders = useProvidersStore((state) => state.getProviders);

  useEffect(() => {
    getProviders();
  }, [getProviders]);

  return {
    course,
    isLoading,
    error,
  };
};
