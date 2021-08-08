import React, { useEffect, useState } from "react";

// material ui
import { Button, IconButton, TableCell, Typography } from "@material-ui/core";

// assets
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";

// project imports
import useAuth from "../../../hooks/useAuth";

const TransactionTabRow = ({ data, transaction_id }) => {
  const { user } = useAuth();

  const [modified, setModified] = useState(false);

  const [values, setValues] = useState(() => {
    if (data) {
      return data;
    }
    return {
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

  const handleUpdateButton = () => {
    setModified(false);
    // API call
  };

  return (
    <>
      <TableCell>
        <Typography variant="h4">
          {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
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
            onClick={handleUpdateButton}
            color="primary"
            variant="contained"
          >
            Update
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
