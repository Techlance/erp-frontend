import React, { useEffect } from "react";

import { Grid, FormControl, MenuItem } from "@material-ui/core";

// project imports
import { gridSpacing } from "../../../../store/constant";

// material-ui
import { TextField } from "@material-ui/core";

// project imports
import useAuth from "../../../../hooks/useAuth";
import FcNameSelect from "./FcNameSelect";
import { useSelector } from "react-redux";

// const AddUserDialog = ({ open, handleClose }) => {
const LedgerBalanceForm = ({ values, setValues }) => {
  const { user } = useAuth();
  const { company } = useSelector((state) => state.companyMaster);

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

  // const handleChecked = (event) => {
  //   setValues({
  //     ...values,
  //     [event.target.name]: event.target.checked,
  //   });
  // };

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          id="amt"
          label="Amount"
          value={values.amt && Math.abs(values.amt)}
          InputLabelProps={{ shrink: true }}
          onChange={handleChange}
          type="number"
          inputProps={{
            min: "0",
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth variant="outlined">
          <TextField
            id="is_cr"
            select
            fullWidth
            label="Type"
            value={values.is_cr}
            onChange={handleChange}
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          >
            <MenuItem value={true}>Credit</MenuItem>
            <MenuItem value={false}>Debit</MenuItem>
          </TextField>
        </FormControl>
      </Grid>
      <Grid
        item
        xs={12}
        sm={
          values.fc_name && values.fc_name?.id !== company.base_currency
            ? 6
            : 12
        }
      >
        <FcNameSelect
          captionLabel="Currency"
          InputLabelProps={{ shrink: true }}
          selected={values.fc_name}
          onChange={handleSelect}
          baseCurrency={company.base_currency}
        />
      </Grid>
      {values.fc_name && values.fc_name?.id !== company.base_currency && (
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="fc_amount"
            label="FC Amount"
            value={values.fc_amount && Math.abs(values.fc_amount)}
            InputLabelProps={{ shrink: true }}
            onChange={handleChange}
            type="number"
            inputProps={{ min: 0 }}
            helperText={`FC Rate: ${Math.abs(
              (values.amt / values.fc_amount).toFixed(4)
            )}`}
          />
        </Grid>
      )}
    </Grid>
  );
};

export default LedgerBalanceForm;
