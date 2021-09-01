import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import { Dialog, Typography } from "@material-ui/core";
import AddLCDialog from "./AddLCDialog";
import AddLCDialogTest from "./AddLCDialogTest";
import AddLCDialogTesting from "./AddLCDialogTesting";
import AddLCDocumentDialog from "../../components/master/LC/AddLCDocumentDialog";
import handleCreateLC from "./AddLCDialogTesting";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ["Create LC", "Upload Documents"];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return <AddLCDialogTesting />;
    //   return "Add LC Details";

    case 1:
      return <AddLCDocumentDialog />;
    //   return "Kuch bhi";

    default:
      return "Unknown stepIndex";
  }
}

export default function LCStepper({ open, handleClose }) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    handleCreateLC();
    if (activeStep == 1) {
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="create-lc-dialog"
      fullWidth
      maxWidth="md"
    >
      <div className={classes.root}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          {activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>
                All steps completed
              </Typography>
              <Button onClick={handleReset}>Reset</Button>
            </div>
          ) : (
            <div>
              <Typography className={classes.instructions}>
                {getStepContent(activeStep)}
              </Typography>
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.backButton}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                >
                  {activeStep === steps.length - 1
                    ? "Create LC"
                    : "Upload Docsss"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Dialog>
  );
}
