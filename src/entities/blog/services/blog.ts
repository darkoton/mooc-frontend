import { api } from "@shared/api/api";
import { IBlog } from "../types/Blog";

class BlogService {
  async getAll(params: { page: number; limit: number }): Promise<{
    results: IBlog[];
    count: number;
  }> {
    const { page, limit } = params;
    const response = await api.get(
      `/blog/?format=json&page=${page}&limit=${limit}`
    );
    return response.data;
  }

  async getById(id: string): Promise<IBlog> {
    const response = await api.get(`/blog/${id}?format=json`);
    return response.data;
  }
}
export const blogService = new BlogService();
