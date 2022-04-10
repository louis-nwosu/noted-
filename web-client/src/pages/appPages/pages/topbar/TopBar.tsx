import { FC, useContext, useState } from "react";

import { Box, Typography, Drawer } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import MenuIcon from "@mui/icons-material/Menu";
import { ThemeProvider } from "@mui/styles";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

import "./Styles.css";
import { SideNavContext } from "../../../../layouts/applayout/appLayout";
import { AppMode } from "../../../../App";
import { Settings } from "../settings/settings";
import { logoTheme } from "../../../../themes";

export const TopBar: FC = () => {
  const { func, val } = useContext(SideNavContext);
  const { mode } = useContext(AppMode);

  const [drawerState, setDrawerState] = useState<boolean>(false);
  const drawerToggler = (state: boolean) => setDrawerState(state);

  return (
    <div
      className={mode === "light" ? "topnav-container" : "topnav-containerDark"}
    >
      <ThemeProvider theme={logoTheme}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Typography variant="h5" color="secondary" fontFamily="Neonderthaw">
            noted
          </Typography>
        </Link>
      </ThemeProvider>
      <div>
        <Box className="topNav-input-box">
          <input
            type="text"
            className={
              mode === "light"
                ? "topnav-input-container"
                : "topnav-input-containerDark"
            }
            placeholder="Search documents, dates, categories..."
          />
          <SearchIcon style={{ color: "#DDA0DD", fontSize: "20px" }} />
        </Box>
      </div>
      <span className="topNav-span">
        <Box mr={1}>
          <PersonIcon style={{ color: "purple" }} />
        </Box>
        <Box ml={1} onClick={() => drawerToggler(true)}>
          <SettingsIcon style={{ color: "purple" }} />
        </Box>
      </span>
      <span className="topNav-menu" onClick={() => func(true)}>
        {val !== true && <MenuIcon style={{ color: "purple" }} />}
      </span>
      <Drawer
        anchor={"right"}
        open={drawerState}
        onClose={() => drawerToggler(false)}
      >
        <Settings />
      </Drawer>
    </div>
  );
};

export { TopBar as default };
