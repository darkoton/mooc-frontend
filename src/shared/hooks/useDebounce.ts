import { useEffect, useState } from "react";

type Primitive = string | number | boolean | bigint | symbol | null | undefined;

export default function useDebounce<T extends Primitive>(
  value: T,
  milliSeconds = 500
): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, milliSeconds);

    return () => {
      clearTimeout(handler);
    };
  }, [value, milliSeconds]);

  return debouncedValue;
}
