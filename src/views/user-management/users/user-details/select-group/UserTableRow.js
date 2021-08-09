import React, { useEffect, useState } from "react";

// material ui
import { Button, TableCell, Typography } from "@material-ui/core";

// assets
import UserGroupsSelect from "../../../../../components/user-management/UserGroupsSelect";

// project imports

const TransactionTabRow = ({ data }) => {
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
    }, [data]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleSelect = (key, value) => {
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
          <pre>{JSON.stringify(values, null, 2)}</pre>
          {values.company_master_id.company_name}
        </Typography>
      </TableCell>
      <TableCell>
        <UserGroupsSelect
          captionLabel="User Group Name"
          selected={
            values.user_group_id.id
              ? values.user_group_id.id
              : { id: values.user_group_id }
          }
          onChange={handleSelect}
        />
      </TableCell>
      <TableCell align="center">
        {modified ? (
          <Button
            onClick={handleUpdateButton}
            color="primary"
            variant="contained"
          >
            Update
          </Button>
        ) : (
          <div style={{ opacity: 0 }}>
            <Button onClick={() => {}} color="primary" variant="contained">
              Update
            </Button>
          </div>
        )}
      </TableCell>
    </>
  );
};

export default TransactionTabRow;
