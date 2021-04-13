import React from "react";

//import material UI components
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";

///create the style hook
const useStyle = makeStyles({
  container: {
    marginTop: "6%",
  },
  image: {
    width: "80%",
    height: "80%",
  },
  secHeader: {
    marginTop: "3%",
    fontSize: 35,
  },
  secText: {
    paddingRight: 100,
    marginTop: "3%",
  },
  secImg: {
    marginTop: "6%",
  },
  btn: {
    marginTop: "2%",
  },
});

const Features = () => {
  //initialize the hook
  const classes = useStyle();
  return (
    <>
      <Container fluid className={classes.container}>
        <Grid container spacing={5}>
          <Grid item xs={12} md={6}>
            <img
              src="https://evernote.com/c/assets/homepage/integrations.svg?32b746ff5f7b7812"
              className={classes.secImg}
            />
            <Typography
              variant="h5"
              component="h2"
              color="initial"
              className={classes.secHeader}
            >
              App intergrations
            </Typography>
            <Typography color="initial" className={classes.secText}>
              Share content across apps. Evernote connects with the productivity
              tools you already use, so you can work your way.
            </Typography>
            <Button variant="text" color="primary" className={classes.btn}>
              Learn more
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <img
              src="https://evernote.com/c/assets/homepage/feature_integration@2x.png?be711b55a9463ad8"
              alt=""
              className={classes.image}
            />
          </Grid>
        </Grid>
        <Grid container spacing={5}>
          <Grid item xs={12} md={6}>
            <img
              src="https://evernote.com/c/assets/homepage/feature_document_scanning__en.png?e93c63b224363f0d"
              alt=""
              className={classes.image}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <img
              src="https://evernote.com/c/assets/homepage/doc-scanning.svg?54e07b63a6988c1e"
              className={classes.secImg}
            />
            <Typography
              variant="h5"
              component="h2"
              color="initial"
              className={classes.secHeader}
            >
              Document scanning
            </Typography>
            <Typography color="initial" className={classes.secText}>
              Go paperless. Back up important documents to all your devices, and
              keep the information—not the clutter.
            </Typography>
            <Button variant="text" color="primary" className={classes.btn}>
              Learn more
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={5}>
          <Grid item xs={12} md={6}>
            <img
              src="https://evernote.com/c/assets/homepage/web-clipping.svg?7b31cc4e08aca215"
              className={classes.secImg}
            />
            <Typography
              variant="h5"
              component="h2"
              color="initial"
              className={classes.secHeader}
            >
              Web clipper
            </Typography>
            <Typography color="initial" className={classes.secText}>
              Save web pages (without the ads) and mark them up with arrows,
              highlights, and text to make them more useful.
            </Typography>
            <Button variant="text" color="primary" className={classes.btn}>
              Learn more
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <img
              src="https://evernote.com/c/assets/homepage/feature_web_clipper__en.png?219c0e34cc6c10ff"
              alt=""
              className={classes.image}
            />
          </Grid>
        </Grid>
        <Grid container spacing={5}>
          <Grid item xs={12} md={6}>
            <img
              src="https://evernote.com/c/assets/homepage/feature_mobile__en.png?4ff8b1eb42e9761e"
              alt=""
              className={classes.image}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <img
              src="https://evernote.com/c/assets/homepage/rich_notes.svg?4be8ba71638c18bb"
              className={classes.secImg}
            />
            <Typography
              variant="h5"
              component="h2"
              color="initial"
              className={classes.secHeader}
            >
              Rich notes
            </Typography>
            <Typography color="initial" className={classes.secText}>
              Express ideas, capture images, and record audio in meetings or
              lectures, all from your phone or tablet—even if you’re offline.
            </Typography>
            <Button variant="text" color="primary" className={classes.btn}>
              Learn more
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Features;
