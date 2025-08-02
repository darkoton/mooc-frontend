import { type UseFormUnregister } from "react-hook-form";
import { useEffect } from "react";

import { type Inputs } from "../types/Inputs";
import { SAVED_COURSE_TYPES } from "@entities/savedCourse";

export const useUnregisterFields = (
  saveType: string,
  unregister: UseFormUnregister<Inputs>
) => {
  useEffect(() => {
    const unregisterFields = () => {
      if (saveType !== SAVED_COURSE_TYPES.STARTED) {
        unregister("started_at");
      }

      if (saveType !== SAVED_COURSE_TYPES.FINISHED) {
        unregister("finished_at");
        unregister("certificate");
      }
    };

    unregisterFields();
  }, [saveType, unregister]);
};
