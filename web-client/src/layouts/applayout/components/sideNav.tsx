import { FC, ReactNode } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { makeStyles, createStyles } from "@mui/styles";
import TabIcon from '@mui/icons-material/Tab';
import { Theme } from "@mui/system";
import { purple } from "@mui/material/colors";
import { Link } from "react-router-dom";

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

const navItems: Array<{ path: string; text: string; icon: ReactNode }> = [
  {
    path: "/app/",
    text: "Documents",
    icon: <TabIcon style={{ color: '#fff' }} />
  },
  {
    path: "/app/drafts",
    text: "Drafts",
    icon: <TabIcon style={{ color: '#fff' }} />
  },
  {
    path: "/app/favorite",
    text: "Favorites",
    icon: <TabIcon style={{ color: '#fff' }} />
  },
  {
    path: "/app/private",
    text: "Private",
    icon: <TabIcon style={{ color: '#fff' }} />
  },
  {
    path: "/app/recycle-bin",
    text: "Recycle bin",
    icon: <TabIcon style={{ color: '#fff' }} />
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
              <Link to={item.path} style={{ textDecoration: 'none' }}>
                <Box py={1} className={classes.navItem} display='flex' alignItems='center'>
                  <div>{item.icon}</div>
                  <Box mx={1.5}>
                    <Typography variant="body1" color="#fff" fontWeight='bold'>
                      {item.text}
                    </Typography>
                  </Box>
                </Box>
              </Link>
            ))}
          </Box>
        </div>
        <Box my={3}>
          <Typography variant="body1" color="#fff" fontWeight='bold'>
            Log out
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export { SideNav as default };
