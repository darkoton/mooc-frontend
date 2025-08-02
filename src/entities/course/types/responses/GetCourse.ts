import { ICourse } from "../Course";

export interface IGetCourseResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: ICourse[];
}
