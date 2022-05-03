import { FC, ReactNode, Fragment, useContext } from "react";

import Box from "@mui/material/Box";
import { makeStyles, createStyles } from "@mui/styles";
import TabIcon from "@mui/icons-material/Tab";
import DraftsIcon from "@mui/icons-material/Drafts";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import LockIcon from "@mui/icons-material/Lock";
import LogoutIcon from "@mui/icons-material/Logout";
import { Theme } from "@mui/system";
import { purple } from "@mui/material/colors";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

import { AppMode } from "../../../App";
import { StateTypes } from "../../../store/types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: "100%",
      height: "100%",
      backgroundColor: purple[800],
      overflow: "hidden",
    },
    navItem: {
      cursor: "pointer",
      transition: "all .2s ease-in-out",
      transform: "scale(1)",
      "&:hover": {
        transform: "scale(1.1)",
      },
    },
    navCont: {
      height: "100%",
    },
    profile: {
      height: "10vh",
      marginTop: "-5px",
    },
    link: {
      "&.active": {
        fontWeight: "bold",
        backgroundColor: "#fff",
        color: "purple",
        borderRadius: "4px",
      },
      textDecoration: "none",
      display: "flex",
      alignItems: "center",
      color: "#fff",
      transition: "all .2s ease-in-out",
      height: "30px",
      width: "300px",
      padding: "2px 3px",
      margin: "15px 0",
      fontFamily: "Raleway, sans-serif",
    },
    linkDark: {
      "&.active": {
        fontWeight: "bold",
        backgroundColor: "#252525",
        color: "#fff",
        borderRadius: "4px",
      },
      textDecoration: "none",
      display: "flex",
      alignItems: "center",
      color: "#fff",
      transition: "all .2s ease-in-out",
      height: "30px",
      width: "300px",
      padding: "2px 3px",
      margin: "15px 0",
      fontFamily: "Raleway, sans-serif",
    },
    private: {
      transition: "all .2s ease-in-out",
      height: "30px",
      width: "300px",
      padding: "2px 3px",
      cursor: "pointer",
      margin: "15px 0",
      fontFamily: "Raleway, sans-serif",
      color: "#fff",
    },
    logOutBtn: {
      fontFamily: "Raleway, sans-serif",
      color: "#fff",
    },
    nameCard: {
      fontFamily: "Inter, sans-serif",
      color: "#fff",
      marginTop: "2px",
      textTransform: "capitalize",
    },
  })
);

const navItems: Array<{ path: string; text: string; icon: ReactNode }> = [
  {
    path: "/app/",
    text: "All",
    icon: <TabIcon style={{ color: "inherit" }} />,
  },
  {
    path: "/app/drafts",
    text: "Drafts",
    icon: <DraftsIcon style={{ color: "inherit" }} />,
  },
  {
    path: "/app/favorite",
    text: "Favorites",
    icon: <FavoriteIcon style={{ color: "inherit" }} />,
  },
  {
    path: "/app/recycle-bin",
    text: "Recycle bin",
    icon: <DeleteIcon style={{ color: "inherit" }} />,
  },
];

export const SideNav: FC<{ handleOpenDialog: () => void }> = ({
  handleOpenDialog,
}) => {
  const classes = useStyles();
  const { mode } = useContext(AppMode);
  const navigation = useNavigate();
  const { fullName } = useSelector((state: StateTypes) =>
    state.auth.user.user ? state.auth.user.user : state.auth.user
  );

  const logout = () => {
    localStorage.removeItem("noted/v2-token");
    navigation("/");
  };

  return (
    <Box className={classes.container}>
      <Box
        p={2}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        className={classes.navCont}
        px={4}
      >
        <div>
          <Box className={classes.profile}>
            <motion.p
              initial={{ y: -30 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              className={classes.nameCard}
            >
              Hello, {fullName.split(" ")[0]}
            </motion.p>
          </Box>
          <Box>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              {navItems.map((item) => (
                <NavLink
                  to={item.path}
                  className={mode === "light" ? classes.link : classes.linkDark}
                >
                  <Box
                    py={1}
                    className={classes.navItem}
                    display="flex"
                    alignItems="center"
                    mr={1}
                  >
                    <div>{item.icon}</div>
                  </Box>
                  {item.text}
                </NavLink>
              ))}
              <Box
                py={1}
                className={classes.private}
                display="flex"
                alignItems="center"
                onClick={handleOpenDialog}
              >
                <div>
                  <LockIcon style={{ color: "#fff" }} />
                </div>
                <Box mx={1.5}>
                  <p>Private</p>
                </Box>
              </Box>
            </motion.div>
          </Box>
        </div>
        <Box
          my={3}
          display="flex"
          alignItems="center"
          justifyContent="flex-start"
          style={{ cursor: "pointer" }}
          onClick={logout}
        >
          <LogoutIcon style={{ color: "#fff" }} />
          <Box ml={1} my={2}>
            <p className={classes.logOutBtn}>Log out</p>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export { SideNav as default };
