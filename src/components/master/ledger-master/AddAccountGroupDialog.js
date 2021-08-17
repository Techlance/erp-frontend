import React, { useEffect, useState } from "react";

import { Grid } from "@material-ui/core";

// project imports
import { gridSpacing } from "../../../store/constant";
import LoadingButton from "../../../ui-component/LoadingButton";

// material-ui
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button,
  Typography,
} from "@material-ui/core";

import SaveIcon from "@material-ui/icons/SaveRounded";
import CancelIcon from "@material-ui/icons/Cancel";

// project imports
import useAuth from "../../../hooks/useAuth";
import useLedgerMaster from "../../../hooks/useLedgerMaster";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import AnimateButton from "../../../ui-component/extended/AnimateButton";
import AccountHeadSelect from "./AccountHeadSelect";
import ParentGroupSelect from "./ParentGroupSelect";

const AddUserDialog = ({ open, handleClose }) => {
  const { user } = useAuth();
  const { addCompanyAccountGroup } = useLedgerMaster();
  const { mid } = useParams();

  const { company_account_groups } = useSelector((state) => state.ledgerMaster);

  const [clicked, setClicked] = useState(false);
  const [error, setError] = useState(false);
  const [nameError, setNameError] = useState(false);

  const [values, setValues] = useState({
    group_name: "",
    acc_head_id: null,
    group_code: "",
    child_of: null,
    is_fixed: false,
    company_master_id: parseInt(mid),
    created_by: user.email,
  });

  useEffect(() => {
    if (
      company_account_groups?.find(
        (acc) => acc.group_code === values.group_code
      )
    ) {
      setError(true);
    } else {
      setError(false);
    }

    if (
      company_account_groups?.find(
        (acc) => acc.group_name === values.group_name
      )
    ) {
      setNameError(true);
    } else {
      setNameError(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [company_account_groups]);

  useEffect(() => {
    setValues({
      ...values,
      created_by: user.email,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleChange = (event) => {
    if (event.target.id === "group_code") {
      console.log(event.target.value);
      if (
        company_account_groups.find(
          (acc) => acc.group_code === event.target.value
        )
      ) {
        setError(true);
      } else {
        setError(false);
      }
      if (event.target.value.length > 4) return null;
    }
    if (event.target.id === "group_name") {
      console.log(event.target.value);
      if (
        company_account_groups.find(
          (acc) => acc.group_name === event.target.value
        )
      ) {
        setNameError(true);
      } else {
        setNameError(false);
      }
    }
    setValues({
      ...values,
      [event.target.id]: event.target.value,
    });
  };

  const handleSelect = (key, value) => {
    if (key === "acc_head_id") {
      setValues({
        ...values,
        child_of: null,
        [key]: value,
      });
    } else {
      setValues({
        ...values,
        [key]: value,
      });
    }
  };

  const handleSubmit = async () => {
    setClicked(true);
    let form = { ...values };
    form.acc_head_id = parseInt(form.acc_head_id.id);
    form.child_of = parseInt(form.child_of.id);
    console.log(form);
    await addCompanyAccountGroup(form);
    setClicked(false);
    setValues({
      group_name: "",
      acc_head_id: null,
      group_code: "",
      child_of: null,
      is_fixed: false,
      company_master_id: parseInt(mid),
      created_by: user.email,
    });
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
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
              id="group_name"
              label="Group Name"
              value={values.group_name}
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
              error={nameError}
              helperText={nameError && "This Group Name Already Exists."}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="group_code"
              label="Group Code"
              value={values.group_code}
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
              error={error}
              helperText={error && "This Group Code Already Exists."}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AccountHeadSelect
              captionLabel="Account Head"
              InputLabelProps={{ shrink: true }}
              selected={values.acc_head_id}
              onChange={handleSelect}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <ParentGroupSelect
              captionLabel="Parent Group"
              InputLabelProps={{ shrink: true }}
              selected={values.child_of}
              onChange={handleSelect}
              disabled={values.acc_head_id === null}
              head_id={values.acc_head_id?.id}
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
            onClick={() => {
              setValues({
                group_name: "",
                acc_head_id: null,
                group_code: "",
                child_of: null,
                is_fixed: false,
                company_master_id: parseInt(mid),
                created_by: user.email,
              });
              handleClose();
            }}
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
