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
  StepButton,
} from "@material-ui/core";

// project imports
import AnimateButton from "../../../../ui-component/extended/AnimateButton";
import useAuth from "../../../../hooks/useAuth";
import { useParams } from "react-router";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import LoadingButton from "../../../../ui-component/LoadingButton";
import { useSelector } from "react-redux";

import BillwiseDetailsForm from "./BillwiseDetailsForm";
import DocumentForm from "./DocumentForm";
import CreditPurchaseForm from "./CreditPurchaseForm";
import LedgerForm from "./LedgerForm";

// step options
const steps = [
  "Transaction Details",
  "Bill-Wise Details",
  "Ledger Details",
  "Documents",
];

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
  const [completed, setCompleted] = useState({});
  const [errorIndex, setErrorIndex] = useState(null);
  const [values, setValues] = useState({
    trans_type: null,
    voucher_no: "",
    narration: "",
    party_name: "",
    lc_no: null,
    supplier_inv_no: "",
    supplier_inv_date: "",
    payment_terms: "",
    supllier_name: "",
    supplier_address: "",
    shipped_by: "",
    shipped_from_add: "",
    company_master_id: mid,
    created_by: user.email,
  });
  const [billwiseValues, setBillwiseValues] = useState({
    billwise: [],
  });
  const [documentValues, setDocumentValues] = useState({
    files: [],
  });
  const [ledgerValues,setLedgerValues] = useState([
    {
      ledger_code:"abc",
      account:"acc",
      amount:20,
      fc_amount:2,
      remarks:"remakrs",
      current_balance:"300 Cr",
      cost_category:
      [
          {
          name:"cc",
          cost_centers:[
            {
              name:"css",
              amount:10
            },
            {
              name:"bss",
              amount:20
            }
          ]
        },
        {
          name:"cc",
          cost_centers:[
            {
              name:"css",
              amount:10
            },
            {
              name:"bss",
              amount:20
            }
          ]
        }
      ]
    },
    {
      ledger_code:"def",
      account:"acc2",
      amount:30,
      fc_amount:2,
      remarks:"remakrs",
      current_balance:"200 Dr",
      cost_category:
      [
        {
          name:"cc",
          cost_centers:[
          ]
        }
      ]
    }
  ]);
  
  const handleNext = () => {
      if(activeStep!==3){
          handleComplete();
          setActiveStep(activeStep + 1);
          setErrorIndex(null);
      }
  }

  const handleBack = () => {
    if (activeStep !== 0) {
      setActiveStep(activeStep - 1);
    }
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

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    // handleNext();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClearClose}
      aria-labelledby="create-purchase-credit"
      fullWidth
      maxWidth={"lg"}
    >
      <DialogTitle id="form-dialog-title">
        <Typography variant="h4">Create Purcase Credit Transaction</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography variant="body2">
            Create A New Purcase Credit Transaction
          </Typography>
        </DialogContentText>

        <Stepper nonLinear activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <StepButton color="inherit" onClick={handleStep(index)}>
                {label}
              </StepButton>
            </Step>
          ))}
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
          <Grid item></Grid>
          <Grid item>
            <Grid container spacing={2.5}>
                <Grid item>
                  <AnimateButton>
                    <Button
                      color="secondary"
                      variant="contained"
                      size="small"
                      onClick={handleBack}
                      disabled={clicked}
                      startIcon={<KeyboardArrowLeft />}
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
                  endIcon={<KeyboardArrowRight />}
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
