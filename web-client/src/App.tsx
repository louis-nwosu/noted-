import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/styles";

import { LandingPage, AuthPage, AppDashboard } from "./pages/";
import { AllDocs, FavoritePage } from "./pages/appPages/components";
import { appTheme } from "./themes";

function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/authentication" element={<AuthPage />} />
          <Route path="/app" element={<AppDashboard />}>
            <Route path='/app/' element={<AllDocs />} />
            <Route path="/app/favorite" element={<FavoritePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
