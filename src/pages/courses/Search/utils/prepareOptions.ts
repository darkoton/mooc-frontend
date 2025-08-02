import type { IGetCourseRequest } from "@entities/course";
import { prepareDurationOption } from "./prepareDurationOption";

export const prepareOptions = (
  category: string | undefined,
  subCategory: string | undefined,
  searchParams: URLSearchParams,
  page: number
) => {
  const options: IGetCourseRequest = {
    page_size: 12,
  };

  if (category) {
    options.category = category;
  }

  if (subCategory) {
    options.sub_category = subCategory;
  }

  if (searchParams.has("certificate", "true")) {
    options.has_certificate = true;
  }

  const language = searchParams.getAll("language");
  if (language.length === 1) {
    options.language = language[0];
  }

  const price = searchParams.getAll("price");
  if (price.length === 1) {
    if (price[0] === "free") {
      options.price_max = 0;
    }

    if (price[0] === "paid") {
      options.price_min = 0.01;
    }
  }

  options.ordering = searchParams.get("ordering") || "-rating";

  options.page = page + 1;

  const q = searchParams.get("q");
  if (q) {
    options.q = q;
  }

  prepareDurationOption(searchParams, options);

  return options;
};
