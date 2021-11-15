import { BrowserRouter, Route, Switch } from "react-router-dom";

import { HomePage } from "./pages/homePage";
import { AuthPage } from "./pages/authPages";
import { Dashboard } from "./pages/dashboard/dashboard";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/sign-in">
          <AuthPage />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export { App as default };
