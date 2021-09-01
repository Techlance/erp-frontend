import React, { useState } from "react";

// material-ui
import {
  Button,
  Step,
  Stepper,
  StepLabel,
  Stack,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Collapse,
  Fade,
  Grid,
  FormControlLabel,
  Switch,
} from "@material-ui/core";

import {} from "@material-ui/core";

// project imports
// import LedgerForm from "./LedgerForm";
import AnimateButton from "../../ui-component/extended/AnimateButton";
import useAuth from "../../hooks/useAuth";
import { useHistory, useLocation, useParams } from "react-router";
import SaveIcon from "@material-ui/icons/SaveRounded";
import CancelIcon from "@material-ui/icons/Cancel";
import LoadingButton from "../../ui-component/LoadingButton";
// import useLedgerMaster from "../../../../hooks/useLedgerMaster";
// import { gridSpacing } from "../../../../store/constant";
import AddLCDialog from "./AddLCDialog";
import AddLCDocumentDialog from "../master/LC/AddLCDocumentDialog";
import useLC from "../../hooks/useLC";
import { useSelector } from "react-redux";

// step options
const steps = ["LC Detials", "Upload Documents"];

function getStepContent(
  step,
  handleNext,
  handleBack,
  setErrorIndex,
  values,
  setValues,
  valuesDoc,
  setValuesDoc,
  newLC,
  paymentData,
  setPaymentData
) {
  switch (step) {
    case 0:
      return (
        <AddLCDialog values={values} setValues={setValues} />
        // <LedgerForm
        //   handleNext={handleNext}
        //   setErrorIndex={setErrorIndex}
        //   values={values}
        //   setValues={setValues}
        //   receivable={receivable}
        //   setReceivable={setReceivable}
        //   payable={payable}
        //   setPayable={setPayable}
        //   bs={bs}
        //   setBs={setBs}
        // />
      );
    case 1:
      return (
        <AddLCDocumentDialog
          newLC={newLC}
          values={valuesDoc}
          setValues={setValuesDoc}
        />
        // <LedgerForm
        //   handleNext={handleNext}
        //   setErrorIndex={setErrorIndex}
        //   values={values}
        //   setValues={setValues}
        //   receivable={receivable}
        //   setReceivable={setReceivable}
        //   payable={payable}
        //   setPayable={setPayable}
        //   bs={bs}
        //   setBs={setBs}
        // />
      );
    default:
      throw new Error("Unknown step");
  }
}

//-----------------------|| FORMS WIZARD - BASIC ||-----------------------//

const AddLCDialogFinal = ({ open, handleClose }) => {
  const { user } = useAuth();
  const { addImportLC, addExportLC, createLcDocs } = useLC();
  const { pathname } = useLocation();

  const history = useHistory();
  const [activeStep, setActiveStep] = React.useState(0);
  console.log(activeStep === 0);

  let flag = true; // Show Payables for import
  if (pathname.includes("/export")) {
    // Show Receivables for export
    flag = false;
  }

  const { lc_id, mid } = useParams();

  const [clicked, setClicked] = useState(false);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
    setErrorIndex(null);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

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
    base_currency: { id: 0 },
    created_by: user.email,
  });

  const lc = useSelector((state) => state.lc);
  const { current_lc } = lc;
  const [newLC, setNewLC] = useState(null);

  const [valuesDoc, setValuesDoc] = useState({
    created_by: user.email,
    doc_name: "",
    company_master_id: mid,
    lc_id: newLC?.lc_no,
    // lc_id: current_lc.id,
    file: null,
  });

  const handleSubmit1 = async () => {
    setClicked(true);
    let form = { ...values };

    form.cost_center = form.cost_center.id;
    form.party_code = form.party_code.id;
    form.bank_ac = form.bank_ac.id;
    form.base_currency = form.base_currency.id;
    // handleNext();

    if (flag) {
      let response = await addImportLC(form);
      setNewLC(response);
    } else {
      let response = await addExportLC(form);
      setNewLC(response);
    }

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
      base_currency: { id: 0 },
      company_master_id: mid,
      created_by: user.email,
    });
    // handleClose();
    handleNext();
    setClicked(false);
  };

  const handleSubmit2 = async () => {
    console.log("submi1");

    if (!valuesDoc.file) return;
    setClicked(true);
    let form = { ...valuesDoc };
    console.log(valuesDoc);
    console.log("valuesDoc");
    console.log(newLC);
    console.log("newLC");

    form.lc_id = newLC.id;
    await createLcDocs(form);
    handleClose();
  };

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
  const [paymentData, setPaymentData] = React.useState({});
  const [errorIndex, setErrorIndex] = React.useState(null);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="create-lc"
      fullWidth
      maxWidth="md"
    >
      <DialogTitle id="form-dialog-title">
        <Typography variant="h4">Create LC</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography variant="body2">Create a new LC.</Typography>
        </DialogContentText>
        {/* <MainCard title="Validation"> */}
        <pre>{JSON.stringify(valuesDoc, null, 2)}</pre>

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
                Your order number is #2001539. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
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
                valuesDoc,
                setValuesDoc,
                paymentData,
                setPaymentData
              )}
              {activeStep === steps.length - 1 && (
                <Stack
                  direction="row"
                  justifyContent={
                    activeStep !== 0 ? "space-between" : "flex-end"
                  }
                >
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ my: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}
                  <AnimateButton>
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ my: 3, ml: 1 }}
                    >
                      {activeStep === steps.length - 1 ? "Place order" : "Next"}
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
        {/* <Grid container justifyContent="space-between"> */}
        {/* <Grid item>
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
          </Grid> */}
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
                      base_currency: { id: 0 },
                      company_master_id: mid,
                      created_by: user.email,
                    });
                    setValuesDoc({
                      created_by: user.email,
                      doc_name: "",
                      company_master_id: mid,
                      lc_id: lc_id,
                      // lc_id: current_lc.id,
                      file: null,
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
                onClick={activeStep === 0 ? handleSubmit1 : handleSubmit2}
                loading={clicked}
                startIcon={<SaveIcon />}
              >
                Add
              </LoadingButton>
            </Grid>
          </Grid>
        </Grid>
        {/* </Grid> */}
      </DialogActions>
    </Dialog>
  );
};

export default AddLCDialogFinal;
