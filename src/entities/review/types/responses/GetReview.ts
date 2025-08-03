import { IReview } from "../Review";

export interface IGetReviewResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: IReview[];
}
