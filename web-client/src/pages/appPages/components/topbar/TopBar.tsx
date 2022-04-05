import { FC, useContext } from "react";

import { Box, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import MenuIcon from "@mui/icons-material/Menu";
import { ThemeProvider } from "@mui/styles";
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

import "./Styles.css";
import { SideNavContext } from "../../../../layouts/applayout/appLayout";
import { logoTheme } from "../../../../themes";

export const TopBar: FC = () => {
  const { func, val } = useContext(SideNavContext);

  return (
    <div className="topnav-container">
      <ThemeProvider theme={logoTheme}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Typography
            variant="h5"
            color="secondary"
            fontFamily="Neonderthaw"
          >
            noted
          </Typography>
        </Link>
      </ThemeProvider>
      <div>
        <Box className="topNav-input-box">
          <input
            type="text"
            className="topnav-input-container"
            placeholder="Search documents, dates, categories..."
          />
          <SearchIcon style={{ color: '#DDA0DD', fontSize: '20px'}} />
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
