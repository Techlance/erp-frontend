import React, { useState } from "react";

import { Grid, Stack, FormControlLabel, Switch } from "@material-ui/core";

// assets
import SaveIcon from "@material-ui/icons/SaveRounded";

// project imports
import { gridSpacing } from "../../store/constant";
import CurrencySelect from "./CurrencySelect";

// material-ui
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@material-ui/core";

// project imports
import useAuth from "../../hooks/useAuth";
import useCompany from "../../hooks/useCompany";
import useLC from "../../hooks/useLC";
import { useLocation, useParams } from "react-router";
import { useHistory } from "react-router";
import CostCenterSelect from "../master/LC/CostCenterSelect";
import PartyCodePaySelect from "../master/LC/PartyCodePaySelect";
import PartyCodeRecSelect from "../master/LC/PartyCodeRecSelect";
import BankAcSelect from "../master/LC/BankACSelect";

const AddLCDialog = ({ open, handleClose }) => {
  const { user } = useAuth();
  const { addLC } = useLC();
  const { pathname } = useLocation();
  const history = useHistory();

  let flag = true; // Show Payables for import
  if (pathname.includes("/export")) {
    // Show Receivables for export
    flag = false;
  }

  const { mid } = useParams();

  // const [showAddCurrencyModal, setShowAddCurrencyModal] = useState(false);
  const [clicked, setClicked] = useState(false);

  const [values, setValues] = useState({
    trans_type: flag ? "import" : "export",
    year_id: 21,
    lc_date: "",
    party_code: null,
    cost_center: null,
    applicant_bank: "",
    applicant_bank_lc_no: "",
    benificiary_bank: "",
    benificiary_bank_lc_no: "",
    inspection: false,
    bank_ref: "",
    days_for_submit_to_bank: "",
    payment_terms: "",
    place_of_taking_incharge: "",
    final_destination_of_delivery: "",
    completed: false,
    shipment_terms: "",
    goods_description: "",
    other_lc_terms: "",
    bank_ac: null,
    expiry_date: "",
    lc_amount: "",
    company_master_id: mid,
    // base_currency: { id: 0 },
    created_by: user.email,
  });

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

  const handleCreateLC = async () => {
    setClicked(true);
    let form = { ...values };
    form.cost_center = form.cost_center.id;
    form.party_code = form.party_code.id;
    form.bank_ac = form.bank_ac.id;
    await addLC(form);
    setClicked(false);
    setValues({
      trans_type: flag ? "import" : "export",
      year_id: 21,
      lc_date: "",
      party_code: null,
      cost_center: null,
      applicant_bank: "",
      applicant_bank_lc_no: "",
      benificiary_bank: "",
      benificiary_bank_lc_no: "",
      inspection: false,
      bank_ref: "",
      days_for_submit_to_bank: "",
      payment_terms: "",
      place_of_taking_incharge: "",
      final_destination_of_delivery: "",
      completed: false,
      shipment_terms: "",
      goods_description: "",
      other_lc_terms: "",
      bank_ac: null,
      expiry_date: "",
      lc_amount: "",
      company_master_id: mid,
      created_by: user.email,
    });
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="create-lc-dialog"
      fullWidth
      maxWidth="md"
    >
      <DialogTitle id="form-dialog-title">
        <Typography variant="h4">Create a new LC</Typography>
      </DialogTitle>
      <DialogContent>
        {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
        {/* <DialogContentText>
          <Typography variant="body2">Create a new LC.</Typography>
        </DialogContentText> */}
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="trans_type"
              label="Transaction Type"
              disabled
              value={values.trans_type}
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="lc_date"
              label="LC Date"
              InputLabelProps={{ shrink: true }}
              type="date"
              value={values.lc_date}
              onChange={handleChange}
            />
          </Grid>
          {flag ? (
            <Grid item xs={12} sm={6}>
              <PartyCodePaySelect
                captionLabel="Party Code (Payables)"
                InputLabelProps={{ shrink: true }}
                selected={values.party_code}
                onChange={handleSelect}
              />
            </Grid>
          ) : (
            <Grid item xs={12} sm={6}>
              <PartyCodeRecSelect
                captionLabel="Party Code (Receivables)"
                InputLabelProps={{ shrink: true }}
                selected={values.party_code}
                onChange={handleSelect}
              />
            </Grid>
          )}
          <Grid item xs={12} sm={6}>
            <CostCenterSelect
              captionLabel="Cost Center"
              InputLabelProps={{ shrink: true }}
              selected={values.cost_center}
              onChange={handleSelect}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="applicant_bank"
              label="Applicant Bank"
              value={values.applicant_bank}
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="applicant_bank_lc_no"
              label="Applicant Bank LC No."
              value={values.applicant_bank_lc_no}
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="benificiary_bank"
              label="Beneficiary Bank"
              value={values.benificiary_bank}
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="benificiary_bank_lc_no"
              label="Beneficiary Bank LC No."
              value={values.benificiary_bank_lc_no}
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  id="inspection"
                  checked={values.inspection}
                  onChange={handleChecked}
                  name="inspection"
                  color="primary"
                />
              }
              label="Inspection Certificate"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="bank_ref"
              label="Bank Ref."
              InputLabelProps={{ shrink: true }}
              value={values.bank_ref}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="days_for_submit_to_bank"
              label="Days Remaining To Return To Bank"
              type="number"
              value={values.days_for_submit_to_bank}
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="payment_terms"
              label="Payment Terms"
              value={values.payment_terms}
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="place_of_taking_incharge"
              label="Incharge Taking Place"
              value={values.place_of_taking_incharge}
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              id="final_destination_of_delivery"
              label="Final Delivery Destination"
              value={values.final_destination_of_delivery}
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  id="completed"
                  checked={values.completed}
                  onChange={handleChecked}
                  name="completed"
                  color="primary"
                />
              }
              label="Completed"
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              multiline
              id="shipment_terms"
              label="Shipment Terms"
              InputLabelProps={{ shrink: true }}
              value={values.shipment_terms}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              multiline
              id="goods_description"
              label="Goods Description"
              InputLabelProps={{ shrink: true }}
              value={values.goods_description}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              multiline
              id="other_lc_terms"
              label="Other LC Terms"
              InputLabelProps={{ shrink: true }}
              value={values.other_lc_terms}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <BankAcSelect
              captionLabel="Bank A/C"
              InputLabelProps={{ shrink: true }}
              selected={values.bank_ac}
              onChange={handleSelect}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="expiry_date"
              label="Expiry Date"
              InputLabelProps={{ shrink: true }}
              type="date"
              InputProps={{ inputProps: { min: values.lc_date } }}
              value={values.expiry_date}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              id="lc_amount"
              label="LC Amount"
              type="number"
              value={values.lc_amount}
              InputLabelProps={{ shrink: true }}
              // InputProps={{ inputProps: { min: 0 } }}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ pr: 2.5 }}>
        <Grid item xs={12}>
          <Stack direction="row">
            <Grid container justifyContent="space-between">
              <Grid item>
                <Button
                  onClick={handleClose}
                  color="error"
                  size="medium"
                  variant="contained"
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  color="primary"
                  size="medium"
                  variant="contained"
                  disabled={clicked}
                  onClick={handleCreateLC}
                  startIcon={<SaveIcon />}
                >
                  Save and Upload Documents
                </Button>
              </Grid>
            </Grid>
          </Stack>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

export default AddLCDialog;
