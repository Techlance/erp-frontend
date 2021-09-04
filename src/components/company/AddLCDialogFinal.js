import React, { useState } from "react";
import { useLocation, useParams } from "react-router";
import { useSelector } from "react-redux";

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
} from "@material-ui/core";

// project imports
import useAuth from "../../hooks/useAuth";
import LoadingButton from "../../ui-component/LoadingButton";
import AddLCDialog from "./AddLCDialog";
import AddLCDocs from "../master/LC/AddLCDocs";
import useLC from "../../hooks/useLC";

// assets
import AnimateButton from "../../ui-component/extended/AnimateButton";
import SaveIcon from "@material-ui/icons/SaveRounded";
import CancelIcon from "@material-ui/icons/Cancel";

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
  const { mid } = useParams();
  const { pathname } = useLocation();

  const { addImportLC, addExportLC, getImportLC, getExportLC } = useLC();
  const { company } = useSelector((state) => state.companyMaster);

  const [clicked, setClicked] = useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  console.log(activeStep === 0);

  let flag = true; // Show Payables for import
  if (pathname.includes("/export")) {
    // Show Receivables for export
    flag = false;
  }

  const handleNext = () => {
    setActiveStep(activeStep + 1);
    setErrorIndex(null);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const [values, setValues] = useState({
    trans_type: flag ? "import" : "export",
    // year_id: 21,
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
    base_currency: { id: company?.base_currency },
    company_master_id: mid,
    created_by: user.email,
  });

  const [newLC, setNewLC] = useState(null);

  const handleSubmit1 = async () => {
    setClicked(true);

    const onSuccess = () => {
      setValues({
        trans_type: flag ? "import" : "export",
        // year_id: 21,
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
    };

    if (flag) {
      let response = await addImportLC(values);
      if (response.data.success) {
        setNewLC(response.data.data);
        onSuccess();
      }
    } else {
      let response = await addExportLC(values);
      if (response.data.success) {
        setNewLC(response.data.data);
        onSuccess();
      }
    }

    setClicked(false);
  };

  const [paymentData, setPaymentData] = React.useState({});
  const [errorIndex, setErrorIndex] = React.useState(null);

  const setDefault = () => {
    setValues({
      trans_type: flag ? "import" : "export",
      // year_id: 21,
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
    setActiveStep(0);
    setNewLC(null);
    setErrorIndex(null);
  };
  const handleClearClose = async () => {
    setDefault();
    flag
      ? await getImportLC(company.company_id)
      : await getExportLC(company.company_id);

    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClearClose}
      // onClose={handleClose}
      aria-labelledby="create-lc"
      fullWidth
      maxWidth="md"
    >
      <DialogTitle id="form-dialog-title">
        <Typography variant="h4">Create LC</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography variant="body2">
            Create a new Letter of Credit.
          </Typography>
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
        {activeStep === 0 && (
          <AnimateButton>
            <Button
              color="error"
              variant="contained"
              size="small"
              onClick={() => {
                setValues({
                  trans_type: flag ? "import" : "export",
                  // year_id: 21,
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

        <LoadingButton
          color="primary"
          variant="contained"
          size="small"
          onClick={activeStep === 0 ? handleSubmit1 : handleClearClose}
          loading={clicked}
          startIcon={<SaveIcon />}
        >
          {activeStep === 0 ? "Add" : "Okay"}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default AddLCDialogFinal;
