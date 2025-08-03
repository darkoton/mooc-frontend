export interface IPutReviewRequest {
  course: string;
  username: string;
  text: string | null;
  rating: string;
}
