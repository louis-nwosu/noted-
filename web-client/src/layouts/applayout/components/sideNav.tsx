import { FC, ReactNode, Fragment } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { makeStyles, createStyles } from "@mui/styles";
import TabIcon from "@mui/icons-material/Tab";
import DraftsIcon from "@mui/icons-material/Drafts";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import LockIcon from "@mui/icons-material/Lock";
import LogoutIcon from "@mui/icons-material/Logout";
import { Theme } from "@mui/system";
import { purple } from "@mui/material/colors";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: "100%",
      height: "100%",
      backgroundColor: purple[300],
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
      height: "19vh",
      marginTop: "-5px",
    },
    link: {
      "&.active": {
        color: "red",
      },
      textDecoration: "none"
    },
  })
);

const navItems: Array<{ path: string; text: string; icon: ReactNode }> = [
  {
    path: "/app/",
    text: "All",
    icon: <TabIcon style={{ color: "#fff" }} />,
  },
  {
    path: "/app/drafts",
    text: "Drafts",
    icon: <DraftsIcon style={{ color: "#fff" }} />,
  },
  {
    path: "/app/favorite",
    text: "Favorites",
    icon: <FavoriteIcon style={{ color: "#fff" }} />,
  },
  {
    path: "/app/recycle-bin",
    text: "Recycle bin",
    icon: <DeleteIcon style={{ color: "#fff" }} />,
  },
];

export const SideNav: FC<{ handleOpenDialog: () => void }> = ({
  handleOpenDialog,
}) => {
  const classes = useStyles();
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
            <Typography variant="h6" component="p" color="#fff">
              Louis Nwosu
            </Typography>
          </Box>
          <Box>
            <Fragment>
              {navItems.map((item) => (
                <NavLink
                  to={item.path}
                  className={classes.link}
                >
                  link
                  <Box
                    py={1}
                    className={classes.navItem}
                    display="flex"
                    alignItems="center"
                  >
                    <div>{item.icon}</div>
                    <Box mx={1.5}>
                      {/* <Typography
                        variant="body1"
                        color="#fff"
                        fontWeight="bold"
                      >
                        {item.text}
                      </Typography> */}
                      
                    </Box>
                  </Box>
                </NavLink>
              ))}
              <Box
                py={1}
                className={classes.navItem}
                display="flex"
                alignItems="center"
                onClick={handleOpenDialog}
              >
                <div>
                  <LockIcon style={{ color: "#fff" }} />
                </div>
                <Box mx={1.5}>
                  <Typography variant="body1" color="#fff" fontWeight="bold">
                    Private
                  </Typography>
                </Box>
              </Box>
            </Fragment>
          </Box>
        </div>
        <Box
          my={3}
          display="flex"
          alignItems="center"
          justifyContent="flex-start"
          style={{ cursor: "pointer" }}
        >
          <LogoutIcon style={{ color: "#fff" }} />
          <Box ml={1} my={2}>
            <Typography variant="body1" color="#fff" fontWeight="bold">
              Log out
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export { SideNav as default };
