import { createTheme } from "@mui/material";
import { purple } from "@mui/material/colors";

export const appTheme = createTheme({
  palette: {
    secondary: {
      main: purple[800],
    },
  },
  typography: {
    fontFamily: ["Dongle", "sans-serif"].join(","),
  },
});
