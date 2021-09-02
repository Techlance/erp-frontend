import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// material-ui
import { useTheme } from "@material-ui/styles";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@material-ui/core";

// project import
import useAuth from "../../../hooks/useAuth";
import useBRS from "../../../hooks/useBrs";
import AccountCodeSelect from "./AccountCodeSelect";
import PaymentTypeTabs from "./PaymentTypeTabs";
import AnimateButton from "../../../ui-component/extended/AnimateButton";
import LoadingButton from "../../../ui-component/LoadingButton";

// assets
import CancelIcon from "@material-ui/icons/CancelTwoTone";
import SaveIcon from "@material-ui/icons/SaveRounded";

const AddBrsDialog = ({ open, handleClose }) => {
  const theme = useTheme();
  const { user } = useAuth();

  const { company } = useSelector((state) => state.companyMaster);
  const { selected_bank } = useSelector((state) => state.brs);

  const { createBrs } = useBRS();

  const setInitialValues = () => ({
    bank_ledger_id: selected_bank?.id,
    acc_code: {
      id: 0,
      ledger_name: "",
      bank_name: "",
    },
    name: "",
    chq_date: "",
    chq_no: "",
    transaction_date: "",
    transaction_no: "",
    amount: "",
    remarks: "",
    transaction_type: "",
    created_by: user.email,
    company_master_id: company.company_id,
  });

  const [values, setValues] = useState(setInitialValues);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    setValues(setInitialValues);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected_bank]);

  const handleRadio = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSelect = (key, value) => {
    setValues({
      ...values,
      [key]: value,
    });
  };

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = async () => {
    setClicked(true);
    await createBrs(values);
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
    >
      <DialogTitle id="form-dialog-title">
        <Typography variant="h4">Create</Typography>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} mb={2}>
          <Grid item sm={12}>
            <AccountCodeSelect
              captionLabel="Account Code"
              selected={values.acc_code}
              onChange={handleSelect}
            />
          </Grid>
          <Grid item sm={12}>
            <TextField
              fullWidth
              id="name"
              label="Name"
              value={values.name}
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
              type="text"
            />
          </Grid>
          <Grid item sm={12}>
            <TextField
              fullWidth
              id="amount"
              label="Amount"
              value={values.amount}
              onChange={handleChange}
              type="text"
            />
          </Grid>

          <Grid item sm={12}>
            <PaymentTypeTabs values={values} onChange={handleChange} />
          </Grid>

          <Grid item sm={12}>
            <Typography variant="h4">Transaction Type</Typography>
            <RadioGroup
              row
              name="transaction_type"
              aria-label="transaction-type"
              value={values.transaction_type}
              onChange={handleRadio}
              justifyContent="between"
            >
              <FormControlLabel
                value="payment"
                control={
                  <Radio
                    sx={{
                      "color": theme.palette.primary.main,
                      "&.Mui-checked": {
                        color: theme.palette.primary.main,
                      },
                    }}
                  />
                }
                label="Payment"
              />
              <FormControlLabel
                value="receipt"
                control={
                  <Radio
                    sx={{
                      "color": theme.palette.primary.main,
                      "&.Mui-checked": {
                        color: theme.palette.primary.main,
                      },
                    }}
                  />
                }
                label="Receipt"
              />
            </RadioGroup>
          </Grid>
          <Grid item sm={12}>
            <TextField
              fullWidth
              multiline
              id="remarks"
              label="Remarks"
              rows="6"
              value={values.remarks}
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
            onClick={handleClose}
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

export default AddBrsDialog;
