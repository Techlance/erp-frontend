import { SNACKBAR_OPEN } from "../store/actions";

const sendNotification = ({ globalDispatch, success, message }) => {
  if (success) {
    globalDispatch({
      type: SNACKBAR_OPEN,
      open: true,
      message: message,
      variant: "alert",
      alertSeverity: "success",
      close: true,
    });
  } else {
    globalDispatch({
      type: SNACKBAR_OPEN,
      open: true,
      message: message,
      variant: "alert",
      alertSeverity: "error",
      close: true,
    });
  }
};

export default sendNotification;
