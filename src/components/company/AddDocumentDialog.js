import React, { useState, useEffect } from "react";

// material-ui
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
  Grid,
} from "@material-ui/core";

// project imports
import useAuth from "../../hooks/useAuth";
import useCompany from "../../hooks/useCompany";

// assets
import { gridSpacing } from "../../store/constant";
import { useSelector } from "react-redux";

const AddDocumentDialog = ({ open, handleClose }) => {
  const { user } = useAuth();

  const company = useSelector((state) => state.company);
  const { current_company } = company;

  const { createCompanyDoc } = useCompany();

  const [values, setValues] = useState({
    created_by: user.email,
    doc_name: "",
    company_master_id: current_company.id,
    file: null,
  });

  useEffect(() => {
    setValues({
      ...values,
      company_master_id: current_company.id,
      created_by: user.email,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current_company]);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.id]: event.target.value,
    });
  };

  const handleUpload = (event) => {
    setValues({
      ...values,
      [event.target.id]: event.target.files[0],
    });
  };

  const handleCloseModal = () => {
    setValues({
      doc_name: "",
      company_master_id: current_company.id,
      created_by: user.email,
      file: null,
    });

    handleClose();
  };

  const handleSubmit = async () => {
    if (!values.file) return;
    await createCompanyDoc(values);
    handleCloseModal();
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
        <Typography variant="h4">Upload Document</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography variant="body2">
            Upload A {current_company.company_name} related Document.
          </Typography>
        </DialogContentText>
        <Grid container spacing={gridSpacing}>
          <Grid item sm={12} xs={12}>
            <TextField
              fullWidth
              id="doc_name"
              label="Document Name"
              value={values.registration_no}
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
            />
          </Grid>
          <Grid item sm={12} xs={12}>
            <div>
              <input type="file" id="file" onChange={handleUpload} />
              <Typography>
                {values.file ? values.file.fileName : "Upload Files"}
              </Typography>
            </div>
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

export default AddDocumentDialog;
