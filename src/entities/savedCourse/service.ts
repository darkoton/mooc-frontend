import { api } from "@shared/api/api";
import type { IGetSavedCourseResponse } from "./types/responses/GetSavedCourse";
import type { IAddSavedCourseRequest } from "./types/requests/AddSavedCourse";
import type { ISavedCourse } from "./types/SavedCourse";
import type { IUpdateSavedCourseRequest } from "./types/requests/UpdateSavedCourse";

class SavedCoursesService {
  async getAll(): Promise<IGetSavedCourseResponse> {
    return (await api.get("/user/saved/")).data;
  }

  async removeSaved(id: number) {
    return (await api.delete(`/user/saved/${id}/`)).data;
  }

  async addSaved(saved: IAddSavedCourseRequest): Promise<ISavedCourse> {
    return (
      await api.post("/user/saved/", saved, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    ).data;
  }

  async update(save: IUpdateSavedCourseRequest): Promise<ISavedCourse> {
    const res = await api.put(`/user/saved/${save.id}/`, save, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  }
}

const savedCoursesService = new SavedCoursesService();
export { savedCoursesService };
