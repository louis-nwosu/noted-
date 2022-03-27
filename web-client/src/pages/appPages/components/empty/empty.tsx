import { FC } from "react";

import { Box, Button } from "@mui/material";
import { makeStyles, createStyles, ThemeProvider } from "@mui/styles";
import { Theme } from "@mui/system";

import { appTheme } from "../../../../themes";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: "100%",
      height: "100vh",
      backgroundColor: "#fff",
    },
    text: {
      width: '60%',
      textAlign: 'center',
      margin: '0 auto',
      color: '#555',
      [theme.breakpoints.down('sm')]: {
        width: '90%'
      }
    },
    btnContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }
  })
);

export const EmptyPage: FC<{ text: string }> = ({ text }) => {
  const classes = useStyles();
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      className={classes.container}
    >
      <div>
        <p className={classes.text}>You don't have any {text}, hit the button below to add a new document</p>
        <Box my={2} className={classes.btnContainer}>
          <ThemeProvider theme={appTheme}>
            <Button variant="contained" color="secondary">Add Document</Button>
          </ThemeProvider>
        </Box>
      </div>
    </Box>
  );
};

export { EmptyPage as default };
