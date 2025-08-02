export const SAVED_COURSE_TYPES = {
  FAVORITE: "FAVORITE",
  STARTED: "STARTED",
  FINISHED: "FINISHED",
  PLANNED: "PLANNED",
  ABANDONED: "ABANDONED",
} as const;

export type SavedCourseType =
  (typeof SAVED_COURSE_TYPES)[keyof typeof SAVED_COURSE_TYPES];
