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
import SaveIcon from "@material-ui/icons/SaveRounded";
import CancelIcon from "@material-ui/icons/CancelTwoTone";
import LoadingButton from "../ui-component/LoadingButton";
import AnimateButton from "../ui-component/extended/AnimateButton";

const ConfirmSaveDialog = ({ open, handleClose, handleAgree, title, body }) => {
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
      aria-labelledby="save-dialog-title"
      aria-describedby="save-dialog-description"
      sx={{ p: 3 }}
      fullWidth
    >
      <DialogTitle id="save-dialog-title">
        <Typography variant="h4">{title}</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="save-dialog-description">
          <Typography variant="body2">{body}</Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ pr: 2.5 }}>
        <AnimateButton>
          <Button
            onClick={handleClose}
            disabled={loading}
            color="secondary"
            size="small"
            startIcon={<CancelIcon />}
          >
            Cancel
          </Button>
        </AnimateButton>{" "}
        <LoadingButton
          variant="contained"
          size="small"
          onClick={handleClick}
          loading={loading}
          startIcon={<SaveIcon />}
          color="primary"
        >
          Save
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmSaveDialog;
