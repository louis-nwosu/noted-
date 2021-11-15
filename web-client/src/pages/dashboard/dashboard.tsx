import React, { FC } from "react";

import { Route } from "react-router-dom";

import { DashboardLayout } from "../../layout/dashBoardLayout";
import { AllNotes } from "./components/allNotes";

//TODO: remove later
// temporary import
import { NoNotes } from "./components/noNotes/noNotes";

export const Dashboard: FC = () => {
  return (
    <DashboardLayout>
      <Route exact path="/dashboard/">
        <AllNotes />
      </Route>
      <Route exact path="/dashboard/favorites">
        <NoNotes />
      </Route>
      <Route exact path="/dashboard/drafts">
        <NoNotes />
      </Route>
      <Route exact path="/dashboard/achived">
        <NoNotes />
      </Route>
    </DashboardLayout>
  );
};

export { Dashboard as default };
