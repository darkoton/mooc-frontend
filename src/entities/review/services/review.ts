import { api } from "@shared/api/api";

import { IGetReviewRequest } from "../types/requests/GetReview";
import { IGetReviewResponse } from "../types/responses/GetReview";
import { IReview } from "../types/Review";
import { type AxiosRequestConfig } from "axios";
import { IPostReviewRequest } from "../types/requests/PostReview";

class ReviewService {
  async get(
    searchParams: IGetReviewRequest = {},
    config?: AxiosRequestConfig
  ): Promise<IGetReviewResponse> {
    const urlSearchParams = new URLSearchParams();
    Object.entries(searchParams).forEach(([key, value]) =>
      urlSearchParams.append(key, value)
    );

    return (
      await api.get(`/courses/reviews/?${urlSearchParams.toString()}`, config)
    ).data;
  }

  async getOne(
    id: string | number,
    config?: AxiosRequestConfig
  ): Promise<IReview> {
    return (await api.get(`/courses/reviews/${id}/`, config)).data;
  }

  async post(
    body: IPostReviewRequest,
    config?: AxiosRequestConfig
  ): Promise<IGetReviewResponse> {

    return (
      await api.post(`/courses/reviews/`, body, config)
    ).data;
  }
}

export const reviewService = new ReviewService();
