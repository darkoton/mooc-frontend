import type { ISavedCourse } from "../SavedCourse";

export interface IGetSavedCourseResponse {
  count: number;
  next: null | string;
  previous: null | string;
  results: ISavedCourse[];
}
