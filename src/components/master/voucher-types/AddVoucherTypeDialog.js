import React, { useState } from "react";

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
  Collapse,
} from "@material-ui/core";

// assets
import AnimateButton from "../../../ui-component/extended/AnimateButton";
import LoadingButton from "../../../ui-component/LoadingButton";
import SaveIcon from "@material-ui/icons/SaveRounded";
import CancelIcon from "@material-ui/icons/Cancel";

// project imports
import useAuth from "../../../hooks/useAuth";
import useVoucherTypes from "../../../hooks/useVoucherTypes";
import { useParams } from "react-router";
import AutoNumberingCheckbox from "./AutoNumberingCheckbox";
import RestartSelect from "./RestartSelect";
import AuthorizationIDSelect from "./AuthorizationIDSelect";
import VoucherClassSelect from "./VoucherClassSelect";

const AddVoucherType = ({ open, handleClose }) => {
  const { user } = useAuth();
  const { createVoucherTypes } = useVoucherTypes();
  const { mid } = useParams();

  const setInitialValues = () => ({
    voucher_name: "",
    voucher_class: "",
    authorization_id: null,
    auto_numbering: false,
    prefix: null,
    restart: "year",
    is_fixed: false,
    company_master_id: parseInt(mid),
    created_by: user.email,
  });

  const [clicked, setClicked] = useState(false);

  const [values, setValues] = useState(setInitialValues);

  const handleChange = (event) => {
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

  const handleChecked = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSubmit = async () => {
    setClicked(true);
    if (values.authorization_id !== null) {
      values.authorization_id = values.authorization_id.id;
    } else {
      values.authorization_id = "null";
    }
    await createVoucherTypes(mid, values);
    setValues(setInitialValues);
    setClicked(false);
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="create-user"
      fullWidth
      maxWidth="sm"
      keepMounted
    >
      <DialogTitle id="form-dialog-title">
        <Typography variant="h4">Create Voucher Type</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography variant="body2">Create a new voucher type.</Typography>
        </DialogContentText>

        <Grid container spacing={2} mb={2}>
          <Grid item sm={6}>
            <TextField
              fullWidth
              id="voucher_name"
              label="Voucher Name"
              value={values.voucher_name}
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
              type="text"
            />
          </Grid>
          <Grid item sm={6}>
            <VoucherClassSelect
              fullWidth
              captionLabel="Voucher Class"
              selected={values.voucher_class}
              onChange={handleSelect}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} mb={2}>
          <Grid item sm={12}>
            <AuthorizationIDSelect
              selected={values.authorization_id}
              captionLabel="Authorization"
              onChange={handleSelect}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} mb={2}>
          <Grid item sm={6}>
            <AutoNumberingCheckbox
              fullWidth
              InputLabelProps={{ shrink: true }}
              id="auto_numbering"
              captionLabel="Auto Numbering"
              selected={values.auto_numbering}
              onChange={handleChecked}
            />
          </Grid>
        </Grid>
        <Collapse in={values.auto_numbering}>
          <Grid container spacing={2} mb={2}>
            <Grid item sm={6}>
              <TextField
                fullWidth
                id="prefix"
                label="Prefix"
                value={values.prefix}
                InputLabelProps={{ shrink: true }}
                onChange={handleChange}
                type="text"
              />
            </Grid>
            <Grid item sm={6}>
              <RestartSelect
                captionLabel="Restart"
                selected={values.restart}
                onChange={handleSelect}
              />
            </Grid>
          </Grid>
        </Collapse>
      </DialogContent>
      <DialogActions sx={{ pr: 2.5 }}>
        <AnimateButton>
          <Button
            color="error"
            variant="contained"
            size="small"
            onClick={() => {
              setValues(setInitialValues);
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

export default AddVoucherType;
