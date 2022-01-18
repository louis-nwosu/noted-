import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/styles";

import { LandingPage } from "./pages/landingPage";
import { appFontTheme } from "./themes/fontThemes";

function App() {
  return (
    <ThemeProvider theme={appFontTheme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
