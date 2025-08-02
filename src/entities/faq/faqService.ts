import { AxiosRequestConfig } from "axios";
import clsx from "clsx";

import { api } from "@shared/api/api";
import type { IFaq } from "./types/Faq";

class FaqService {
  async getAll(search = "", config?: AxiosRequestConfig): Promise<IFaq[]> {
    return (
      await api.get(`/faq/${clsx(search && `?search=${search}`)}`, config)
    ).data;
  }
}

const faqService = new FaqService();

export { faqService };
