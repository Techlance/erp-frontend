import React, { useState } from "react";

// material-ui
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@material-ui/core";

// assets
import LoadingButton from "../ui-component/LoadingButton";
import AnimateButton from "../ui-component/extended/AnimateButton";

const ValidationDialog = ({ open, handleClose, handleAgree, title, body }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    await handleAgree();
    setLoading(false);
    handleClose();
  };

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
        <LoadingButton
          variant="contained"
          size="small"
          onClick={handleClick}
          loading={loading}
          color="error"
        >
          OKAY
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default ValidationDialog;
