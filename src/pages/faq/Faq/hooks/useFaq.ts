import { useEffect, useState } from "react";

import { faqService, type IFaq } from "@entities/faq";
import { isAbortErr } from "@shared/utils/isAbortErr";
import { sortFaq } from "../utils/sortFaq";
import { groupFaqsByCategory } from "../utils/groupFaqsByCategory";

export const useFaq = () => {
  const [faq, setFaq] = useState<[string, IFaq[]][]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const getFaq = async () => {
      try {
        setIsLoading(true);
        setError("");

        const response = await faqService.getAll("", { signal });

        sortFaq(response);

        setFaq(groupFaqsByCategory(response));
      } catch (err) {
        if (!isAbortErr(err)) {
          setError(err instanceof Error ? err.message : String(err));
          console.error(err);
        }
      } finally {
        setIsLoading(false);
      }
    };

    getFaq();

    return () => {
      controller.abort();
    };
  }, []);

  return {
    faq,
    isLoading,
    error,
  };
};
