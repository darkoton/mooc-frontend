import { api } from "@shared/api/api";

import { IGetCourseRequest } from "../types/requests/GetCourse";
import { IGetCourseResponse } from "../types/responses/GetCourse";
import { ICourse } from "../types/Course";
import { type AxiosRequestConfig } from "axios";

class CourseService {
  async get(
    searchParams: IGetCourseRequest = {},
    config?: AxiosRequestConfig
  ): Promise<IGetCourseResponse> {
    const urlSearchParams = new URLSearchParams();
    Object.entries(searchParams).forEach(([key, value]) =>
      urlSearchParams.append(key, value)
    );

    return (
      await api.get(`/courses/courses/?${urlSearchParams.toString()}`, config)
    ).data;
  }

  async getOne(
    id: string | number,
    config?: AxiosRequestConfig
  ): Promise<ICourse> {
    return (await api.get(`/courses/courses/${id}/`, config)).data;
  }
}

export const courseService = new CourseService();
