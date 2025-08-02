import {
  Outlet,
  // ScrollRestoration
} from "react-router-dom";

export const RootLayout = () => {
  return (
    <>
      <Outlet />
      {/* <ScrollRestoration /> */}
    </>
  );
};
