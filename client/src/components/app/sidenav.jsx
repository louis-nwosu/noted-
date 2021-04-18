import React from "react";
//import materialUI components
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
//import material UI icons
import AccessAlarmIcon from "@material-ui/icons/AccessAlarm";

const SideNav = () => {
  return (
    <div>
      <Grid container>
        <Grid item md={12} xs={12}>
          <Grid container>
            <Box
              display="flex"
              flexDirection="row"
              bgcolor="background.paper"
              marginY={3}
              marginX={2}
            >
              <Box p={1} bgcolor="grey.300">
                <AccessAlarmIcon />
              </Box>
              <Box p={1} bgcolor="grey.300">
                Item 2
              </Box>
            </Box>
          </Grid>
          <Grid container spacing={6}></Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default SideNav;
