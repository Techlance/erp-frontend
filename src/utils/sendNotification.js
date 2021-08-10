import { SNACKBAR_OPEN } from "../store/actions";

const sendNotification = ({ dispatch, response }) => {
  const { success, message } = response.data;

  if (success) {
    dispatch({
      type: SNACKBAR_OPEN,
      open: true,
      message: message,
      variant: "alert",
      alertSeverity: "success",
      close: true,
    });
  } else {
    dispatch({
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
