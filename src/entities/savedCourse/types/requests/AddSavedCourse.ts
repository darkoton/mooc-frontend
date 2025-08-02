export interface IAddSavedCourseRequest {
  save_type: "FAVORITE" | "STARTED" | "FINISHED" | "PLANNED" | "ABANDONED";
  course: string;
  started_at?: string;
  finished_at?: string;
  certificate?: File;
}
