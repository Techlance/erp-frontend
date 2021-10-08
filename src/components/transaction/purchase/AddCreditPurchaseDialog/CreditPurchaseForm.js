import React, { useEffect } from "react";

import { Grid, Typography } from "@material-ui/core";

// project imports
import { gridSpacing } from "../../../../store/constant";

// material-ui
import { TextField } from "@material-ui/core";

// project imports
import useAuth from "../../../../hooks/useAuth";
import PartyCodeRecSelect from "../../../master/LC/PartyCodeRecSelect";

const CreditPurchaseForm = ({
  handleNext,
  setErrorIndex,
  values,
  setValues,
}) => {
  const { user } = useAuth();

  useEffect(() => {
    setValues({
      ...values,
      created_by: user.email,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

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
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12} sm={12}>
        <PartyCodeRecSelect
          captionLabel="Transaction Type*"
          InputLabelProps={{ shrink: true }}
          selected={values.trans_type}
          onChange={handleSelect}
        />
      </Grid>
      {/* <Grid item xs={6} sm={6}>
        <TextField
          fullWidth
          required
          id="voucher_no"
          label="Voucher No."
          value={values.voucher_no}
          InputLabelProps={{ shrink: true }}
          onChange={handleChange}
        />
      </Grid> */}
      <Grid item xs={6} sm={6}>
        <TextField
          fullWidth
          required
          id="party_name"
          label="Party Name"
          value={values.party_name}
          InputLabelProps={{ shrink: true }}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={6} sm={6}>
        <PartyCodeRecSelect
          captionLabel="LC No.*"
          InputLabelProps={{ shrink: true }}
          selected={values.lc_no}
          onChange={handleSelect}
        />
      </Grid>
      <Grid item sm={12}>
        <Typography variant="h4">Supplier Related Fields</Typography>
      </Grid>
      <Grid item xs={6} sm={6}>
        <TextField
          fullWidth
          required
          id="supplier_inv_no"
          label="Supplier Invoice No."
          value={values.supplier_inv_no}
          InputLabelProps={{ shrink: true }}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={6} sm={6}>
        <TextField
          fullWidth
          id="supplier_inv_date"
          required
          label="Supplier Invoice Date"
          InputLabelProps={{ shrink: true }}
          type="date"
          value={values.supplier_inv_date}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={6} sm={6}>
        <TextField
          required
          fullWidth
          id="supllier_name"
          label="Supplier Name"
          InputLabelProps={{ shrink: true }}
          value={values.supllier_name}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={6} sm={6}>
        <TextField
          required
          fullWidth
          id="supplier_address"
          label="Supplier Address"
          InputLabelProps={{ shrink: true }}
          value={values.supplier_address}
          onChange={handleChange}
        />
      </Grid>
      <Grid item sm={12}>
        <Typography variant="h4">Shipment Fields</Typography>
      </Grid>
      <Grid item xs={6} sm={6}>
        <TextField
          required
          fullWidth
          id="shipped_by"
          label="Shipped By"
          InputLabelProps={{ shrink: true }}
          value={values.shipped_by}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={6} sm={6}>
        <TextField
          required
          fullWidth
          id="shipped_from_add"
          label="Shipped From Address"
          InputLabelProps={{ shrink: true }}
          value={values.shipped_from_add}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={6} sm={6}>
        <TextField
          required
          fullWidth
          multiline
          id="narration"
          label="Narration"
          InputLabelProps={{ shrink: true }}
          value={values.narration}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={6} sm={6}>
        <TextField
          required
          fullWidth
          id="payment_terms"
          label="Payment Terms"
          InputLabelProps={{ shrink: true }}
          value={values.payment_terms}
          onChange={handleChange}
        />
      </Grid>
    </Grid>
  );
};

export default CreditPurchaseForm;
