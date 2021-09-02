import React from "react";
import PreventDeleteDialog from "./PreventDeleteDialog";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";

const ProtectedDeleteDialog = ({
  checkList,
  showDeleteModal,
  handleAgree,
  handleClose,
  title,
  body,
}) => {
  let check = { ...checkList };
  Object.keys(check).forEach((key) => {
    if (check[key]) {
      if (!check[key].length > 0) delete check[key];
    }
  });
  let keys = Object.keys(check);
  return keys.length > 0 ? (
    <PreventDeleteDialog
      open={showDeleteModal}
      handleClose={handleClose}
      checkList={check}
    />
  ) : (
    <ConfirmDeleteDialog
      open={showDeleteModal}
      handleAgree={handleAgree}
      handleClose={handleClose}
      title={title}
      body={body}
    />
  );
};

export default ProtectedDeleteDialog;
