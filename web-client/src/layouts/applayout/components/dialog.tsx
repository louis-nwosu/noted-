import { FC } from "react";

import { Box, Theme, Typography, TextField, Button } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import LockIcon from "@mui/icons-material/Lock";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      position: "absolute",
      width: "100%",
      height: "100vh",
      zIndex: "200",
      transform: "scale(1.1) translateX(0)",
      transition: "all .3s ease-in-out",
      opacity: 1,
    },
    HideContainer: {
      position: "absolute",
      width: "100%",
      height: "100vh",
      zIndex: "200",
      transform: "scale(1.1) translateY(600px)",
      transition: "all .5s ease-in-out",
      opacity: 0,
    },
    contentBox: {
      position: "relative",
    },
    backdrop: {
      position: "absolute",
      width: "100%",
      height: "100vh",
      backgroundColor: "#000",
      top: 0,
      opacity: "0.7",
      margin: 0,
      padding: 0,
    },
    dialogBox: {
      width: "30%",
      backgroundColor: "#fff",
      position: "absolute",
      padding: theme.spacing(1, 2),
      transform: "translate(500px,150px)",
      borderRadius: theme.spacing(0.3),
      [theme.breakpoints.down("sm")]: {
        transform: "translate(35px,300px)",
        width: "75%",
      },
    },
  })
);

interface DialogInterface {
  dialogState: boolean;
  handleDialogState: (state: boolean) => void;
}

export const Dialog: FC<DialogInterface> = ({
  dialogState,
  handleDialogState,
}) => {
  const classes = useStyles();
  return (
    <div className={dialogState ? classes.container : classes.HideContainer}>
      <div className={classes.contentBox}>
        <div
          className={classes.backdrop}
          onClick={() => {
            handleDialogState(false);
          }}
        ></div>
        <div className={classes.dialogBox}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            my={1}
          >
            <LockIcon style={{ color: "purple" }} />
            <span className={undefined}>Private</span>
          </Box>
          <Typography color="#666" variant="body2" align="center">
            Enter pasword to view private documents
          </Typography>
          <Box
            my={2}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <TextField variant="outlined" size="small" color="secondary">
              Enter password
            </TextField>
          </Box>
          <Box
            mt={2}
            px={5}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Button
              variant="text"
              color="secondary"
              onClick={() => {
                handleDialogState(false);
              }}
            >
              Cancel
            </Button>
            <Button variant="contained" color="secondary">
              Ok
            </Button>
          </Box>
        </div>
      </div>
    </div>
  );
};

export { Dialog as default };
