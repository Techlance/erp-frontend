import React, { useEffect, useState } from "react";

// material ui
import { Button, TableCell, Typography } from "@material-ui/core";

// project imports
import useUserPermissions from "../../../../../hooks/useUserPermissions";
import UserGroupsSelect from "../../../../../components/user-management/UserGroupsSelect";

// assets
import SaveIcon from "@material-ui/icons/SaveRounded";

const TransactionTabRow = ({ data }) => {
  const { updateUserCompanyGroup } = useUserPermissions();

  const [modified, setModified] = useState(false);
  const [clicked, setClicked] = useState(false);

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

      return {
        company_master_id: {
          id: 0,
          company_name: "",
        },
        user_group_id: {
          id: 0,
          user_group_name: "",
        },
      };
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

  const handleUpdateButton = async () => {
    let data = { ...values };
    data.user_group_id = data.user_group_id.id;
    data.company_master_id = data.company_master_id.id;

    setClicked(true);
    await updateUserCompanyGroup(data);
    setModified(false);
    setClicked(false);
  };

  return (
    <>
      <TableCell>
        <Typography variant="h4">
          {values.company_master_id.company_name}
        </Typography>
      </TableCell>
      <TableCell>
        <UserGroupsSelect
          captionLabel="User Group Name"
          selected={values.user_group_id}
          onChange={handleSelect}
        />
      </TableCell>
      <TableCell align="center">
        {modified && (
          <Button
            onClick={handleUpdateButton}
            color="primary"
            variant="contained"
            disabled={clicked}
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
