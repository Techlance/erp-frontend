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

import AddLCDialog from "./AddLCDialog";
// import AddLCDocumentDialog from "../master/LC/AddLCDocumentDialog";
import AddLCDocs from "../master/LC/AddLCDocs";
import useLC from "../../hooks/useLC";
import { useSelector } from "react-redux";
import useComapanyMaster from "../../hooks/useCompanyMaster";

// step options
const steps = ["LC Detials", "Upload Documents"];

function getStepContent(
  step,
  handleNext,
  handleBack,
  setErrorIndex,
  values,
  setValues,
  newLC,
  paymentData,
  setPaymentData
) {
  switch (step) {
    case 0:
      return <AddLCDialog values={values} setValues={setValues} />;
    case 1:
      return <AddLCDocs newLC={newLC} />;
    default:
      throw new Error("Unknown step");
  }
}

//-----------------------|| FORMS WIZARD - BASIC ||-----------------------//

const AddLCDialogFinal = ({ open, handleClose }) => {
  const { user } = useAuth();
  const { addImportLC, addExportLC, createLcDocs } = useLC();
  const { pathname } = useLocation();
  // const { company } = useSelector((state) => state.companyMaster);

  const { company } = useComapanyMaster();

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
    lc_date: "2021-02-08",
    party_code: null,
    cost_center: null,
    applicant_bank: "HSBC",
    applicant_bank_lc_no: "123asd123",
    benificiary_bank: "Axis",
    benificiary_bank_lc_no: "123asd123",
    inspection: false,
    bank_ref: "Reference",
    days_for_submit_to_bank: "12",
    payment_terms: "Terms",
    place_of_taking_incharge: "India",
    final_destination_of_delivery: "Delhi",
    completed: false,
    shipment_terms: "Terms",
    goods_description: "Terms",
    other_lc_terms: "Terms",
    bank_ac: null,
    expiry_date: "2021-02-08",
    lc_amount: "2021-02-08",
    base_currency: { id: company.base_currency },
    company_master_id: mid,
    created_by: user.email,
  });

  const lc = useSelector((state) => state.lc);
  const { current_lc } = lc;
  const [newLC, setNewLC] = useState(null);

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
      base_currency: { id: company.base_currency },
      company_master_id: mid,
      created_by: user.email,
    });
    handleNext();
    setClicked(false);
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

        {getStepContent(
          activeStep,
          handleNext,
          handleBack,
          setErrorIndex,
          values,
          setValues,
          newLC,
          paymentData,
          setPaymentData
        )}
      </DialogContent>
      <DialogActions sx={{ pr: 2.5 }}>
        <Grid item>
          <Grid container spacing={2.5}>
            <Grid item>
              {activeStep === 0 && (
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
                        base_currency: { id: company.base_currency },
                        company_master_id: mid,
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
              )}
            </Grid>
            <Grid item>
              <LoadingButton
                color="primary"
                variant="contained"
                size="small"
                onClick={activeStep === 0 ? handleSubmit1 : handleClose}
                loading={clicked}
                startIcon={<SaveIcon />}
              >
                {activeStep === 0 ? "Add" : "Okay"}
              </LoadingButton>
            </Grid>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

export default AddLCDialogFinal;
