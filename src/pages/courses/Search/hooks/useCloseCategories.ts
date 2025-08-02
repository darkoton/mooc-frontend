import { type Dispatch, type SetStateAction, useEffect } from "react";

export const useCloseCategories = (
  subCategory: string | undefined,
  setShowSelectCategory: Dispatch<SetStateAction<boolean>>
) => {
  useEffect(() => {
    setShowSelectCategory(false);
  }, [subCategory, setShowSelectCategory]);
};
