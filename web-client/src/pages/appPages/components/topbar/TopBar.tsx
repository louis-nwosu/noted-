import { FC, useContext } from "react";

import { Box } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import MenuIcon from "@mui/icons-material/Menu";

import "./Styles.css";
import { SideNavContext } from "../../../../layouts/applayout/appLayout";

export const TopBar: FC = () => {
  const { func, val } = useContext(SideNavContext);

  return (
    <div className="topnav-container">
      <p style={{ color: "purple" }}>Noted</p>
      <div>
        <Box className="topNav-input-box">
          <input
            type="text"
            className="topnav-input-container"
            placeholder="search..."
          />
        </Box>
      </div>
      <span className="topNav-span">
        <Box mr={1}>
          <PersonIcon style={{ color: "purple" }} />
        </Box>
        <Box ml={1}>
          <SettingsIcon style={{ color: "purple" }} />
        </Box>
      </span>
      <span className="topNav-menu" onClick={() => func(true)}>
        {val !== true && <MenuIcon style={{ color: "purple" }} />}
      </span>
    </div>
  );
};

export { TopBar as default };
