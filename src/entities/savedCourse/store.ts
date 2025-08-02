import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { savedCoursesService } from "./service";
import type { IGetSavedCourseResponse } from "./types/responses/GetSavedCourse";
import type { IAddSavedCourseRequest } from "./types/requests/AddSavedCourse";
import type { IUpdateSavedCourseRequest } from "./types/requests/UpdateSavedCourse";

type State = {
  savedCourses: IGetSavedCourseResponse;
  isLoading: boolean;
  error: string;
};

type Actions = {
  getSavedCourses: () => Promise<void>;
  addSavedCourse: (saved: IAddSavedCourseRequest) => Promise<void>;
  updateSavedCourse: (save: IUpdateSavedCourseRequest) => Promise<void>;
  removeSavedCourse: (id: number) => Promise<void>;
  clearSavedCourses: () => void;
};

export type SavedCourseStore = State & Actions;

export const useSavedCoursesStore = create<SavedCourseStore>()(
  immer((set, get) => ({
    savedCourses: {
      count: 0,
      next: null,
      previous: null,
      results: [],
    },
    isLoading: true,
    error: "",

    getSavedCourses: async () => {
      try {
        const saved = await savedCoursesService.getAll();
        set((state) => {
          state.savedCourses = saved;
          state.isLoading = false;
          state.error = "";
        });
      } catch {
        set((state) => {
          state.savedCourses = {
            count: 0,
            next: null,
            previous: null,
            results: [],
          };
          state.isLoading = false;
          state.error = "Unexpected error. Please try again later";
        });
      }
    },
    addSavedCourse: async (saved) => {
      const createdSaved = await savedCoursesService.addSaved(saved);
      set((state) => {
        state.savedCourses.count += 1;
        state.savedCourses.results.unshift(createdSaved);
      });
    },
    updateSavedCourse: async (save) => {
      const updatedSave = await savedCoursesService.update(save);
      set((state) => {
        state.savedCourses.results = state.savedCourses.results.map(
          (saveItem) => (saveItem.id === save.id ? updatedSave : saveItem)
        );
      });
    },
    removeSavedCourse: async (id: number) => {
      const saved = get().savedCourses.results.find(
        (result) => result.id === id
      );
      if (!saved) {
        return;
      }

      await savedCoursesService.removeSaved(id);
      set((state) => {
        state.savedCourses.count -= 1;
        state.savedCourses.results = state.savedCourses.results.filter(
          (result) => result.id !== id
        );
      });
    },
    clearSavedCourses: () => {
      set((state) => {
        state.savedCourses = {
          count: 0,
          next: null,
          previous: null,
          results: [],
        };
        state.isLoading = true;
        state.error = "";
      });
    },
  }))
);
