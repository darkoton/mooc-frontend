import { type Dispatch, type SetStateAction, useEffect } from "react";

export const useCloseCategories = (
  category: string | undefined,
  setShowSelectCategory: Dispatch<SetStateAction<boolean>>
) => {
  useEffect(() => {
    setShowSelectCategory(false);
  }, [category, setShowSelectCategory]);
};
