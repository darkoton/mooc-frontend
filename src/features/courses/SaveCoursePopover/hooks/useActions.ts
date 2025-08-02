import { useState } from "react";
import { type SubmitHandler } from "react-hook-form";

import { useSavedCoursesStore } from "@entities/savedCourse";
import { type Inputs } from "../types/Inputs";

export const useActions = (
  courseId: string,
  onClose: () => void,
  saveId?: number
) => {
  const { savedCourses, addSavedCourse, removeSavedCourse, updateSavedCourse } =
    useSavedCoursesStore();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  const onSave: SubmitHandler<Inputs> = async (data) => {
    try {
      setError(false);
      setSubmitting(true);

      const { started_at, finished_at, certificate, save_type } = data;

      const formattedStartedAt =
        started_at && started_at.toISOString().split("T")[0];
      const formattedFinishedAt =
        finished_at && finished_at.toISOString().split("T")[0];

      if (saveId) {
        const save = savedCourses.results.find((save) => save.id === saveId);
        if (!save) {
          return;
        }

        // Keep started_at if type=finished
        const newSaveType = (() => {
          if (save_type !== "FINISHED") {
            return formattedStartedAt || "";
          }

          return save.started_at || "";
        })();

        await updateSavedCourse({
          ...{
            save_type,
            course: courseId,
            started_at: newSaveType,
            finished_at: formattedFinishedAt || "",
            certificate: certificate?.[0] || "",
          },
          id: saveId,
        });
      } else {
        await addSavedCourse({
          save_type,
          course: courseId,
          started_at: formattedStartedAt,
          finished_at: formattedFinishedAt,
          certificate: certificate?.[0],
        });
      }
      onClose?.();
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  };

  const onDelete = async () => {
    if (!saveId) {
      return;
    }

    try {
      setSubmitting(true);
      setError(false);

      await removeSavedCourse(saveId);
      onClose?.();
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  };

  return { onSave, onDelete, error, submitting };
};
