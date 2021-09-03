import React, { useState } from "react";

import { Grid, Stack, FormControlLabel, Switch } from "@material-ui/core";

// assets
import SaveIcon from "@material-ui/icons/SaveRounded";

// project imports
import { gridSpacing } from "../../store/constant";
import CurrencySelect from "./CurrencySelect";

// material-ui
import { TextField } from "@material-ui/core";

// project imports
import useAuth from "../../hooks/useAuth";
import useCompanyMaster from "../../hooks/useCompanyMaster";
import useLC from "../../hooks/useLC";
import { useLocation, useParams } from "react-router";
import { useHistory } from "react-router";
import CostCenterSelect from "../master/LC/CostCenterSelect";
import PartyCodePaySelect from "../master/LC/PartyCodePaySelect";
import PartyCodeRecSelect from "../master/LC/PartyCodeRecSelect";
import BankAcSelect from "../master/LC/BankACSelect";
import FcNameSelect from "../master/LC/FcNameSelect";
import { useSelector } from "react-redux";

const AddLCDialog = ({ open, handleClose, values, setValues }) => {
  const { user } = useAuth();
  const { addImportLC, addExportLC } = useLC();
  const { pathname } = useLocation();
  const history = useHistory();

  const { company } = useSelector((state) => state.companyMaster);

  let flag = true; // Show Payables for import
  if (pathname.includes("/export")) {
    // Show Receivables for export
    flag = false;
  }

  const { mid } = useParams();

  // const [showAddCurrencyModal, setShowAddCurrencyModal] = useState(false);
  const [clicked, setClicked] = useState(false);

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

  return (
    <>
      <Grid container spacing={gridSpacing}>
        {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="trans_type"
            label="Transaction Type"
            disabled
            value={flag ? "Import" : "Export"}
            InputLabelProps={{ shrink: true }}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="lc_date"
            label="LC Date"
            required
            InputLabelProps={{ shrink: true }}
            type="date"
            value={values.lc_date}
            onChange={handleChange}
          />
        </Grid>
        {flag ? (
          <Grid item xs={12} sm={6}>
            <PartyCodePaySelect
              captionLabel="Party Code (Payables)*"
              InputLabelProps={{ shrink: true }}
              required
              selected={values.party_code}
              onChange={handleSelect}
            />
          </Grid>
        ) : (
          <Grid item xs={12} sm={6}>
            <PartyCodeRecSelect
              captionLabel="Party Code (Receivables)*"
              required
              InputLabelProps={{ shrink: true }}
              selected={values.party_code}
              onChange={handleSelect}
            />
          </Grid>
        )}
        <Grid item xs={12} sm={6}>
          <CostCenterSelect
            captionLabel="Cost Center*"
            required
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
            required
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
            required
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
            required
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
            required
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
                required
                checked={values.inspection}
                onChange={handleChecked}
                name="inspection"
                color="primary"
              />
            }
            label="Inspection Certificate*"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="bank_ref"
            label="Bank Ref."
            required
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
            required
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
            required
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
            required
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
            required
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
                required
                checked={values.completed}
                onChange={handleChecked}
                name="completed"
                color="primary"
              />
            }
            label="Completed*"
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            fullWidth
            multiline
            id="shipment_terms"
            label="Shipment Terms"
            required
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
            required
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
            required
            InputLabelProps={{ shrink: true }}
            value={values.other_lc_terms}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <BankAcSelect
            captionLabel="Bank A/C*"
            required
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
            required
            InputLabelProps={{ shrink: true }}
            type="date"
            InputProps={{ inputProps: { min: values.lc_date } }}
            value={values.expiry_date}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FcNameSelect
            captionLabel="Currency*"
            InputLabelProps={{ shrink: true }}
            selected={values.base_currency}
            onChange={handleSelect}
            baseCurrency={company.base_currency}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="lc_amount"
            label="LC Amount"
            type="number"
            required
            value={values.lc_amount}
            InputLabelProps={{ shrink: true }}
            InputProps={{ inputProps: { min: 1 } }}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default AddLCDialog;
