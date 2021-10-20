import { BrowserRouter, Route, Switch } from "react-router-dom";

import { HomePage } from "./pages/homePage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export { App as default };
