import { FC } from "react";

import { AppLayout } from "../../layouts/applayout/appLayout";
import { TopBar } from './components/topbar/TopBar'

export const AppDashboard: FC = () => {
  return (
    <AppLayout>
      <TopBar />
      
    </AppLayout>
  )
};

export { AppDashboard as default };
