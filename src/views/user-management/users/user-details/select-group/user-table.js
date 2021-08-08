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
import AnimateButton from "../../../../../ui-component/extended/AnimateButton";
import useUserPermissions from "../../../../../hooks/useUserPermissions";

// project imports

//-----------------------|| Company List ||-----------------------//

const UserTable = () => {
  const { user_accounts } = useUserPermissions();

  return (
    <div>
      <pre>{JSON.stringify(user_accounts, null, 2)}</pre>
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
                Update
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {user_accounts.map((row, index) => (
            <TableRow hover key={index}>
              <TableCell>
                <Typography align="left" variant="subtitle1" component="div">
                  {row.name}
                </Typography>
              </TableCell>
              <TableCell>
                {/* <Typography align="center">{row.email}</Typography> */}
              </TableCell>
              <TableCell align="center">
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Typography align="center">{row.email}</Typography>
                  <AnimateButton>
                    <Button
                      variant="contained"
                      onClick={() => {
                        return null;
                      }}
                    >
                      Update
                    </Button>
                  </AnimateButton>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserTable;
