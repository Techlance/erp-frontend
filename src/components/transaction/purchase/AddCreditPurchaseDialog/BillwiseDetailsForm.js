import React, { useEffect } from "react";

import { Grid } from "@material-ui/core";

// project imports
import { gridSpacing } from "../../../../store/constant";

// material-ui
import { TextField } from "@material-ui/core";

// project imports
import useAuth from "../../../../hooks/useAuth";

const BillwiseDetailsForm = ({
  handleNext,
  setErrorIndex,
  values,
  setValues
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
        <TextField
          fullWidth
          required
          id="ledger_name"
          label="Ledger Name"
          value={"null"}
          InputLabelProps={{ shrink: true }}
          onChange={handleChange}
        />
      </Grid>
    </Grid>
  );
};

export default BillwiseDetailsForm;
