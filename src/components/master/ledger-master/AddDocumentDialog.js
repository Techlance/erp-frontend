import React, { useState } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";

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
import useLedgerMaster from "../../../hooks/useLedgerMaster";
import { gridSpacing } from "../../../store/constant";

// assets
import LoadingButton from "../../../ui-component/LoadingButton";
import AnimateButton from "../../../ui-component/extended/AnimateButton";
import AddIcon from "@material-ui/icons/AddCircleTwoTone";
import CancelIcon from "@material-ui/icons/CancelTwoTone";

const AddDocumentDialog = ({ open, handleClose, newLedger }) => {
  const { user } = useAuth();
  const { mid } = useParams();

  const { createLedgerDoc } = useLedgerMaster();

  const { company_ledger_details } = useSelector((state) => state.ledgerMaster);

  const [values, setValues] = useState({
    created_by: user.email,
    doc_name: "",
    company_master_id: parseInt(mid),
    ledger_master_id: newLedger
      ? parseInt(newLedger.id)
      : parseInt(company_ledger_details?.id),
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
      company_master_id: parseInt(mid),
      ledger_master_id: newLedger
        ? parseInt(newLedger.id)
        : parseInt(company_ledger_details?.id),
      created_by: user.email,
      file: null,
    });

    handleClose();
  };

  const handleSubmit = async () => {
    if (!values.file) return;
    setClicked(true);
    await createLedgerDoc(values, () => handleCloseModal());
    setClicked(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleCloseModal}
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
            Upload A{" "}
            {newLedger
              ? newLedger.ledger_name
              : company_ledger_details?.ledger_name}{" "}
            related Document.
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
            onClick={handleCloseModal}
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
          startIcon={<AddIcon />}
        >
          {clicked ? "Uploading" : "Add"}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default AddDocumentDialog;
