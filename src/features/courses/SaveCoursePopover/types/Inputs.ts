import { SavedCourseType } from "@entities/savedCourse";

export interface Inputs {
  save_type: SavedCourseType;
  started_at: Date;
  finished_at: Date;
  certificate?: FileList;
}
