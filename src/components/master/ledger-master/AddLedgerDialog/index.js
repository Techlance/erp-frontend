import React, { useState } from "react";

// material-ui
import {
  Button,
  Step,
  Stepper,
  StepLabel,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  FormControlLabel,
  Switch,
} from "@material-ui/core";

import {} from "@material-ui/core";

// project imports
import LedgerForm from "./LedgerForm";
import AnimateButton from "../../../../ui-component/extended/AnimateButton";
import useAuth from "../../../../hooks/useAuth";
import { useParams } from "react-router";
import SaveIcon from "@material-ui/icons/SaveRounded";
import CancelIcon from "@material-ui/icons/Cancel";
import LoadingButton from "../../../../ui-component/LoadingButton";
import useLedgerMaster from "../../../../hooks/useLedgerMaster";
import useComapanyMaster from "../../../../hooks/useCompanyMaster";
import LedgerBalanceForm from "./LedgerBalanceForm";
import LedgerBillwiseForm from "./LedgerBillwiseForm";

// step options
const steps = ["Ledger Details", "Balances"];

function getStepContent(
  step,
  handleNext,
  handleBack,
  setErrorIndex,
  values,
  setValues,
  receivable,
  setReceivable,
  payable,
  setPayable,
  bs,
  setBs,
  balanceValues,
  setBalanceValues,
  newLedger,
  billwiseValues,
  setBillwiseValues
) {
  switch (step) {
    case 0:
      return (
        <LedgerForm
          handleNext={handleNext}
          setErrorIndex={setErrorIndex}
          values={values}
          setValues={setValues}
          receivable={receivable}
          setReceivable={setReceivable}
          payable={payable}
          setPayable={setPayable}
          bs={bs}
          setBs={setBs}
        />
      );
    case 1:
      return newLedger.maintain_billwise ? (
        <LedgerBillwiseForm
          values={billwiseValues}
          setValues={setBillwiseValues}
          setErrorIndex={setErrorIndex}
        />
      ) : (
        <LedgerBalanceForm
          handleNext={handleNext}
          setErrorIndex={setErrorIndex}
          values={balanceValues}
          setValues={setBalanceValues}
        />
      );
    default:
      throw new Error("Unknown step");
  }
}

//-----------------------|| FORMS WIZARD - BASIC ||-----------------------//

const AddLedgerDialog = ({ open, handleClose }) => {
  const { user } = useAuth();
  const [clicked, setClicked] = useState(false);
  const { addCompanyLedger, addLedgerBalance, addLedgerBillwise } =
    useLedgerMaster();
  const { mid } = useParams();
  const [activeStep, setActiveStep] = React.useState(0);
  const [receivable, setReceivable] = useState(false);
  const [payable, setPayable] = useState(false);
  const [bs, setBs] = useState(false);
  const [newLedger, setNewLedger] = useState(null);
  const [billwiseValues, setBillwiseValues] = useState({
    company_master_id: null,
    ledger_master_id: null,
    fc_name: null,
    billwise: [
      {
        ref_no: null,
        is_cr: true,
        amt: 0,
        fc_amount: 0,
        bill_date: null,
        due_date: null,
      },
    ],
  });
  const [balanceValues, setBalanceValues] = useState({
    amt: 0,
    is_cr: true,
    fc_amount: null,
    fc_name: null,
  });
  const { company } = useComapanyMaster();

  const handleNext = () => {
    setActiveStep(activeStep + 1);
    setErrorIndex(null);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const [values, setValues] = useState({
    ledger_name: null,
    old_ledger_id: null,
    payment_terms: null,
    delivery_terms: null,
    vat_no: null,
    cc_exp_date: null,
    cc_no: null,
    id_exp_date: null,
    id_no: null,
    cr_exp_date: null,
    cr_no: null,
    tax_reg_no: null,
    block_ac: null,
    credit_rating: null,
    credit_limit: null,
    bank_ac_no: null,
    bank_code: null,
    branch_name: null,
    bank_name: null,
    contact_person: null,
    email: null,
    tel: null,
    address: null,
    maintain_billwise: false,
    acc_group_id: null,
    is_fixed: false,
    company_master_id: parseInt(mid),
    created_by: user.email,
  });

  const handleSubmit = async () => {
    setClicked(true);
    let form = { ...values };
    form.acc_group_id = parseInt(form.acc_group_id.id);
    form.credit_days = parseInt(form.credit_days);
    if (!(receivable || payable)) {
      form = {
        ...form,
        payment_terms: null,
        delivery_terms: null,
        vat_no: null,
        cc_exp_date: null,
        cc_no: null,
        id_exp_date: null,
        id_no: null,
        cr_exp_date: null,
        cr_no: null,
        tax_reg_no: null,
        contact_person: null,
        email: null,
        tel: null,
        address: null,
      };
    } else {
      form.maintain_billwise = true;
    }
    if (!receivable) {
      form = {
        ...form,
        credit_limit: null,
        credit_days: null,
        credit_rating: null,
        block_ac: null,
      };
    } else if (!payable) {
      form = {
        ...form,
        bank_name: null,
        bank_code: null,
        branch_name: null,
        bank_ac_no: null,
      };
    }
    let response = await addCompanyLedger(form);
    setClicked(false);
    if (response.success && bs) {
      setNewLedger(response.data);
      handleNext();
    } else {
      handleClearClose();
    }
  };

  const handleSubmitBalance = async () => {
    setClicked(true);
    let form = {
      company_master_id: mid,
      ledger_id: newLedger.id,
      cr: balanceValues.is_cr ? balanceValues.amt : 0,
      dr: balanceValues.is_cr ? 0 : balanceValues.amt,
      total_cr: balanceValues.is_cr ? balanceValues.amt : 0,
      total_dr: balanceValues.is_cr ? 0 : balanceValues.amt,
      fc_name: balanceValues.fc_name
        ? balanceValues.fc_name.id
        : company.base_currency,
      fc_amount:
        balanceValues.fc_name &&
        balanceValues.fc_name?.id !== company.base_currency
          ? parseInt(balanceValues.fc_amount)
          : parseInt(balanceValues.amt),
      created_by: user.email,
    };
    await addLedgerBalance(form);
    setClicked(false);
    handleClearClose();
  };
  const makeBillwise = () => {
    return billwiseValues.billwise.map((val) => {
      return {
        ref_no: val.ref_no,
        fc_amount:
          billwiseValues.fc_name &&
          billwiseValues.fc_name?.id !== company.base_currency
            ? parseInt(val.fc_amount)
            : parseInt(val.amt),
        bill_date: val.bill_date,
        due_date: val.due_date,
        amount: parseInt(val.amt),
        cr: val.is_cr ? parseInt(val.amt) : 0,
        dr: val.is_cr ? 0 : parseInt(val.amt),
        created_by: user.email,
      };
    });
  };
  const handleSubmitBillwise = async () => {
    setClicked(true);
    let bills = makeBillwise();
    let form = {
      company_master_id: mid,
      ledger_master_id: newLedger.id,
      fc_name: billwiseValues.fc_name
        ? billwiseValues.fc_name.id
        : company.base_currency,
      billwise: bills,
    };
    await addLedgerBillwise(form);
    setClicked(false);
    handleClearClose();
  };

  const handleChecked = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.checked,
    });
  };
  const [errorIndex, setErrorIndex] = React.useState(null);

  const setDefault = () => {
    setValues({
      ledger_name: null,
      old_ledger_id: null,
      payment_terms: null,
      delivery_terms: null,
      vat_no: null,
      cc_exp_date: null,
      cc_no: null,
      id_exp_date: null,
      id_no: null,
      cr_exp_date: null,
      cr_no: null,
      tax_reg_no: null,
      block_ac: false,
      credit_rating: null,
      credit_limit: null,
      bank_ac_no: null,
      bank_code: null,
      branch_name: null,
      bank_name: null,
      contact_person: null,
      email: null,
      tel: null,
      address: null,
      maintain_billwise: null,
      acc_group_id: null,
      is_fixed: false,
      company_master_id: parseInt(mid),
      created_by: user.email,
    });
    setActiveStep(0);
    setReceivable(false);
    setPayable(false);
    setBs(false);
    setNewLedger(null);
    setBillwiseValues({
      company_master_id: null,
      ledger_master_id: null,
      fc_name: null,
      billwise: [
        {
          ref_no: null,
          is_cr: true,
          amt: 0,
          fc_amount: 0,
          bill_date: null,
          due_date: null,
        },
      ],
    });
    setBalanceValues({
      amt: 0,
      is_cr: true,
      fc_amount: null,
      fc_name: null,
    });
    setErrorIndex(null);
  };
  const handleClearClose = () => {
    setDefault();
    handleClose();
  };
  return (
    <Dialog
      open={open}
      onClose={handleClearClose}
      aria-labelledby="create-user"
      fullWidth
      maxWidth={activeStep === 1 && newLedger?.maintain_billwise ? "xl" : "md"}
    >
      <DialogTitle id="form-dialog-title">
        <Typography variant="h4">Create Ledger</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography variant="body2">Create a new Ledger.</Typography>
        </DialogContentText>

        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label, index) => {
            const labelProps = {};

            if (index === errorIndex) {
              labelProps.optional = (
                <Typography variant="caption" color="error">
                  Error
                </Typography>
              );

              labelProps.error = true;
            }

            return (
              <Step key={label}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <React.Fragment>
          {getStepContent(
            activeStep,
            handleNext,
            handleBack,
            setErrorIndex,
            values,
            setValues,
            receivable,
            setReceivable,
            payable,
            setPayable,
            bs,
            setBs,
            balanceValues,
            setBalanceValues,
            newLedger,
            billwiseValues,
            setBillwiseValues
          )}
        </React.Fragment>
      </DialogContent>
      <DialogActions sx={{ pr: 2.5 }}>
        <Grid container justifyContent="space-between">
          <Grid item>
            {activeStep === 0 && (
              <Grid item sm={12}>
                {!(receivable || payable) && (
                  <FormControlLabel
                    disabled={clicked}
                    control={
                      <Switch
                        id="maintain_billwise"
                        checked={values.maintain_billwise}
                        onChange={handleChecked}
                        name="maintain_billwise"
                        color="primary"
                      />
                    }
                    label="Maintain Billwise"
                  />
                )}
              </Grid>
            )}
          </Grid>
          <Grid item>
            <Grid container spacing={2.5}>
              <Grid item>
                <AnimateButton>
                  <Button
                    color="error"
                    variant="contained"
                    size="small"
                    onClick={() => {
                      handleClearClose();
                    }}
                    disabled={clicked}
                    startIcon={<CancelIcon />}
                  >
                    {activeStep === 1 ? "Skip" : "Cancel"}
                  </Button>
                </AnimateButton>
              </Grid>
              <Grid item>
                <LoadingButton
                  color="primary"
                  variant="contained"
                  size="small"
                  onClick={
                    activeStep === 0
                      ? handleSubmit
                      : newLedger?.maintain_billwise
                      ? handleSubmitBillwise
                      : handleSubmitBalance
                  }
                  loading={clicked}
                  startIcon={<SaveIcon />}
                >
                  Add
                </LoadingButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

export default AddLedgerDialog;
