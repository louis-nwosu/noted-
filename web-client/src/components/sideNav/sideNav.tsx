import React, { FC } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import NotesIcon from "@mui/icons-material/Notes";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DraftsIcon from "@mui/icons-material/Drafts";
import ArchiveIcon from "@mui/icons-material/Archive";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { ThemeProvider } from "@mui/system";

import { NavLink } from "react-router-dom";

import { regularTheme } from "../../themes/regular";
import { useStyles } from "./style";

export const SideNav: FC = () => {
  const classes = useStyles();
  const navItemArr = [
    {
      text: "All Notes",
      icon: <NotesIcon color="primary" />,
      link: "/dashboard/",
    },
    {
      text: "Favorites",
      icon: <FavoriteBorderIcon color="primary" />,
      link: "/dashboard/favorites",
    },
    {
      text: "Drafts",
      icon: <DraftsIcon color="primary" />,
      link: "/dashboard/drafts",
    },
    {
      text: "Archived",
      icon: <ArchiveIcon color="primary" />,
      link: "/dashboard/achived",
    },
    {
      text: "Trash",
      icon: <DeleteOutlineIcon color="primary" />,
      link: "",
    },
  ];
  return (
    <ThemeProvider theme={regularTheme}>
      <div className={classes.navItemsContainer}>
        {navItemArr.map((item) => (
          <NavLink to={item.link} className={classes.linkItem}>
            <Box display="flex" my={2.3} className={classes.navItem}>
              {item.icon}
              <Box mx={1.7} className={classes.navtext}>
                <Typography variant="body1">{item.text}</Typography>
              </Box>
            </Box>
          </NavLink>
        ))}
      </div>
    </ThemeProvider>
  );
};

export { SideNav as default };
