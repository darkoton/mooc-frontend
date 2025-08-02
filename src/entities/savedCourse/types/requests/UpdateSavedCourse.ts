import { SavedCourseType } from "../../const";

export interface IUpdateSavedCourseRequest {
  course: string;
  id: number;
  save_type: SavedCourseType;
  started_at: string;
  finished_at: string;
  certificate: File | string;
}
