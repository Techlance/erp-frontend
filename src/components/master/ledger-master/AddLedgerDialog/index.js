import React, { useState } from 'react';

// material-ui
import { Button, Step, Stepper, StepLabel, Stack, Typography,  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Collapse, Fade, Grid, FormControlLabel, Switch } from '@material-ui/core';

import {
} from "@material-ui/core";

// project imports
import LedgerForm from './LedgerForm';
import AnimateButton from '../../../../ui-component/extended/AnimateButton';
import useAuth from '../../../../hooks/useAuth';
import { useParams } from 'react-router';
import SaveIcon from "@material-ui/icons/SaveRounded";
import CancelIcon from "@material-ui/icons/Cancel";
import LoadingButton from "../../../../ui-component/LoadingButton";
import useLedgerMaster from '../../../../hooks/useLedgerMaster';
import { gridSpacing } from '../../../../store/constant';


// step options
const steps = ['Ledger Details', 'Balances'];

function getStepContent(step, handleNext, handleBack, setErrorIndex, values, setValues, receivable, setReceivable, payable, setPayable,bs, setBs, paymentData, setPaymentData) {
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
        default:
            throw new Error('Unknown step');
    }
}

//-----------------------|| FORMS WIZARD - BASIC ||-----------------------//

const AddLedgerDialog = ({open, handleClose}) => {
    const { user } = useAuth();
    const [clicked, setClicked] = useState(false);
    const { addCompanyLedger } = useLedgerMaster();
    const { mid } = useParams();
    const [activeStep, setActiveStep] = React.useState(0);
    const [receivable, setReceivable] = useState(false);
    const [payable, setPayable] = useState(false);
    const [bs, setBs] = useState(false);
    const [newLedger, setNewLedger] = useState(null);

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
      maintain_billwise: null,
      acc_group_id: null,
      is_fixed: false,
      company_master_id: parseInt(mid),
      created_by: user.email,
    });  

    const handleSubmit = async () => {
      setClicked(true);
      let form = { ...values };
      form.acc_group_id = parseInt(form.acc_group_id.id);
      // form.bank_ac_no = parseInt(form.bank_ac_no);
      // form.credit_limit = parseFloat(form.credit_limit);
      form.credit_days = parseInt(form.credit_days);
      if (!(receivable || payable)) {
        form.maintain_billwise = false;
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
      // form.child_of = parseInt(form.child_of.id);
      console.log(form);
      let response = await addCompanyLedger(form);
      setClicked(false);
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
      setReceivable(false);
      setPayable(false);
      if(response.success && bs){
        setNewLedger(response.data)
        handleNext();
      }
      else{
        handleClose();
      }
      // handleClose();
      // handleNext();
    };

    const handleChecked = (event) => {
      setValues({
        ...values,
        [event.target.name]: event.target.checked,
      });
    };
  
    const [paymentData, setPaymentData] = React.useState({});
    const [errorIndex, setErrorIndex] = React.useState(null);

    return (
      <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="create-user"
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle id="form-dialog-title">
        <Typography variant="h4">Create Ledger</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography variant="body2">Create a new Ledger.</Typography>
        </DialogContentText>
        {/* <MainCard title="Validation"> */}
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
                {activeStep === steps.length ? (
                    <React.Fragment>
                        <Typography variant="h5" gutterBottom>
                            Thank you for your order.
                        </Typography>
                        <Typography variant="subtitle1">
                            Your order number is #2001539. We have emailed your order confirmation, and will send you an update when your
                            order has shipped.
                        </Typography>
                        <Stack direction="row" justifyContent="flex-end">
                            <AnimateButton>
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={() => {
                                        setValues({});
                                        setPaymentData({});
                                        setActiveStep(0);
                                    }}
                                    sx={{ my: 3, ml: 1 }}
                                >
                                    Reset
                                </Button>
                            </AnimateButton>
                        </Stack>
                    </React.Fragment>
                ) : (
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
                            paymentData,
                            setPaymentData
                        )}
                        {activeStep === steps.length - 1 && (
                            <Stack direction="row" justifyContent={activeStep !== 0 ? 'space-between' : 'flex-end'}>
                                {activeStep !== 0 && (
                                    <Button onClick={handleBack} sx={{ my: 3, ml: 1 }}>
                                        Back
                                    </Button>
                                )}
                                <AnimateButton>
                                    <Button variant="contained" onClick={handleNext} sx={{ my: 3, ml: 1 }}>
                                        {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                                    </Button>
                                </AnimateButton>
                            </Stack>
                        )}
                    </React.Fragment>
                )}
            </React.Fragment>
        {/* </MainCard> */}
        </DialogContent>
      <DialogActions sx={{ pr: 2.5 }}>
        <Grid container justifyContent="space-between">
          <Grid item>
          <Grid item sm={12}>
            <FormControlLabel
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
          </Grid>
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
                maintain_billwise: null, // not input
                acc_group_id: null,
                is_fixed: false,
                company_master_id: parseInt(mid),
                created_by: user.email,
              });
              handleClose();
            }}
            disabled={clicked}
            startIcon={<CancelIcon />}
            >
            Cancel
          </Button>
        </AnimateButton>
        </Grid>
        <Grid item>
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
            </Grid>
          </Grid>
        </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
    );
};

export default AddLedgerDialog;
