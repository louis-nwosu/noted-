import React from "react";
import { makeStyles } from "@material-ui/core/styles";
//import material UI components
import Modal from "@material-ui/core/Modal";
//local components
import TextEditor from "./editor";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 55;
  const left = 55;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: "60%",
    height: 500,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 1, 1),
    overflowY: "scroll",
  },
}));

export default function SimpleModal({ render, getDoc }) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title"></h2>
      <p id="simple-modal-description">
        Text entered is fully editable and can be exported in any format.
      </p>
      <SimpleModal />
      <TextEditor getDoc={getDoc} />
    </div>
  );

  const modalIcon = () => render;

  return (
    <div>
      <div type="button" onClick={handleOpen}>
        {modalIcon()}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
