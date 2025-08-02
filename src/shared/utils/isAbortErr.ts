import { AxiosError } from "axios";

export const isAbortErr = (err: unknown) => {
  return (
    typeof err === "object" &&
    err !== null &&
    "code" in err &&
    err.code === AxiosError.ERR_CANCELED
  );
};
