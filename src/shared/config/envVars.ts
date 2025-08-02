export const loanSiteUrl = (() => {
  const value = import.meta.env.VITE_API_LOAN_SITE_URL;
  if (typeof value !== "string") {
    return "https://groshi247.com/student-loan";
  }
  return value;
})();

export const apiBaseUrl = (() => {
  const value = import.meta.env.VITE_API_BASE_URL;
  if (typeof value !== "string") {
    return "https://backend.freecourses.com.ua/api";
  }
  return value;
})();

export const appEnv = (() => {
  const value = import.meta.env.VITE_APP_ENV;
  if (typeof value !== "string") {
    return "prod";
  }
  return value;
})();
