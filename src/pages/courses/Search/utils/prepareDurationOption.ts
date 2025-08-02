import type { IGetCourseRequest } from "@entities/course";

export const prepareDurationOption = (
  searchParams: URLSearchParams,
  options: IGetCourseRequest
) => {
  const duration = searchParams.getAll("duration");

  const weekInMinutes = 10_080;
  const monthInMinutes = 43_800;

  if (duration.includes("week")) {
    options.duration_min = "0";
    options.duration_max = weekInMinutes - 1;
  }

  if (duration.includes("fewWeeks")) {
    if (!options.duration_min) {
      options.duration_min = weekInMinutes;
    }
    options.duration_max = weekInMinutes * 4 - 1;
  }

  if (duration.includes("fewMonths")) {
    if (!options.duration_min) {
      options.duration_min = monthInMinutes;
    }
    options.duration_max = monthInMinutes * 3 - 1;
  }

  if (duration.includes("months")) {
    if (!options.duration_min) {
      options.duration_min = monthInMinutes * 3;
    }
    delete options.duration_max;
  }
};
