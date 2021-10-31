import React, { FC, ReactNode } from "react";

import { Redirect, Route } from "react-router";

interface ProtectedRouteType {
  path: string;
  Comp: ReactNode;
}

export const ProtectedRoute: FC<ProtectedRouteType> = ({ path, Comp }) => {
  return localStorage.getItem("noted-l300-key") ? (
    <Route exact path={path}>
      {Comp}
    </Route>
  ) : (
    <Redirect to="/" />
  );
};

export { ProtectedRoute as default };
