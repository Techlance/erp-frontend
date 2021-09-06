import React from "react";
import Proptypes from "prop-types";
import { Button, CircularProgress } from "@material-ui/core";
import AnimateButton from "./extended/AnimateButton";

const LoadingButton = (props) => {
  const { startIcon, loading, disabled, children } = props;

  const LoadingIndicator = <CircularProgress color="inherit" size={16} />;

  const currentStartIcon = loading ? LoadingIndicator : startIcon;

  return (
    <AnimateButton>
      <Button
        {...props}
        disabled={loading || disabled}
        startIcon={currentStartIcon}
      >
        {children}
      </Button>
    </AnimateButton>
  );
};

LoadingButton.propTypes = {
  loading: Proptypes.bool.isRequired,
};

export default LoadingButton;
