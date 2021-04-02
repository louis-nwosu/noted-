import React from "react";
import Hero from "./components/landing-page/hero-section";
import Form from "./components/login";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Route exact path="/" component={Hero} />
      <Route exact path="/sign-in" component={Form} />
    </Router>
  );
}

export default App;
