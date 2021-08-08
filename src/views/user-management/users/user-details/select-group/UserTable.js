import React from "react";

// material-ui
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";

import {
  Button,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";

// assets
import UserTableRow from './UserTableRow'
import AnimateButton from "../../../../../ui-component/extended/AnimateButton";
import useUserPermissions from "../../../../../hooks/useUserPermissions";

// project imports

//-----------------------|| Company List ||-----------------------//

const UserTable = () => {
  const { user_company_group } = useUserPermissions();

  return (
    <div>
      <pre>{JSON.stringify(user_company_group, null, 2)}</pre>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="h4">Company Name</Typography>
            </TableCell>
            <TableCell>
              <Typography align="center" variant="h4">
                User Group
              </Typography>
            </TableCell>
            <TableCell>
              <Typography align="center" variant="h4">
                <span style={{opacity:0}}>Update</span>
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {user_company_group.map((row, index) => (
            <TableRow hover key={index}>
              <UserTableRow data = {row} />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserTable;
