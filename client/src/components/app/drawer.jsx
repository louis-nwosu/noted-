import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { deepPurple } from "@material-ui/core/colors";
import FolderIcon from "@material-ui/icons/Folder";
import AssignmentIcon from "@material-ui/icons/Assignment";
import NotesRoundedIcon from "@material-ui/icons/NotesRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  color: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  iconFolderBg: {
    backgroundColor: "",
  },
}));

const snUseStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
}));

function SideNavTop() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid container className={classes.root}>
        <Grid item md={12} xs={12}>
          <Box marginY={2} marginX={2}>
            <Box marginY={1}>
              <Grid container>
                <Grid item md={2}>
                  <Box marginY={1}>
                    <FolderIcon color="primary" fontSize="small" />
                  </Box>
                </Grid>
                <Grid item md={8}>
                  <Box marginY={0.7}>
                    <Typography variant="body1" color="initial">
                      Collection
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box marginY={1}>
              <Grid container>
                <Grid item md={2}>
                  <Box marginY={1}>
                    <AssignmentIcon color="primary" fontSize="small" />
                  </Box>
                </Grid>
                <Grid item md={8}>
                  <Box marginY={0.7}>
                    <Typography variant="body1" color="initial">
                      Current
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box marginY={1}>
              <Grid container>
                <Grid item md={2}>
                  <Box marginY={1}>
                    <NotesRoundedIcon color="primary" fontSize="small" />
                  </Box>
                </Grid>
                <Grid item md={8}>
                  <Box marginY={0.7}>
                    <Typography variant="body1" color="initial">
                      All notes
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box marginY={1}>
              <Grid container>
                <Grid item md={2}>
                  <Box marginY={1}>
                    <DeleteRoundedIcon color="primary" fontSize="small" />
                  </Box>
                </Grid>
                <Grid item md={8}>
                  <Box marginY={0.7}>
                    <Typography variant="body1" color="initial">
                      Recycle bin
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

function SideNavBottom({ handleSetIsDarkMode }) {
  // const [isChecked, setIsChecked] = React.useState(false);
  // const setMode = () => {
  //   if (isChecked) {
  //     console.log(isChecked);
  //     handleSetIsDarkMode("dark");
  //     console.log('got here 1')
  //     return;
  //   } else {
  //     console.log(isChecked);
  //     console.log('not got 2')
  //     handleSetIsDarkMode("light");
  //     return
  //   }
  // };
  // setMode();
  return (
    <React.Fragment>
      <Box marginX={2}>
        <Grid container>
          <Grid item md={6} xs={6}>
            <FormControl component="fieldset">
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  value="start"
                  control={<Switch color="primary" />}
                  // checked={isChecked}
                  // onClick={() => {
                  //   setIsChecked(!isChecked);
                  // }}
                />
              </FormGroup>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
}

export function SideNav({ handleSetIsDarkMode }) {
  const classes = snUseStyles();
  return (
    <div className={classes.container}>
      <SideNavTop />
      <SideNavBottom handleSetIsDarkMode={handleSetIsDarkMode} />
    </div>
  );
}

const TBuseStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

export function TemporaryDrawer({ toggleDrawer, state }) {
  const classes = TBuseStyles();

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
