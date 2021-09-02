import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@material-ui/core";
import React from "react";

const ConfirmDeleteDialog = ({
  open,
  handleClose,
  handleAgree,
  title,
  body,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{ p: 3 }}
    >
      <DialogTitle id="alert-dialog-title">
        <Typography variant="h4">{title}</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Typography variant="body2">{body}</Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ pr: 2.5 }}>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          variant="contained"
          size="small"
          onClick={() => {
            handleAgree();
            handleClose();
          }}
          color="error"
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeleteDialog;
