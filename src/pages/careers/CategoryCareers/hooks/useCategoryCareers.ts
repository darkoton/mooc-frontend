import { useEffect, useState } from "react";

export const useCategoryCareers = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getCategoryCareers = async () => {
      try {
        await new Promise((resolve) => {
          setTimeout(() => {
            resolve("");
            // reject(new Error("123"));
          }, 2_500);
        });
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setIsLoading(false);
      }
    };

    getCategoryCareers();
  }, []);

  return {
    isLoading,
    error,
  };
};
