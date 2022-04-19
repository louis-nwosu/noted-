import { FC } from "react";
import { Outlet } from "react-router-dom";

import { AppLayout } from "../../layouts/applayout/appLayout";

export const AppDashboard: FC = () => {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
};

export { AppDashboard as default };
