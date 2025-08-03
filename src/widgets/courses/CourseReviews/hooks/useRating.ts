import { useEffect, useState } from "react";

import { type IReview } from "@entities/review";
import { useProvidersStore } from "@entities/provider/store/provider";

export const useRating = (reviews: IReview[]) => {
  const [isLoading, setIsLoading] = useState(true);
  const [rating, setRating] = useState<string>('0')

  useEffect(() => {
    setIsLoading(true);

    if (reviews.length <= 0) {
      setRating('0')
      return
    }

    const sumRating = reviews.reduce((prev, curr) => {
      return prev + parseFloat(curr.rating.replace(",", "."))
    }, 0)


    setRating(String(parseFloat((sumRating / reviews.length).toFixed(1))).replace('.', ','))
  }, [reviews]);

  const getProviders = useProvidersStore((state) => state.getProviders);

  useEffect(() => {
    getProviders();
  }, [getProviders]);

  return {
    rating,
    isLoading,
  };
};
