import { api } from "@shared/api/api";
import { IProvider } from "../types/Provider";

class ProviderService {
  async getAll(): Promise<IProvider[]> {
    return (await api.get("/providers/providers/")).data;
  }

  async getOne(uuid: string): Promise<IProvider> {
    return (await api.get(`/providers/providers/${uuid}/`)).data;
  }
}

export const providerService = new ProviderService();
