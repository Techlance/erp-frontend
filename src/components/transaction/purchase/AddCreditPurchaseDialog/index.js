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
} from "@material-ui/core";

// project imports
import AnimateButton from "../../../../ui-component/extended/AnimateButton";
import useAuth from "../../../../hooks/useAuth";
import { useParams } from "react-router";
import SaveIcon from "@material-ui/icons/SaveRounded";
import CancelIcon from "@material-ui/icons/Cancel";
import LoadingButton from "../../../../ui-component/LoadingButton";
import { useSelector } from "react-redux";

import BillwiseDetailsForm from "./BillwiseDetailsForm";
import DocumentForm from "./DocumentForm";
import CreditPurchaseForm from "./CreditPurchaseForm";
import LedgerForm from './LedgerForm'

// step options
const steps = ["Transaction Details", "Bill-Wise Details", "Ledger Details", "Documents"];

function getStepContent(
  step,
  handleNext,
  handleBack,
  setErrorIndex,
  values,
  setValues,
  billwiseValues,
  setBillwiseValues,
  ledgerValues,
  setLedgerValues,
  documentValues,
  setDocumentValues

) {
  switch (step) {
    case 0:
        // Transaction Details
        return (
            <CreditPurchaseForm
            handleNext={handleNext}
            setErrorIndex={setErrorIndex}  
            values={values}
            setValues={setValues}
            />
        );
    case 1:
        // Billwise Details
        return (
            <BillwiseDetailsForm
            handleNext={handleNext}
            setErrorIndex={setErrorIndex}  
            values={billwiseValues}
            setValues={setBillwiseValues}
            />
        );
    case 2:
        // Ledger Details
        return (
            <LedgerForm
            handleNext={handleNext}
            setErrorIndex={setErrorIndex}  
            values={ledgerValues}
            setValues={setLedgerValues}
            />
        );
    case 3:
        // Document Uploads
        return (
            <DocumentForm
            handleNext={handleNext}
            setErrorIndex={setErrorIndex}  
            values={documentValues}
            setValues={setDocumentValues}
            />
        );
    default:
      throw new Error("Unknown step");
  }
}

//-----------------------|| FORMS WIZARD - BASIC ||-----------------------//

const AddCreditPurchaseDialog = ({ open, handleClose }) => {
  const { user } = useAuth();
  const { mid, year_id } = useParams();
  const { company } = useSelector((state) => state.companyMaster);
//   const {  } = useLedgerMaster();
  const [clicked, setClicked] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [errorIndex, setErrorIndex] = useState(null);
  const [values,setValues] = useState(null);
  const [billwiseValues,setBillwiseValues] = useState({});
  const [ledgerValues,setLedgerValues] = useState({});
  const [documentValues,setDocumentValues] = useState({});
  
  const handleNext = () => {
    setActiveStep(activeStep + 1);
    setErrorIndex(null);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const setDefault = () => {
    setValues({});
    setErrorIndex(null);
    setClicked(false);
  };

  const handleClearClose = () => {
    setDefault();
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClearClose}
      aria-labelledby="create-purchase-credit"
      fullWidth
      maxWidth={"md"}
    >
      <DialogTitle id="form-dialog-title">
        <Typography variant="h4">Create Purcase Credit Transaction</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography variant="body2">Create A New Purcase Credit Transaction</Typography>
        </DialogContentText>

        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps?.map((label, index) => {
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
            billwiseValues,
            setBillwiseValues,
            ledgerValues,
            setLedgerValues,
            documentValues,
            setDocumentValues
          )}
        </React.Fragment>
      </DialogContent>
      <DialogActions sx={{ px: 2.5 }}>
        <Grid container justifyContent="space-between">
          <Grid item>
          </Grid>
          <Grid item>
            <Grid container spacing={2.5}>
                <Grid item>
                  <AnimateButton>
                    <Button
                      color="error"
                      variant="contained"
                      size="small"
                      onClick={handleBack}
                      disabled={clicked}
                      startIcon={<CancelIcon />}
                    >
                      Back
                    </Button>
                  </AnimateButton>
                </Grid>
              <Grid item>
                <LoadingButton
                  color="primary"
                  variant="contained"
                  size="small"
                  onClick={handleNext}
                  loading={clicked}
                  startIcon={<SaveIcon />}
                >
                  {activeStep === 3 ? "Add" : "Next"}
                </LoadingButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

export default AddCreditPurchaseDialog;
