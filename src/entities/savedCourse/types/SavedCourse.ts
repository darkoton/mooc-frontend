export interface ISavedCourse {
  id: number;
  created_at: string;
  updated_at: string;
  save_type: "FAVORITE" | "STARTED" | "FINISHED" | "PLANNED" | "ABANDONED";
  started_at: string | null;
  finished_at: string | null;
  certificate: string | null;
  course: string;
}
