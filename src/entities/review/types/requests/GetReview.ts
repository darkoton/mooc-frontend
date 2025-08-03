export interface IGetReviewRequest {
  ordering?: string;
  page?: number;
  page_size?: number;
  own_reviews?: boolean;
  course?: string;
  user?: number;
  provider?: number;
}
