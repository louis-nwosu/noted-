import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";
import { convertFromRaw, converToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import EditIcon from "@material-ui/icons/Edit";
import { asyncGetSingleDoc } from "../../store/actions";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
    editIconSec: {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
    },
}));

const ViewEditComp = ({ match }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    React.useEffect(() => {
      //  dispatch(asyncGetSingleDoc({ ID: match.params.id, date: '' }, localStorage.getItem('docs_collection_id')))
    });
    return (
        <div>
            <Box paddingY={2} paddingX={2}>
                <Grid container>
                    <Grid item xs={2} md={2}>
                        <Box paddingX={1}>
                            <ArrowBackIcon />
                        </Box>
                    </Grid>
                    <Grid item xs={8} md={8}>
                        <Typography variant="body2" color="inherit" align="center" noWrap>
                            dummy_doc_3439894
                        </Typography>
                    </Grid>
                    <Grid item xs={2} md={2} className={classes.editIconSec}>
                        <EditIcon />
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
};

export default ViewEditComp;
