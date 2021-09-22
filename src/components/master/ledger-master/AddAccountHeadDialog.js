import React, { useEffect, useState } from "react";

// material-ui
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
  Button,
  Typography,
} from "@material-ui/core";

import SaveIcon from "@material-ui/icons/SaveRounded";
import CancelIcon from "@material-ui/icons/Cancel";

// project imports
import { gridSpacing } from "../../../store/constant";
import LoadingButton from "../../../ui-component/LoadingButton";
import useAuth from "../../../hooks/useAuth";
import useLedgerMaster from "../../../hooks/useLedgerMaster";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import HeadTitleSelect from "./HeadTitleSelect";
import AnimateButton from "../../../ui-component/extended/AnimateButton";

const AddUserDialog = ({ open, handleClose }) => {
  const { user } = useAuth();
  const { addCompanyAccountHead } = useLedgerMaster();
  const { mid } = useParams();

  const { company_account_heads } = useSelector((state) => state.ledgerMaster);

  const [values, setValues] = useState({
    schedule_no: null,
    acc_head_name: "",
    title: "ASSETS",
    bs: true,
    company_master_id: parseInt(mid),
    created_by: user.email,
    is_fixed: false,
  });

  useEffect(() => {
    if (
      company_account_heads?.find(
        (acc) => acc.schedule_no === values.schedule_no
      )
    ) {
      setError(true);
    } else {
      setError(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [company_account_heads]);

  useEffect(() => {
    setValues({
      ...values,
      created_by: user.email,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const [clicked, setClicked] = useState(false);
  const [error, setError] = useState(false);

  const handleClearClose = () => {
    setValues({
      schedule_no: null,
      acc_head_name: "",
      title: "ASSETS",
      bs: true,
      company_master_id: parseInt(mid),
      created_by: user.email,
      is_fixed: false,
    });
    setClicked(false);
    setError(false);
    handleClose();
  };

  const handleChange = (event) => {
    if (event.target.id === "schedule_no") {
      if (
        company_account_heads.find(
          (acc) => acc.schedule_no === parseInt(event.target.value)
        )
      ) {
        setError(true);
      } else {
        setError(false);
      }
    }
    setValues({
      ...values,
      [event.target.id]: event.target.value,
    });
  };

  const handleSelect = (key, value) => {
    setValues({
      ...values,
      [key]: value,
    });
  };

  const handleSubmit = async () => {
    setClicked(true);
    let form = { ...values };
    form.schedule_no = parseInt(values.schedule_no);
    form.bs = form.title === "ASSETS" || form.title === "EQUITY AND LIABLITIES";
    await addCompanyAccountHead(form, () => handleClearClose());
    setClicked(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClearClose}
      aria-labelledby="create-user"
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle id="form-dialog-title">
        <Typography variant="h4">Create Account Head</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography variant="body2">Create a new account head.</Typography>
        </DialogContentText>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              id="schedule_no"
              label="Schedule Number"
              value={values.schedule_no}
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
              type="number"
              error={error}
              helperText={error && "This Schedule No. Already Exists."}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <HeadTitleSelect
              captionLabel="Title*"
              InputLabelProps={{ shrink: true }}
              selected={values.title}
              onChange={handleSelect}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              required
              id="acc_head_name"
              label="Accound Head Name"
              value={values.acc_head_name}
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ pr: 2.5 }}>
        <AnimateButton>
          <Button
            color="error"
            variant="contained"
            size="small"
            onClick={handleClearClose}
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

export default AddUserDialog;
