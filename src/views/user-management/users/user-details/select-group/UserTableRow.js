import React, { useEffect, useState } from "react";

// material ui
import { Button, IconButton, TableCell, Typography } from "@material-ui/core";

// assets
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";

// project imports
import useAuth from "../../../hooks/useAuth";

const TransactionTabRow = ({ data, transaction_id }) => {

  const [modified, setModified] = useState(false);

  const [values, setValues] = useState(() => {
    if (data) {
      return data;
    }
    return null;
  });

  useEffect(() => {
    setValues(() => {
      if (data) {
        return data;
      }
      return null;
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleSelect = (key, value) => {
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
          {values.company_master_id}
        </Typography>
      </TableCell>
      <TableCell>
        <UserGroupsSelect
          captionLabel="User Group Name"
          selected={values.user_group_id}
          onChange={handleSelect}
        />
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
