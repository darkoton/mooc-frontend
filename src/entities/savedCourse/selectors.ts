import type { SavedCourseStore } from "./store";

export const selectSavedCourse =
  (savedCourseId: string) => (state: SavedCourseStore) =>
    state.savedCourses.results.find(
      (savedCourse) => savedCourse.course === savedCourseId
    );
