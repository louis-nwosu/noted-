import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core";
// import MoreIcon from "@material-ui/icons/MoreVert";
import RemoveRedEyeOutlinedIcon from "@material-ui/icons/RemoveRedEyeOutlined";
// import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined'
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  docPad: {
    backgroundColor: "#444",
    cursor: "pointer",
    // "&:hover": {
    //   backgroundColor: "#aa00ff",
    // },
  },
  docPadHoverSec: {
    display: "flex",
    width: "90%",
    textAlign: "center",
    position: "absolute",
    top: 5,
    left: 15,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    // opacity: 0,
    // transform: `translateY(-15px)`,
    // "&:hover": {
    //   top: 10,
    //   transform: `translateY(10px)`,
    //   opacity: 1,
    // },
  },
  previewHeader: {
    color: "#fff",
    transition: "transform .2s ease-in-out",
  },
  hidePreviewHeader: {
    transition: "transform .2s ease-in-out",
    transform: `translateX(30px)`,
    color: "#fff",
  },
}));

const DocPad = () => {
  const classes = useStyles();
  const [isPreviewHidden, setIsPreviewHidden] = React.useState(false);
  const handleSetPreview = () => setIsPreviewHidden(!isPreviewHidden);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <p>delete</p>
      </MenuItem>
    </Menu>
  );
  return (
    <React.Fragment>
      <Box px={1} marginY={1} position="relative">
        <div className={classes.docPad}>
          <Link to="/test" style={{ textDecoration: "none", color: "#999" }}>
            <Box boxShadow={3} px={2} py={1}>
              <h1
                className={
                  isPreviewHidden
                    ? classes.hidePreviewHeader
                    : classes.previewHeader
                }
              >
                Think, louis
              </h1>
              <p
                style={
                  isPreviewHidden
                    ? { opacity: 0 }
                    : { marginTop: 7, color: "#fff" }
                }
              >
                The mind is a dangerous place, thats why i think with a vest
                on...
              </p>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "flex-end",
                }}
              >
                <Typography
                  variant="caption"
                  color="textSecondary"
                  align="right"
                >
                  Last modified: 21-03-21
                </Typography>
              </div>
            </Box>
          </Link>
        </div>
        <div className={classes.docPadHoverSec}>
          <Box p={1}>
              <DeleteOutlineOutlinedIcon />
          </Box>
        </div>
        {renderMobileMenu}
        <div
          onClick={handleSetPreview}
          style={{
            display: "inline-block",
            width: "10%",
            textAlign: "center",
            position: "absolute",
            bottom: 5,
            left: 15,
          }}
        >
          <Box pt={1}>
            <RemoveRedEyeOutlinedIcon />
          </Box>
        </div>
      </Box>
    </React.Fragment>
  );
};

export default DocPad;
