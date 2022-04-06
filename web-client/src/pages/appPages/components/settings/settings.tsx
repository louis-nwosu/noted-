import { FC } from "react";

import { Box } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import { Theme } from "@mui/system";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: "200px",
      height: "100vh",
      backgroundColor: "#fff",
      padding: theme.spacing(0, 2),
    },
    header: {
      textAlign: "center",
      fontWeight: "bold",
      color: "purple",
    },
    headerContainer: {
      width: "100%",
      height: "6.5vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    sectionHeaders: {
      fontWeight: "bold",
      color: "#777",
    },
    themePickerContainer: {
      display: "flex",
      width: "100%",
      justifyContent: "space-between",
      alignItems: "center",
      border: '1.5px solid #DDA0DD',
      borderRadius: '50px',
      height: '30px'
    },
    lightThemePickerItem: {
      width: "50%",
      display: 'flex',
      justifyContent: "center",
      alignItems: "center",
      cursor: 'pointer',
      color: '#555',
      
    },
    darkThemePickerItem: {
      width: "50%",
      display: 'flex',
      justifyContent: "center",
      alignItems: "center",
      cursor: 'pointer',
      color: '#fff',
      backgroundColor: '#333',
      height: '100%',
      borderRadius: '0 50px 50px 0'
    },
  })
);

export const Settings: FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Box className={classes.headerContainer}>
        <p className={classes.header}>Settings</p>
      </Box>
      <Box>
        <p className={classes.sectionHeaders}>Theme</p>
        <span className={classes.themePickerContainer}>
          <span className={classes.lightThemePickerItem}>Light</span>
          <span className={classes.darkThemePickerItem}>Dark</span>
        </span>
      </Box>
    </div>
  );
};

export { Settings as default };
