import { useEffect } from "react";

import { useAuthStore } from "@entities/auth";
import { useUserStore } from "@entities/user";
import { useSavedCoursesStore } from "@entities/savedCourse";

export const useGetUserData = () => {
  const auth = useAuthStore((state) => state.auth);
  const getUser = useUserStore((state) => state.get);
  const getSavedCourses = useSavedCoursesStore(
    (state) => state.getSavedCourses
  );

  useEffect(() => {
    if (auth) {
      // setTimeout fixes bug when Auth header not yet set in api
      // from login/signUp form
      setTimeout(() => {
        getUser();
        getSavedCourses();
      }, 0);
    }
  }, [auth]);
};
