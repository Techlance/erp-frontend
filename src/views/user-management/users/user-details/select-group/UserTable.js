import React from "react";

// material-ui
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";

// project imports
import UserTableRow from "./UserTableRow";
import useUserPermissions from "../../../../../hooks/useUserPermissions";

//-----------------------|| Company List ||-----------------------//

const UserTable = () => {
  const { user_company_group } = useUserPermissions();

  return (
    <div>
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
                <span style={{ opacity: 0 }}>Update</span>
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {user_company_group.map((row, index) => (
            <TableRow hover key={index}>
              <UserTableRow data={row} />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserTable;
