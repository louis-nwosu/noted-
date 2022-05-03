import { FC, useContext, useState } from "react";

import { Box, Typography, Drawer } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import MenuIcon from "@mui/icons-material/Menu";
import { ThemeProvider } from "@mui/styles";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { motion } from "framer-motion";

import "./Styles.css";
import { SideNavContext } from "../../appLayout";
import { AppMode } from "../../../../App";
import { Settings } from "../../../../pages/appPages/pages/settings/settings";
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
      <motion.div
        className="topNav-input-box"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      >
        <input
          type="text"
          className={
            mode === "light"
              ? "topnav-input-container"
              : "topnav-input-containerDark"
          }
          placeholder="Search documents, dates, categories..."
        />
        <motion.span whileTap={{ scale: 0.5 }}>
          <SearchIcon style={{ color: "#DDA0DD", fontSize: "20px" }} />
        </motion.span>
      </motion.div>
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
