import { FC, Fragment } from "react";

import { Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { makeStyles, createStyles } from "@mui/styles";
import { Theme } from "@mui/system";

const useTrashEmpty = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: "100%",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    trashEmptyTxt: {
      color: "#666",
      fontSize: "20px",
    },
  })
);

const useTrashCan = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(5),
      height: '93.1vh'
    },
    del: {
      cursor: 'pointer',
      backgroundColor: 'purple',
      padding: theme.spacing(1),
      color: '#fff',
      borderRadius: '15px',
      fontSize: '13px'
    },
    restore: {
      backgroundColor: '#DDA0DD',
      cursor: 'pointer',
      padding: theme.spacing(1),
      color: '#fff',
      borderRadius: '15px',
      fontSize: '13px'
    }
  })
);

const TrashEmpty: FC = () => {
  const classes = useTrashEmpty();
  return (
    <Box className={classes.container}>
      <span>
        <Box display="flex" justifyContent="center" alignItems="center">
          <DeleteIcon style={{ color: "purple", fontSize: "100px" }} />
        </Box>
        <p className={classes.trashEmptyTxt}>Trash is empty</p>
      </span>
    </Box>
  );
};

const TrashCan: FC = () => {
  const classes = useTrashCan();
  return (
    <div className={classes.container}>
      <Box width='13%' display='flex' justifyContent='space-between' p={2.5}>
        <span className={classes.restore}>Restore</span>
        <span className={classes.del}>Empty</span>
      </Box>
    </div>
  );
};

//exp data
const trashObj = [0];

export const Trash: FC = () => {
  return (
    <Fragment>{trashObj.length === 0 ? <TrashEmpty /> : <TrashCan />}</Fragment>
  );
};

export { Trash as default };
