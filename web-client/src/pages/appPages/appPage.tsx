import { FC } from "react";
import { Outlet } from 'react-router-dom'

import { AppLayout } from "../../layouts/applayout/appLayout";
import { TopBar } from './components/topbar/TopBar'

export const AppDashboard: FC = () => {
  return (
    <AppLayout>
      <div style={{ boxShadow: '2px 10px 50px -1px rgba(0,0,0,0.28)' }}>
        <TopBar />
      </div>
      <Outlet />
    </AppLayout>
  )
};

export { AppDashboard as default };
