import { BrowserRouter, Route, Switch } from "react-router-dom";

import { HomePage } from "./pages/homePage";
import { AuthPage } from "./pages/authPages";
import "./App.css";

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
      </Switch>
    </BrowserRouter>
  );
}

export { App as default };
