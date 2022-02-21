import { FC, ReactNode } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { makeStyles, createStyles } from "@mui/styles";
import TabIcon from '@mui/icons-material/Tab';
import { Theme } from "@mui/system";
import { purple } from "@mui/material/colors";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: "100%",
      height: "100%",
      backgroundColor: purple[300],
    },
    navItem: {
      cursor: "pointer",
      transition: 'all .2s ease-in-out',
      transform: 'scale(1)',
      '&:hover': {
        transform: 'scale(1.1)',
      }
    },
    navCont: {
      height: "100%",
    },
    profile: {
      height: "20vh",
    },
  })
);

const navItems: Array<{ path: String; text: String; icon: ReactNode }> = [
  {
    path: "all-docs",
    text: "All documents",
    icon: <TabIcon />
  },
  {
    path: "drafts",
    text: "Drafts",
    icon: <TabIcon />
  },
  {
    path: "favorites",
    text: "Favorites",
    icon: <TabIcon />
  },
  {
    path: "private",
    text: "Private",
    icon: <TabIcon />
  },
  {
    path: "recycle-bin",
    text: "Recycle bin",
    icon: <TabIcon />
  },
  {
    path: "",
    text: "",
    icon: <TabIcon />
  },
];

export const SideNav: FC = () => {
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
            {navItems.map((item) => (
              <Box py={1} className={classes.navItem}>
                <Typography variant="body1" color="#fff">
                  {item.text}
                </Typography>
              </Box>
            ))}
          </Box>
        </div>
        <Box my={3}>
          <p>logout</p>
        </Box>
      </Box>
    </Box>
  );
};

export { SideNav as default };
