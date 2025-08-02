import { useMemo } from "react";

import {
  SAVED_COURSE_TYPES,
  useSavedCoursesStore,
} from "@entities/savedCourse";

export const useDefaultValues = (saveId: number | undefined) => {
  const saves = useSavedCoursesStore((state) => state.savedCourses);
  const save = useMemo(() => {
    return saves.results.find((save) => save.id === saveId);
  }, [saves, saveId]);

  const defaultSaveType = useMemo(() => {
    if (!save) {
      return SAVED_COURSE_TYPES.FAVORITE;
    }

    const saveTypeExist = Object.values(SAVED_COURSE_TYPES).includes(
      save.save_type
    );
    return saveTypeExist ? save.save_type : SAVED_COURSE_TYPES.FAVORITE;
  }, [save]);

  const defaultStartedAt = useMemo(() => {
    if (!save || save.save_type !== SAVED_COURSE_TYPES.STARTED) {
      return new Date();
    }

    return save.started_at ? new Date(save.started_at) : new Date();
  }, [save]);

  const defaultFinishedAt = useMemo(() => {
    if (!save || save.save_type !== SAVED_COURSE_TYPES.FINISHED) {
      return new Date();
    }

    return save.finished_at ? new Date(save.finished_at) : new Date();
  }, [save]);

  return { defaultSaveType, defaultStartedAt, defaultFinishedAt };
};
