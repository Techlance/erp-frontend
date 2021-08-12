import React, { useEffect, useState } from "react";

// material ui
import { Button, IconButton, TableCell, Typography } from "@material-ui/core";

// assets
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import SaveIcon from "@material-ui/icons/SaveRounded";

// project imports
import useAuth from "../../../hooks/useAuth";
import useUserPermissions from "../../../hooks/useUserPermissions";

const TransactionTabRow = ({ data, transaction_id, user_group_id }) => {
  const { user } = useAuth();
  const { updateUserRights } = useUserPermissions();

  const [modified, setModified] = useState(false);
  const [clicked, setClicked] = useState(false);

  const [values, setValues] = useState(() => {
    if (data) {
      return data;
    }

    return {
      user_group_id,
      transaction_id,
      can_create: false,
      can_alter: false,
      can_delete: false,
      can_view: false,
      created_by: user.email,
    };
  });

  useEffect(() => {
    setValues(() => {
      if (data) {
        return data;
      }

      return {
        user_group_id,
        transaction_id,
        can_create: false,
        can_alter: false,
        can_delete: false,
        can_view: false,
        created_by: user.email,
      };
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleChecked = (key, value) => {
    setModified(true);
    setValues({
      ...values,
      [key]: value,
    });
  };

  const handleUpdateButton = async () => {
    let data = { ...values };
    data.transaction_id = data.transaction_id.id;
    data.user_group_id = user_group_id;

    // API call
    setClicked(true);
    await updateUserRights(data);
    setModified(false);
    setClicked(false);
  };

  return (
    <>
      <TableCell>
        <Typography variant="h4">
          {values.transaction_id.transactions}
        </Typography>
      </TableCell>
      <TableCell align="center">
        {values.can_create ? (
          <CheckedButton id="can_create" handleChecked={handleChecked} />
        ) : (
          <UncheckedButton id="can_create" handleChecked={handleChecked} />
        )}
      </TableCell>
      <TableCell align="center">
        {values.can_alter ? (
          <CheckedButton id="can_alter" handleChecked={handleChecked} />
        ) : (
          <UncheckedButton id="can_alter" handleChecked={handleChecked} />
        )}
      </TableCell>
      <TableCell align="center">
        {values.can_view ? (
          <CheckedButton id="can_view" handleChecked={handleChecked} />
        ) : (
          <UncheckedButton id="can_view" handleChecked={handleChecked} />
        )}
      </TableCell>
      <TableCell align="center">
        {values.can_delete ? (
          <CheckedButton id="can_delete" handleChecked={handleChecked} />
        ) : (
          <UncheckedButton id="can_delete" handleChecked={handleChecked} />
        )}
      </TableCell>

      <TableCell>
        {modified && (
          <Button
            color="primary"
            variant="contained"
            disabled={clicked}
            onClick={handleUpdateButton}
            startIcon={<SaveIcon />}
          >
            Save
          </Button>
        )}
      </TableCell>
    </>
  );
};

export default TransactionTabRow;

const CheckedButton = ({ id, handleChecked }) => (
  <IconButton
    variant="text"
    color="primary"
    aria-label="more-details"
    onClick={() => handleChecked(id, false)}
  >
    <CheckCircleIcon
      color="success"
      sx={{ fontSize: "2rem", color: "success.main" }}
    />
  </IconButton>
);

const UncheckedButton = ({ id, handleChecked }) => (
  <IconButton
    variant="text"
    color="primary"
    aria-label="more-details"
    onClick={() => handleChecked(id, true)}
  >
    <CancelIcon color="error" sx={{ fontSize: "2rem" }} />
  </IconButton>
);
