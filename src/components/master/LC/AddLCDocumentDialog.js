import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

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
import useAuth from "../../../hooks/useAuth";
import useLC from "../../../hooks/useLC";
import { gridSpacing } from "../../../store/constant";

// assets
import LoadingButton from "../../../ui-component/LoadingButton";
import SaveIcon from "@material-ui/icons/SaveRounded";
import CancelIcon from "@material-ui/icons/Cancel";
import AnimateButton from "../../../ui-component/extended/AnimateButton";

const AddLCDocumentDialog = ({ newLC, open, handleClose }) => {
  const { user } = useAuth();
  const { lc_id, mid } = useParams();

  const { current_lc } = useSelector((state) => state.lc);
  const { createLcDocs } = useLC();

  const [values, setValues] = useState({
    created_by: user.email,
    doc_name: "",
    company_master_id: mid,

    file: null,
  });
  const [clicked, setClicked] = useState(false);

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
      //   lc_id: current_lc.id,
      company_master_id: mid,
      created_by: user.email,
      file: null,
    });
    setClicked(false);
    handleClose();
  };

  const handleSubmit = async () => {
    if (!values.file) return;
    setClicked(true);
    let form = { ...values };
    form.created_by = user.email;
    if (newLC) {
      form.lc_id = newLC.lc_no;
    } else {
      form.lc_id = lc_id;
    }
    await createLcDocs(form);
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
            Upload A {current_lc ? current_lc?.lc_name : newLC?.lc_name} related
            Document. Upload a Document.
          </Typography>
        </DialogContentText>
        <Grid container spacing={gridSpacing}>
          <Grid item sm={12} xs={12}>
            <TextField
              fullWidth
              id="doc_name"
              label="Document Name"
              value={values.doc_name}
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
        <AnimateButton>
          <Button
            onClick={handleClose}
            color="error"
            variant="contained"
            size="small"
            disabled={clicked}
            startIcon={<CancelIcon />}
          >
            Cancel
          </Button>
        </AnimateButton>

        <LoadingButton
          color="primary"
          variant="contained"
          size="small"
          onClick={handleSubmit}
          loading={clicked}
          startIcon={<SaveIcon />}
        >
          Add
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default AddLCDocumentDialog;
