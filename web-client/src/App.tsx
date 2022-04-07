import { useState, createContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/styles";

import { LandingPage, AuthPage, AppDashboard } from "./pages/";
import {
  AllDocs,
  FavoritePage,
  Drafts,
  Trash,
} from "./pages/appPages/components";
import { appTheme } from "./themes";

export const AppMode = createContext({
  mode: "dark",
  setMode: (mode: "dark" | "light") => {},
});

function App() {
  const [appMode, setAppMode] = useState<"dark" | "light">("light");
  const handleAppModeChange = (mode: "dark" | "light") => setAppMode(mode);
  return (
    <ThemeProvider theme={appTheme}>
      <AppMode.Provider value={{ mode: appMode, setMode: handleAppModeChange }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/authentication" element={<AuthPage />} />
            <Route path="/app" element={<AppDashboard />}>
              <Route path="/app/" element={<AllDocs />} />
              <Route path="/app/favorite" element={<FavoritePage />} />
              <Route path="/app/drafts" element={<Drafts />} />
              <Route path="/app/recycle-bin" element={<Trash />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppMode.Provider>
    </ThemeProvider>
  );
}

export default App;
