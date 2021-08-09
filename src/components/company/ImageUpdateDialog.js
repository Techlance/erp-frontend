import React, { useState } from "react";

// material-ui
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Grid,
  Avatar,
} from "@material-ui/core";

// project imports
import useCompany from "../../hooks/useCompany";
import { gridSpacing } from "../../store/constant";

const ImageUpdateDialog = ({ open, handleClose, handleFileUpload, values }) => {
  const { updateCompany } = useCompany();

  const [img, setimg] = useState(null);

  const handleUpload = (event) => {
    handleFileUpload(event);
    src(event.target.files[0]);
  };

  const handleCloseModal = () => {
    setimg(null);
    handleClose();
  };

  const handleSubmit = () => {
    updateCompany(values);

    handleCloseModal();
  };

  const src = (val) => {
    var reader = new FileReader();
    reader.onload = function (e) {
      setimg(e.target.result);
    };
    reader.readAsDataURL(val);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="upload-document"
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle id="form-dialog-title">
        <Typography variant="h4">Update Logo</Typography>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={gridSpacing}>
          <Grid item sm={12}>
            <Typography variant="body2" align="center">
              Upload A Logo for {values.company_name}.
            </Typography>
          </Grid>
          <Grid item sm={12} align="center">
            <Avatar
              alt="Company Logo"
              style={{ height: "100px", width: "100px" }}
              src={img}
            />
          </Grid>
          <Grid item sm={12} align="center">
            <input type="file" id="file" onChange={handleUpload} />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ pr: 2.5 }}>
        <Button onClick={handleClose} color="error">
          Cancel
        </Button>
        <Button
          variant="contained"
          size="small"
          onClick={handleSubmit}
          color="primary"
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ImageUpdateDialog;
