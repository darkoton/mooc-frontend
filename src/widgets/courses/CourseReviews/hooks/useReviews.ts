import { useEffect, useState } from "react";

import { reviewService, type IReview } from "@entities/review";
import { isAbortErr } from "@shared/utils/isAbortErr";
import { useProvidersStore } from "@entities/provider/store/provider";

export const useReviews = (uuid: string | undefined) => {
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const getReviews = async () => {
      if (!uuid) {
        return;
      }

      try {
        setIsLoading(true);
        setError("");

        const response = await reviewService.get({
          course: uuid
        }, { signal });
        setReviews(response.results);
      } catch (err) {
        if (!isAbortErr(err)) {
          setError(err instanceof Error ? err.message : String(err));
          console.error(err);
        }
      } finally {
        setIsLoading(false);
      }
    };

    getReviews();

    return () => {
      controller.abort();
    };
  }, [uuid]);

  const getProviders = useProvidersStore((state) => state.getProviders);

  useEffect(() => {
    getProviders();
  }, [getProviders]);

  return {
    reviews,
    isLoading,
    error,
  };
};
