import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/styles";

import { LandingPage } from "./pages/landingPage";
import { AuthPage } from "./pages/authPage";
import { appTheme } from "./themes";

function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/authentication" element={<AuthPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
