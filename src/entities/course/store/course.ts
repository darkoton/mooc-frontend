import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { IGetCourseResponse } from "../types/responses/GetCourse";
import { courseService } from "../services/course";
import { IGetCourseRequest } from "../types/requests/GetCourse";

type State = {
  isLoading: boolean;
  courses: IGetCourseResponse;
  error: string;
};

type Actions = {
  getCourses: (searchParams?: IGetCourseRequest) => Promise<void>;
};

export const useCoursesStore = create<State & Actions>()(
  immer((set) => ({
    isLoading: true,
    courses: { count: 0, next: null, previous: null, results: [] },
    error: "",

    getCourses: async (searchParams: IGetCourseRequest = {}) => {
      try {
        set({ isLoading: true, error: "" });

        const courses = await courseService.get(searchParams);

        set({ courses });
      } catch {
        set((state) => {
          state.courses = { count: 0, next: null, previous: null, results: [] };
          state.error = "Unexpected error occured. Please try again later";
        });
      } finally {
        set({ isLoading: false });
      }
    },
  }))
);
