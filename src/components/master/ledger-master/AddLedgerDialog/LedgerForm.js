import React, { useEffect } from "react";

import { FormControlLabel, Grid, Switch } from "@material-ui/core";

// project imports
import { gridSpacing } from "../../../../store/constant";

// material-ui
import { TextField, Typography, Collapse, Fade } from "@material-ui/core";

// project imports
import useAuth from "../../../../hooks/useAuth";
import AccountGroupSelect from "../AccountGroupSelect";

const LedgerForm = ({
  handleNext,
  setErrorIndex,
  values,
  setValues,
  receivable,
  setReceivable,
  payable,
  setPayable,
  bs,
  setBs,
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
  let emailreg = false;
  let phonereg = false;
  let day_reg = false;

  const emailRegex = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+.+[a-z]{2,3}$");
  const phoneRegex = new RegExp(
    "^[+]?[0-9]{3}?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$"
  );
  const dayRegex = new RegExp("^[0-9]{0,2}$");

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12} sm={12}>
        <TextField
          fullWidth
          required
          id="ledger_name"
          label="Ledger Name"
          value={values.ledger_name}
          InputLabelProps={{ shrink: true }}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          id="old_ledger_id"
          label="Old Ledger ID"
          value={values.old_ledger_id}
          InputLabelProps={{ shrink: true }}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <AccountGroupSelect
          captionLabel="Account Group*"
          InputLabelProps={{ shrink: true }}
          selected={values.acc_group_id}
          onChange={handleSelect}
          setReceivable={setReceivable}
          setPayable={setPayable}
          bs={bs}
          setBs={setBs}
        />
      </Grid>
      <Grid item sm={12}>
        <Collapse in={payable || receivable} timeout={1000}>
          <Fade in={payable || receivable}>
            <Grid container spacing={gridSpacing}>
              <Grid item sm={12}>
                <Typography variant="h4">
                  Payables And Receivables Related Fields
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  required
                  id="address"
                  label="Address"
                  value={values.address}
                  InputLabelProps={{ shrink: true }}
                  // InputProps={{
                  //   color: values.address == null ? "error" : "primary",
                  // }}
                  // helperText={
                  //   values.address == null ? "This field is required." : ""
                  // }
                  // error={values.address == null ? true : false}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="tel"
                  label="Telephone No."
                  value={values.tel}
                  InputLabelProps={{ shrink: true }}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    color:
                      phoneRegex.test(values?.tel) || values?.tel == null
                        ? "primary"
                        : "error",
                  }}
                  helperText={
                    phoneRegex.test(values?.tel) || values?.tel == null
                      ? ""
                      : "Please enter a valid Contact No."
                  }
                  error={
                    phoneRegex.test(values?.tel) || values?.tel == null
                      ? false
                      : true
                  }
                  onChange={handleChange}
                />
                {
                  (phonereg =
                    phoneRegex.test(values?.tel) || values?.tel == null
                      ? true
                      : false)
                }
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="email"
                  label="Email"
                  value={values.email}
                  type="email"
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    color:
                      emailRegex.test(values?.email) || values?.email == null
                        ? "primary"
                        : "error",
                  }}
                  helperText={
                    emailRegex.test(values?.email) || values?.email == null
                      ? ""
                      : "Please enter a valid email."
                  }
                  error={
                    emailRegex.test(values?.email) || values?.email == null
                      ? false
                      : true
                  }
                  onChange={handleChange}
                />
                {
                  (emailreg =
                    emailRegex.test(values?.email) || values?.email == null
                      ? true
                      : false)
                }
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="contact_person"
                  label="Contact Person"
                  value={values.contact_person}
                  InputLabelProps={{ shrink: true }}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="tax_reg_no"
                  label="Tax Registrtion No."
                  value={values.tax_reg_no}
                  InputLabelProps={{ shrink: true }}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="vat_no"
                  label="VAT No."
                  value={values.vat_no}
                  InputLabelProps={{ shrink: true }}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="cr_no"
                  label="CR No."
                  value={values.cr_no}
                  InputLabelProps={{ shrink: true }}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="cr_exp_date"
                  label="CR Expiry Date"
                  value={values.cr_exp_date}
                  InputLabelProps={{ shrink: true }}
                  type="date"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="id_no"
                  label="ID No."
                  value={values.id_no}
                  InputLabelProps={{ shrink: true }}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="id_exp_date"
                  label="ID Expiry Date"
                  value={values.id_exp_date}
                  InputLabelProps={{ shrink: true }}
                  type="date"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="cc_no"
                  label="CC No."
                  value={values.cc_no}
                  InputLabelProps={{ shrink: true }}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="cc_exp_date"
                  label="CC Expiry Date"
                  value={values.cc_exp_date}
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="delivery_terms"
                  label="Delivery Terms"
                  value={values.delivery_terms}
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
                  id="credit_days"
                  label="Credit Days"
                  value={values.credit_days}
                  InputLabelProps={{ shrink: true }}
                  onChange={handleChange}
                  type="number"
                  InputProps={{
                    color:
                      dayRegex.test(values?.credit_days) ||
                      values?.credit_days == null
                        ? "primary"
                        : "error",
                  }}
                  helperText={
                    dayRegex.test(values?.credit_days) ||
                    values?.credit_days == null
                      ? ""
                      : "Days cannot be negative and can only be 2 digit integer."
                  }
                  error={
                    dayRegex.test(values?.credit_days) ||
                    values?.credit_days == null
                      ? false
                      : true
                  }
                />
                {
                  (day_reg =
                    dayRegex.test(values?.credit_days) ||
                    values?.credit_days == null
                      ? true
                      : false)
                }
              </Grid>
            </Grid>
          </Fade>
        </Collapse>
      </Grid>
      <Grid item sm={12}>
        <Collapse in={payable} style={{ transitionDelay: "500ms" }}>
          <Fade in={payable}>
            <Grid container spacing={gridSpacing}>
              <Grid item sm={12}>
                <Typography variant="h4">Payables Related Fields</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="bank_name"
                  label="Bank Name"
                  value={values.bank_name}
                  InputLabelProps={{ shrink: true }}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="branch_name"
                  label="Branch Name"
                  value={values.branch_name}
                  InputLabelProps={{ shrink: true }}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="bank_code"
                  label="Bank Code"
                  value={values.bank_code}
                  InputLabelProps={{ shrink: true }}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="bank_ac_no"
                  label="Bank A/C No."
                  value={values.bank_ac_no}
                  InputLabelProps={{ shrink: true }}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </Fade>
        </Collapse>
        <Collapse in={receivable} style={{ transitionDelay: "500ms" }}>
          <Fade in={receivable}>
            <Grid container spacing={gridSpacing}>
              <Grid item sm={12}>
                <Typography variant="h4">Receivables Related Fields</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="credit_limit"
                  label="Credit Limit"
                  value={values.credit_limit}
                  InputLabelProps={{ shrink: true }}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="credit_rating"
                  label="Credit Rating"
                  value={values.credit_rating}
                  InputLabelProps={{ shrink: true }}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item sm={6}>
                <FormControlLabel
                  control={
                    <Switch
                      id="block_ac"
                      checked={values.block_ac}
                      onChange={handleChecked}
                      name="block_ac"
                      color="primary"
                    />
                  }
                  label="Block A/C"
                />
              </Grid>
            </Grid>
          </Fade>
        </Collapse>
      </Grid>
    </Grid>
  );
};

export default LedgerForm;
