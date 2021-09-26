import React, { useState, useEffect } from "react";

// material-ui
import { Grid, TextField, FormControl, MenuItem } from "@material-ui/core";

// project imports
import { useParams } from "react-router";
import { useSelector } from "react-redux";

// assets
import { gridSpacing } from "../../../../store/constant";
import SubCard from "../../../../ui-component/cards/SubCard";
import SaveIcon from "@material-ui/icons/SaveRounded";
import useLedgerMaster from "../../../../hooks/useLedgerMaster";
import LoadingButton from "../../../../ui-component/LoadingButton";

import FcNameSelect from "../../../../components/master/ledger-master/AddLedgerDialog/FcNameSelect";

//-----------------------|| Ledger Balance Form ||-----------------------//

const LedgerBalance = () => {
  const { lid } = useParams();
  const [{ company }, { ledger_balance }] = useSelector((state) => [
    state.companyMaster,
    state.ledgerMaster,
  ]);

  const { getLedgerBalance, updateLedgerBalance } = useLedgerMaster();

  const [values, setValues] = useState({ is_cr: false });
  const [clicked, setClicked] = useState(false);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.id || "is_cr"]: event.target.value,
    });
  };

  const handleSelect = (key, value) => {
    setValues({
      ...values,
      [key]: value,
    });
  };

  useEffect(() => {
    if (ledger_balance) {
      let led = { ...ledger_balance };
      led.is_cr = led.cr > 0 ? true : false;
      led.amt = led.cr > 0 ? led.cr : led.dr;
      led.fc_amount = led.fc_amount < 0 ? led.fc_amount * -1 : led.fc_amount;
      setValues(led);
    } else {
      getLedgerBalance(lid);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ledger_balance, lid]);

  const handleUpdate = async () => {
    setClicked(true);
    try {
      let form = {
        id: values.id,
        company_master_id: values.company_master_id,
        ledger_id: values.ledger_id,
        cr: values.is_cr ? values.amt : null,
        dr: values.is_cr ? null : values.amt,
        total_cr: values.is_cr ? values.amt : null,
        total_dr: values.is_cr ? null : values.amt,
        fc_name: values.fc_name ? values.fc_name.id : company.base_currency,
        fc_amount:
          values.fc_name && values.fc_name?.id !== company.base_currency
            ? parseInt(values.fc_amount)
            : parseInt(0),
        created_by: values.created_by,
      };
      await updateLedgerBalance(form);
    } catch {
      console.log("Error while adding ledger balance.");
    }
    setClicked(false);
  };

  return (
    <Grid container spacing={gridSpacing} justifyContent="center">
      <Grid item sm={12} md={8}>
        <SubCard title="Edit Ledger Balance">
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="amt"
                label="Amount"
                value={values?.amt && Math.abs(values?.amt)}
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
                  value={values?.is_cr}
                  onChange={handleChange}
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                >
                  <MenuItem value={true}>Credit</MenuItem>
                  <MenuItem value={false}>Debit</MenuItem>
                </TextField>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FcNameSelect
                captionLabel="Currency"
                InputLabelProps={{ shrink: true }}
                selected={values?.fc_name}
                onChange={handleSelect}
                baseCurrency={company.base_currency}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              {values.fc_name && values.fc_name?.id !== company.base_currency && (
                <TextField
                  fullWidth
                  id="fc_amount"
                  label="FC Amount"
                  value={values?.fc_amount && Math.abs(values?.fc_amount)}
                  InputLabelProps={{ shrink: true }}
                  onChange={handleChange}
                  type="number"
                  inputProps={{
                    min: "0",
                    readOnly: !(
                      values?.fc_name &&
                      values?.fc_name?.id !== company.base_currency
                    ),
                  }}
                  helperText={`FC Rate: ${Math.abs(
                    (
                      (values.cr > 0 ? values.cr : values.dr) / values.fc_amount
                    ).toFixed(4)
                  )}`}
                />
              )}
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="flex-end">
              <LoadingButton
                variant="contained"
                color="primary"
                onClick={handleUpdate}
                startIcon={<SaveIcon />}
                loading={clicked}
              >
                Save Details
              </LoadingButton>
            </Grid>
          </Grid>
        </SubCard>
      </Grid>
    </Grid>
  );
};

export default LedgerBalance;
